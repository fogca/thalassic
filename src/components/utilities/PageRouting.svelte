<!-- src/lib/components/PageTransition.svelte -->
<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
    import Logo from '../snippets/Logo.svelte';

	interface Props {
		columns?: number;
		color?: string;
		staggerAmount?: number;
		/** OPアニメーションのロゴ（SVG文字列またはコンポーネント） */
		showOpening?: boolean;
	}

	let {
		columns = 8,
		color = 'var(--key)',
		staggerAmount = 0.5,
		showOpening = true
	}: Props = $props();

	const mobileBreakpoint = 768;
	const mobileColumns = 5;

	let blocks = $state<number[]>([]);
	let blockSize = $state(0);
	let activeColumns = $state(8);
	let isAnimating = $state(false);
	let isInitialized = $state(false);
	let showOpeningAnimation = $state(false);
	let openingContainer: HTMLElement;
	let logoElement: HTMLElement;

	function getRouteContent() {
		return document.querySelector('.route-content');
	}

	function calculateGrid() {
		if (typeof window === 'undefined') return;
		activeColumns = window.innerWidth <= mobileBreakpoint ? mobileColumns : columns;
		blockSize = window.innerWidth / activeColumns;
		const rows = Math.ceil(window.innerHeight / blockSize);
		blocks = Array.from({ length: activeColumns * rows }, (_, i) => i);
	}

	async function animateOut(href: string) {
		if (isAnimating) return;
		isAnimating = true;

		const gsapModule = await import('gsap');
		const gsap = gsapModule.default;

		await tick();

		return new Promise<void>((resolve) => {
			if (!blocks.length) {
				void goto(href, { noScroll: true }).then(() => resolve());
				return;
			}

			gsap.fromTo(
				'.transition-block',
				{ opacity: 0, visibility: 'hidden' },
				{
					opacity: 1,
					visibility: 'visible',
					duration: 0.24,
					ease: 'power2.in',
					stagger: { amount: staggerAmount, from: 'random' },
					onComplete: () => {
						const routeContent = getRouteContent();
						if (routeContent) {
							// Keep next page hidden until reveal starts.
							gsap.set(routeContent, { opacity: 0 });
						}
						void goto(href, { noScroll: true }).then(() => resolve());
					}
				}
			);
		});
	}

	async function animateIn() {
		await tick();

		const gsapModule = await import('gsap');
		const gsap = gsapModule.default;
		const routeContent = getRouteContent();

		gsap.to('.transition-block', {
			opacity: 0,
			visibility: 'hidden',
			duration: 0.16,
			ease: 'none',
			stagger: { amount: 0.65, from: 'random' },
			delay: 0.12,
			onComplete: () => {
				isAnimating = false;
			}
		});

		if (routeContent) {
			gsap.fromTo(routeContent, { opacity: 0 }, {
				opacity: 1,
				duration: 1.0,
				ease: 'power4.inOut',
				delay: 0.75,
				clearProps: 'opacity'
			});
		}
	}

	async function playOpeningAnimation() {
		const gsapModule = await import('gsap');
		const gsap = gsapModule.default;

		document.body.style.overflow = 'hidden';

		await tick();

		const tl = gsap.timeline({
			onComplete: () => {
				document.body.style.overflow = '';
				showOpeningAnimation = false;
				isInitialized = true;
				// OP終了後にピクセルトランジションでフェードアウト
				animateIn();
			}
		});

		// ロゴをフェードイン
		tl.to(logoElement, {
			opacity: 1,
			duration: 0.8,
			ease: 'power2.out',
			delay: 0.5
		})
			// ロゴを表示したまま少し待つ
			.to(logoElement, {
				opacity: 1,
				duration: 0.8
			})
			// ロゴをフェードアウト
			.to(logoElement, {
				opacity: 0,
				duration: 0.5,
				ease: 'power2.in'
			})
			// OPコンテナを非表示に
			.set(openingContainer, {
				display: 'none'
			});
	}

	onMount(() => {
		calculateGrid();

		// セッション中の初回訪問かチェック
		const hasVisited = sessionStorage.getItem('thalassic-visited') === 'true';

		if (showOpening && !hasVisited) {
			// OPアニメーションを表示
			showOpeningAnimation = true;
			sessionStorage.setItem('thalassic-visited', 'true');
			playOpeningAnimation();
		} else {
			// OPスキップ、通常のトランジションイン
			isInitialized = true;
			animateIn();
		}

		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const link = target.closest('a');

			if (!link) return;

			const href = link.getAttribute('href');
			if (!href) return;

			const shouldSkip =
				link.target === '_blank' ||
				link.hasAttribute('data-transition-prevent') ||
				link.hasAttribute('data-sveltekit-reload') ||
				href.startsWith('#') ||
				href.startsWith('http://') ||
				href.startsWith('https://') ||
				href.startsWith('mailto:') ||
				href.startsWith('tel:') ||
				e.ctrlKey ||
				e.metaKey ||
				e.shiftKey;

			if (shouldSkip) return;

			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();

			animateOut(href);
		};

		document.addEventListener('click', handleClick, { capture: true });
		window.addEventListener('resize', calculateGrid);

		return () => {
			document.removeEventListener('click', handleClick, { capture: true });
			window.removeEventListener('resize', calculateGrid);
		};
	});

	afterNavigate(() => {
		// Scroll position (top/hash) is controlled in +layout.svelte with Lenis.
		calculateGrid();
		if (isInitialized) {
			animateIn();
		}
	});
</script>

<!-- OPアニメーション -->
{#if showOpeningAnimation}
	<div class="opening-container" bind:this={openingContainer}>
		<div class="opening-logo" bind:this={logoElement}>
			<!-- THALASSICロゴ SVG（白） -->
			<Logo />
		</div>
	</div>
{/if}

<!-- ピクセルトランジション -->
<div
	class="page-transition"
	class:is-initialized={isInitialized}
	style:--columns={activeColumns}
	style:--block-size="{blockSize}px"
	style:--color={color}
>
	{#each blocks as block (block)}
		<div class="transition-block"></div>
	{/each}
</div>

<style>
	/* OPアニメーション */
	.opening-container {
		position: fixed;
		inset: 0;
		z-index: 10000;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--key, #0a0a0a);
	}

	.opening-logo {
		opacity: 0;
		width: 50vw;
		max-width: 600px;
	}

	.opening-logo :global(svg) {
		width: 100%;
		height: auto;
		/* Logo SVG paths have fixed fill colors. This forces them to render white. */
		filter: brightness(0) invert(1);
	}

    

	/* ピクセルトランジション */
	.page-transition {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: grid;
		grid-template-columns: repeat(var(--columns), 1fr);
		grid-template-rows: repeat(auto-fill, var(--block-size));
		pointer-events: none;
		background: transparent;
	}

	.page-transition:not(.is-initialized) {
		background: var(--color);
	}

	.page-transition.is-initialized {
		background: transparent;
	}

	.transition-block {
		width: 100%;
		height: var(--block-size);
		background: var(--color);
		opacity: 1;
		visibility: visible;
		opacity: 0;
		visibility: hidden;
	}
</style>