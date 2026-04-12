<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText } from 'gsap/SplitText';
	import Lenis from 'lenis';
	import { lenisStore } from '$lib/stores/lenis';

	gsap.registerPlugin(ScrollTrigger, SplitText);

	let lenis: Lenis | null = null;

	// Store each element alongside its original HTML so we can fully restore
	// the DOM on cleanup — including <br class="pc/sp"> that were removed before
	// SplitText ran. SplitText is created OUTSIDE gsap.context so ctx.revert()
	// only handles GSAP tweens/ScrollTriggers; HTML restoration is done manually.
	type SplitEntry = { el: HTMLElement; originalHTML: string };
	let splitEntries: SplitEntry[] = [];

	// Track fade/fade-up elements so cleanup can reset their inline styles.
	let fadeEntries: HTMLElement[] = [];

	let ctx: gsap.Context | null = null;

	// Abort token: incremented on each initAnimations() call.
	// After the async waitForFonts() gap, stale calls bail out early.
	let initToken = 0;

	// ─── Lenis ───────────────────────────────────────────────────────────────

	function initLenis() {
		lenis = new Lenis({
			duration: 1.2,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
		});
		lenisStore.set(lenis);
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time) => lenis!.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);
	}

	// ─── Cleanup ─────────────────────────────────────────────────────────────

	function cleanup() {
		ctx?.revert();
		ctx = null;
		// Restore original HTML — undoes SplitText AND brings back hidden brs
		splitEntries.forEach(({ el, originalHTML }) => {
			el.innerHTML = originalHTML;
		});
		splitEntries = [];
		// Reset inline styles set by gsap.set() on fade/fade-up elements
		fadeEntries.forEach((el) => {
			el.style.opacity = '';
			el.style.transform = '';
		});
		fadeEntries = [];
	}

	// ─── Font loading ────────────────────────────────────────────────────────

	/**
	 * Wait for fonts used in this project.
	 * document.fonts.ready covers CSS @font-face fonts (TTCR, Marcellus, Inter).
	 * Fontplus fonts (TazuganeGothicStdN etc.) are injected via script and may
	 * not be tracked by the FontFaceSet API, so we poll with a 2-second timeout.
	 */
	async function waitForFonts() {
		await document.fonts.ready;

		// Fontplus fonts: poll until loaded or timeout
		const fontplusFonts = ['TazuganeGothicStdN'];
		const deadline = Date.now() + 2000;

		await new Promise<void>((resolve) => {
			function check() {
				const allLoaded = fontplusFonts.every((f) =>
					document.fonts.check(`1em "${f}"`)
				);
				if (allLoaded || Date.now() > deadline) {
					resolve();
				} else {
					requestAnimationFrame(check);
				}
			}
			check();
		});
	}

	// ─── SplitText helper ────────────────────────────────────────────────────

	/**
	 * Prepare a single element for line animation:
	 *   1. Skip elements with no layout (display:none or zero width)
	 *   2. Save original HTML (for full restoration including hidden brs)
	 *   3. Remove <br> elements that are currently display:none (responsive brs)
	 *   4. Run SplitText with mask:lines
	 *   5. Fix line-height on generated mask wrappers
	 *   6. Preserve text-indent on the first line
	 */
	function prepareElement(el: HTMLElement): Element[] | null {
		// Fix A: skip elements that are not currently laid out (hidden, off-screen, etc.)
		// SplitText on a zero-width element measures all words at (0,0) → always 1 line
		const rect = el.getBoundingClientRect();
		if (rect.width === 0) return null;

		const originalHTML = el.innerHTML;

		// Remove hidden responsive <br> so SplitText doesn't treat them as line breaks
		el.querySelectorAll<HTMLElement>('br').forEach((br) => {
			if (getComputedStyle(br).display === 'none') br.remove();
		});

		const split = SplitText.create(el, {
			type: 'lines',
			mask: 'lines',
			linesClass: 'line'
		});

		if (!split.lines.length) {
			el.innerHTML = originalHTML;
			return null;
		}

		// Fix line-height: mask:lines generates anonymous <div> wrappers that
		// inherit from global div CSS rather than the target element. Force the
		// element's computed value onto both the mask wrapper and the line element.
		const computedLH = getComputedStyle(el).lineHeight;
		split.lines.forEach((line) => {
			(line as HTMLElement).style.lineHeight = computedLH;
			const mask = (line as HTMLElement).parentElement;
			if (mask && mask !== el) mask.style.lineHeight = computedLH;
		});

		// Preserve text-indent on the first visible line
		const textIndent = getComputedStyle(el).textIndent;
		if (textIndent && textIndent !== '0px') {
			(split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
			el.style.textIndent = '0';
		}

		splitEntries.push({ el, originalHTML });
		return split.lines;
	}

	// ─── Animation init ──────────────────────────────────────────────────────

	/** Elements inside section.footer fire as soon as they enter the viewport bottom */
	function resolveStart(el: HTMLElement, defaultStart: string): string {
		if (el.closest('section.footer')) return 'top bottom';
		return defaultStart;
	}

	type AnimEntry = {
		lines: Element[];
		trigger: HTMLElement;
		delay: number;
		scrollEnabled: boolean;
		start: string;
		stagger: number;
		type?: 'lines' | 'fade' | 'fade-up';
		duration?: number;
		y?: number;
	};

	async function initAnimations() {
		const token = ++initToken;
		cleanup();

		// Fix B: wait for both CSS fonts and Fontplus fonts before measuring layout
		await waitForFonts();

		// Abort if a newer initAnimations() call has already started
		if (token !== initToken) return;

		const queue: AnimEntry[] = [];

		// ── [data-animate="lines"] ──────────────────────────────────────────
		// Apply directly to a single text element (h1, p, span…).
		//
		// Options (data attributes):
		//   data-delay="0.3"          animation delay in seconds
		//   data-scroll="false"       fire on page load instead of scroll
		//   data-start="top 80%"      custom ScrollTrigger start
		//   data-stagger="0.15"       per-line stagger
		//
		// Example:
		//   <h1 data-animate="lines">Title</h1>
		//   <h1 data-animate="lines" data-scroll="false" data-delay="0.5">Hero</h1>
		document.querySelectorAll<HTMLElement>('[data-animate="lines"]').forEach((el) => {
			const lines = prepareElement(el);
			if (!lines) return;
			queue.push({
				lines,
				trigger: el,
				delay: parseFloat(el.dataset.delay ?? '0'),
				scrollEnabled: el.dataset.scroll !== 'false',
				start: resolveStart(el, el.dataset.start ?? 'top 75%'),
				stagger: parseFloat(el.dataset.stagger ?? '0.1')
			});
		});

		// ── [data-animate-children="lines"] ────────────────────────────────
		// Split each direct child separately — preserves per-child margins and
		// line-heights. All children animate together triggered by the container.
		//
		// Example:
		//   <div data-animate-children="lines">
		//     <h1 class="mb-10">Title</h1>
		//     <p class="mb-4">Body copy</p>
		//   </div>
		document.querySelectorAll<HTMLElement>('[data-animate-children="lines"]').forEach((container) => {
			const allLines: Element[] = [];
			Array.from(container.children).forEach((child) => {
				// Skip children that declare their own data-animate — avoid double-processing
				if ((child as HTMLElement).dataset.animate) return;
				const lines = prepareElement(child as HTMLElement);
				if (lines) allLines.push(...lines);
			});
			if (!allLines.length) return;
			queue.push({
				lines: allLines,
				trigger: container,
				delay: parseFloat(container.dataset.delay ?? '0'),
				scrollEnabled: container.dataset.scroll !== 'false',
				start: resolveStart(container, container.dataset.start ?? 'top 75%'),
				stagger: parseFloat(container.dataset.stagger ?? '0.1')
			});
		});

		// ── [data-animate="fade"] ──────────────────────────────────────────────
		// Simple opacity fade-in. Works on any element: img, div, section, etc.
		//
		// Options (data attributes):
		//   data-delay="0.3"          animation delay in seconds
		//   data-duration="1"         duration in seconds (default 0.8)
		//   data-scroll="false"       fire on page load instead of scroll
		//   data-start="top 80%"      custom ScrollTrigger start
		//
		// Example:
		//   <img data-animate="fade" src="..." />
		//   <div data-animate="fade" data-delay="0.2">...</div>
		//   <img data-animate="fade" data-scroll="false" />
		document.querySelectorAll<HTMLElement>('[data-animate="fade"]').forEach((el) => {
			fadeEntries.push(el);
			queue.push({
				lines: [el],
				trigger: el,
				delay: parseFloat(el.dataset.delay ?? '0'),
				scrollEnabled: el.dataset.scroll !== 'false',
				start: resolveStart(el, el.dataset.start ?? 'top 80%'),
				stagger: 0,
				type: 'fade',
				duration: parseFloat(el.dataset.duration ?? '0.8')
			});
		});

		// ── [data-animate="fade-up"] ───────────────────────────────────────────
		// Fade in with a subtle upward translate. Works on any element.
		//
		// Options (data attributes):
		//   data-delay="0.3"          animation delay in seconds
		//   data-duration="1"         duration in seconds (default 0.8)
		//   data-y="30"               translate distance in px (default 20)
		//   data-scroll="false"       fire on page load instead of scroll
		//   data-start="top 80%"      custom ScrollTrigger start
		//
		// Example:
		//   <div data-animate="fade-up">...</div>
		//   <img data-animate="fade-up" data-delay="0.3" data-y="40" src="..." />
		document.querySelectorAll<HTMLElement>('[data-animate="fade-up"]').forEach((el) => {
			fadeEntries.push(el);
			queue.push({
				lines: [el],
				trigger: el,
				delay: parseFloat(el.dataset.delay ?? '0'),
				scrollEnabled: el.dataset.scroll !== 'false',
				start: resolveStart(el, el.dataset.start ?? 'top 80%'),
				stagger: 0,
				type: 'fade-up',
				duration: parseFloat(el.dataset.duration ?? '0.8'),
				y: parseFloat(el.dataset.y ?? '20')
			});
		});

		// ── [data-animate-children="fade"] ────────────────────────────────────
		// Staggered fade-in on direct children (e.g. grid of cards).
		//
		// Options (data attributes):
		//   data-delay="0.1"          initial delay in seconds
		//   data-stagger="0.08"       per-child stagger (default 0.08)
		//   data-scroll="false"       fire on page load instead of scroll
		//   data-start="top 80%"      custom ScrollTrigger start
		//
		// Example:
		//   <ul data-animate-children="fade">
		//     <li>...</li>
		//     <li>...</li>
		//   </ul>
		document.querySelectorAll<HTMLElement>('[data-animate-children="fade"]').forEach((container) => {
			const children = Array.from(container.children) as HTMLElement[];
			if (!children.length) return;
			children.forEach((child) => fadeEntries.push(child));
			queue.push({
				lines: children,
				trigger: container,
				delay: parseFloat(container.dataset.delay ?? '0'),
				scrollEnabled: container.dataset.scroll !== 'false',
				start: resolveStart(container, container.dataset.start ?? 'top 80%'),
				stagger: parseFloat(container.dataset.stagger ?? '0.08'),
				type: 'fade',
				duration: parseFloat(container.dataset.duration ?? '0.8')
			});
		});

		// All GSAP calls inside context — ctx.revert() cleans up tweens/ScrollTriggers
		ctx = gsap.context(() => {
			queue.forEach(({ lines, trigger, delay, scrollEnabled, start, stagger, type = 'lines', duration = 1, y = 20 }) => {
				const trigger_ = scrollEnabled ? { scrollTrigger: { trigger, start, once: true } } : {};

				if (type === 'fade') {
					gsap.set(lines, { opacity: 0 });
					gsap.to(lines, { opacity: 1, duration, stagger, ease: 'power2.out', delay, ...trigger_ });
				} else if (type === 'fade-up') {
					gsap.set(lines, { opacity: 0, y });
					gsap.to(lines, { opacity: 1, y: 0, duration, stagger, ease: 'power3.out', delay, ...trigger_ });
				} else {
					// lines reveal
					gsap.set(lines, { y: '100%' });
					gsap.to(lines, { y: '0%', duration, stagger, ease: 'power4.out', delay, ...trigger_ });
				}
			});
			ScrollTrigger.refresh();
		});
	}

	// ─── Lifecycle ───────────────────────────────────────────────────────────

	onMount(() => {
		initLenis();
		initAnimations();
	});

	afterNavigate(() => {
		setTimeout(() => initAnimations(), 200);
	});

	onDestroy(() => {
		cleanup();
		lenis?.destroy();
		lenis = null;
		lenisStore.set(null);
	});
</script>

<style>
	:global(.line) {
		will-change: transform;
	}

	/* Responsive line-break helpers */
	:global(br.sp) { display: none; }
	:global(br.pc) { display: block; }

	@media (max-width: 768px) {
		:global(br.sp) { display: block; }
		:global(br.pc) { display: none; }
	}
</style>
