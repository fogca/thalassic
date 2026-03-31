<!-- src/lib/components/ScrollAnimations.svelte -->
<script>
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	let lenis;
	let scrollTriggers = [];
	let splitInstances = [];

	async function initAnimations() {
		cleanup();

		const gsap = (await import('gsap')).default;
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		const { SplitText } = await import('gsap/SplitText');
		const Lenis = (await import('lenis')).default;

		gsap.registerPlugin(ScrollTrigger, SplitText);

		if (!lenis) {
			lenis = new Lenis({
				lerp: 0.1,
				smoothWheel: true
			});

			lenis.on('scroll', ScrollTrigger.update);
			gsap.ticker.add((time) => lenis.raf(time * 1000));
			gsap.ticker.lagSmoothing(0);
		}

		await document.fonts.ready;

		// デフォルト: 画面70%位置で発火
		const defaultStart = 'top 70%';

		// ========================================
		// 1. FADE UP - 基本（既存の.Anime互換）
		// ========================================
		document.querySelectorAll('.Anime, [data-animate="fade-up"]').forEach((el) => {
			const delay = parseFloat(el.dataset.delay || '0');
			const duration = parseFloat(el.dataset.duration || '0.7');
			const start = el.dataset.start || defaultStart;

			gsap.set(el, { opacity: 0, y: 15 });

			const tween = gsap.to(el, {
				opacity: 1,
				y: 0,
				duration,
				delay,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: el,
					start,
					toggleActions: 'play none none none'
				}
			});

			scrollTriggers.push(tween.scrollTrigger);
		});

		// ========================================
		// 2. FADE IN - シンプルなフェード
		// ========================================
		document.querySelectorAll('[data-animate="fade-in"]').forEach((el) => {
			const delay = parseFloat(el.dataset.delay || '0');
			const duration = parseFloat(el.dataset.duration || '1');
			const start = el.dataset.start || defaultStart;

			gsap.set(el, { opacity: 0 });

			const tween = gsap.to(el, {
				opacity: 1,
				duration,
				delay,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: el,
					start,
					toggleActions: 'play none none none'
				}
			});

			scrollTriggers.push(tween.scrollTrigger);
		});

		// ========================================
		// 3. FADE STAGGER - 子要素を自動スタッガー
		// ========================================
		document.querySelectorAll('[data-animate="fade-stagger"]').forEach((el) => {
			const delay = parseFloat(el.dataset.delay || '0');
			const stagger = parseFloat(el.dataset.stagger || '0.05');
			const start = el.dataset.start || defaultStart;
			const y = parseFloat(el.dataset.y || '5');

			const children = el.children;

			gsap.set(children, { opacity: 0, y });

			const tween = gsap.to(children, {
				opacity: 1,
				y: 0,
				duration: 0.6,
				delay,
				stagger,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: el,
					start,
					toggleActions: 'play none none none'
				}
			});

			scrollTriggers.push(tween.scrollTrigger);
		});

// ========================================
// 4. TEXT REVEAL - シンプル版（br維持）
// ========================================
document.querySelectorAll('[data-animate="text-reveal"]').forEach((el) => {
	const delay = parseFloat(el.dataset.delay || '0');
	const start = el.dataset.start || defaultStart;

	// 要素全体をラップしてclip-pathでアニメーション
	const wrapper = document.createElement('div');
	wrapper.className = 'text-reveal-wrapper';
	wrapper.style.overflow = 'hidden';

	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);

	gsap.set(el, { yPercent: 100 });

	const tween = gsap.to(el, {
		yPercent: 0,
		duration: 1,
		delay,
		ease: 'power4.out',
		scrollTrigger: {
			trigger: wrapper,
			start,
			toggleActions: 'play none none none'
		}
	});

	scrollTriggers.push(tween.scrollTrigger);
});

// ========================================
// 5. TEXT SCRUB - スクロール連動テキスト
// ========================================
document.querySelectorAll('[data-animate="text-scrub"]').forEach((el) => {
	const stagger = parseFloat(el.dataset.stagger || '0.1');

	// 元のスタイルを取得
	const computedStyle = window.getComputedStyle(el);
	const originalLineHeight = computedStyle.lineHeight;
	const originalLetterSpacing = computedStyle.letterSpacing;

	// <br>タグを一時的にプレースホルダーに置換
	const brPlaceholder = '___BR___';
	const brTags = [];
	let brIndex = 0;

	el.innerHTML = el.innerHTML.replace(/<br[^>]*>/gi, (match) => {
		brTags.push(match);
		return `${brPlaceholder}${brIndex++}${brPlaceholder}`;
	});

	const split = SplitText.create(el, {
		type: 'words,lines',
		mask: 'lines',
		linesClass: 'split-line',
		reduceWhiteSpace: false
	});

	splitInstances.push(split);

	// 各行にスタイル適用 & brタグを復元
	split.lines.forEach((line) => {
		line.style.lineHeight = originalLineHeight;
		line.style.letterSpacing = originalLetterSpacing;
		line.style.display = 'block';

		line.innerHTML = line.innerHTML.replace(
			new RegExp(`${brPlaceholder}(\\d+)${brPlaceholder}`, 'g'),
			(_, index) => brTags[parseInt(index)] || ''
		);

		const mask = line.parentElement;
		if (mask && mask !== el) {
			mask.style.lineHeight = originalLineHeight;
			mask.style.display = 'block';
		}
	});

	gsap.set(split.lines, { yPercent: 120 });

	const tween = gsap.to(split.lines, {
		yPercent: 0,
		stagger,
		ease: 'none',
		scrollTrigger: {
			trigger: el,
			start: 'top 80%',
			end: 'top 30%',
			scrub: true
		}
	});

	scrollTriggers.push(tween.scrollTrigger);
});
	


		// ========================================
		// 6. CHAR REVEAL - 文字単位アニメーション
		// ========================================
		document.querySelectorAll('[data-animate="char-reveal"]').forEach((el) => {
			const delay = parseFloat(el.dataset.delay || '0');
			const stagger = parseFloat(el.dataset.stagger || '0.02');
			const start = el.dataset.start || defaultStart;

			const split = SplitText.create(el, {
				type: 'chars',
				charsClass: 'split-char'
			});

			splitInstances.push(split);
			gsap.set(split.chars, { opacity: 0, y: 20 });

			const tween = gsap.to(split.chars, {
				opacity: 1,
				y: 0,
				duration: 0.6,
				delay,
				stagger,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: el,
					start,
					toggleActions: 'play none none none'
				}
			});

			scrollTriggers.push(tween.scrollTrigger);
		});

		// ========================================
		// 7. IMAGE REVEAL - クリップアニメーション
		// ========================================
		document.querySelectorAll('[data-animate="image-reveal"]').forEach((el) => {
			const delay = parseFloat(el.dataset.delay || '0');
			const direction = el.dataset.direction || 'up';
			const start = el.dataset.start || defaultStart;

			const clipPaths = {
				up: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
				down: { from: 'inset(0% 0% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
				left: { from: 'inset(0% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
				right: { from: 'inset(0% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' }
			};

			const clip = clipPaths[direction] || clipPaths.up;
			gsap.set(el, { clipPath: clip.from });

			const tween = gsap.to(el, {
				clipPath: clip.to,
				duration: 1.2,
				delay,
				ease: 'power4.inOut',
				scrollTrigger: {
					trigger: el,
					start,
					toggleActions: 'play none none none'
				}
			});

			scrollTriggers.push(tween.scrollTrigger);
		});

		// ========================================
		// 8. IMAGE SCALE - 画像スケール + クリップ
		// ========================================
		document.querySelectorAll('[data-animate="image-scale"]').forEach((el) => {
			const delay = parseFloat(el.dataset.delay || '0');
			const start = el.dataset.start || defaultStart;
			const img = el.querySelector('img') || el;

			gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
			gsap.set(img, { scale: 1.3 });

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: el,
					start,
					toggleActions: 'play none none none'
				}
			});

			tl.to(el, {
				clipPath: 'inset(0% 0% 0% 0%)',
				duration: 1.2,
				delay,
				ease: 'power4.inOut'
			}).to(
				img,
				{
					scale: 1,
					duration: 1.4,
					ease: 'power3.out'
				},
				'-=0.8'
			);

			scrollTriggers.push(tl.scrollTrigger);
		});

		// ========================================
		// 9. PARALLAX - パララックス効果
		// ========================================
		document.querySelectorAll('[data-animate="parallax"]').forEach((el) => {
			const speed = parseFloat(el.dataset.speed || '0.3');
			const yPercent = -100 * speed;

			const tween = gsap.fromTo(
				el,
				{ yPercent: -yPercent },
				{
					yPercent: yPercent,
					ease: 'none',
					scrollTrigger: {
						trigger: el,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true
					}
				}
			);

			scrollTriggers.push(tween.scrollTrigger);
		});

		// ========================================
		// 10. SLIDE IN - 横からスライド
		// ========================================
		document.querySelectorAll('[data-animate="slide-in"]').forEach((el) => {
			const delay = parseFloat(el.dataset.delay || '0');
			const direction = el.dataset.direction || 'left';
			const distance = parseFloat(el.dataset.distance || '100');
			const start = el.dataset.start || defaultStart;
			const x = direction === 'left' ? -distance : distance;

			gsap.set(el, { opacity: 0, x });

			const tween = gsap.to(el, {
				opacity: 1,
				x: 0,
				duration: 1,
				delay,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: el,
					start,
					toggleActions: 'play none none none'
				}
			});

			scrollTriggers.push(tween.scrollTrigger);
		});

		// ========================================
		// 11. BLUR IN - ブラーフェード
		// ========================================
		document.querySelectorAll('[data-animate="blur-in"]').forEach((el) => {
			const delay = parseFloat(el.dataset.delay || '0');
			const start = el.dataset.start || defaultStart;

			gsap.set(el, { opacity: 0, filter: 'blur(15px)' });

			const tween = gsap.to(el, {
				opacity: 1,
				filter: 'blur(0px)',
				duration: 1,
				delay,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: el,
					start,
					toggleActions: 'play none none none'
				}
			});

			scrollTriggers.push(tween.scrollTrigger);
		});

		// ========================================
		// 12. SCALE IN - スケールイン
		// ========================================
		document.querySelectorAll('[data-animate="scale-in"]').forEach((el) => {
			const delay = parseFloat(el.dataset.delay || '0');
			const from = parseFloat(el.dataset.from || '0.9');
			const start = el.dataset.start || defaultStart;

			gsap.set(el, { opacity: 0, scale: from });

			const tween = gsap.to(el, {
				opacity: 1,
				scale: 1,
				duration: 1,
				delay,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: el,
					start,
					toggleActions: 'play none none none'
				}
			});

			scrollTriggers.push(tween.scrollTrigger);
		});

		ScrollTrigger.refresh();
	}

	function cleanup() {
		scrollTriggers.forEach((st) => st?.kill());
		scrollTriggers = [];

		splitInstances.forEach((split) => split?.revert());
		splitInstances = [];
	}

	onMount(() => {
		initAnimations();

		return () => {
			cleanup();
			lenis?.destroy();
			lenis = null;
		};
	});

	afterNavigate(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
			lenis?.scrollTo(0, { immediate: true });

			setTimeout(() => {
				initAnimations();
			}, 100);
		}, 100);
	});
</script>

<style>
	:global([data-animate]),
	:global(.Anime) {
		will-change: transform, opacity;
	}

	:global([data-animate='image-reveal']),
	:global([data-animate='image-scale']) {
		will-change: clip-path;
		overflow: hidden;
	}

	:global(.split-line) {
		display: block;
		line-height: inherit !important;
	}

	:global(.split-char) {
		display: inline-block;
	}



	:global([data-animate]),
	:global(.Anime) {
		will-change: transform, opacity;
	}

	:global([data-animate='image-reveal']),
	:global([data-animate='image-scale']) {
		will-change: clip-path;
		overflow: hidden;
	}

	/* SplitTextの行とマスク両方にline-height継承 */
	:global(.split-line),
	:global([data-animate='text-reveal'] > div),
	:global([data-animate='text-scrub'] > div) {
		display: block !important;
		line-height: inherit !important;
	}

	:global(.split-char) {
		display: inline-block;
	}

	/* sp/pc用のbr */
	:global(br.sp) {
		display: none;
	}

	:global(br.pc) {
		display: block;
	}

	@media (max-width: 768px) {
		:global(br.sp) {
			display: block;
		}

		:global(br.pc) {
			display: none;
		}
	}
</style>