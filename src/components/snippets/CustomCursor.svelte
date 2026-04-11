<!-- src/lib/components/CustomCursor.svelte -->
<script>
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import gsap from 'gsap';

	let cursorDot;
	let cursorCircle;
	let isHovering = false;
	let isVisible = false;
	let isEnabled = false;

	// タッチデバイス & タブレット判定
	function shouldEnableCursor() {
		if (!browser) return false;
		
		// タッチデバイスは除外
		const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		
		// 画面幅チェック（タブレット以下は除外）
		const isLargeScreen = window.innerWidth > 1024;
		
		// ポインターデバイスがあるかチェック
		const hasPointer = window.matchMedia('(pointer: fine)').matches;
		
		return isLargeScreen && hasPointer && !hasTouch;
	}

	onMount(() => {
		if (!shouldEnableCursor()) {
			// カーソルを非表示のままにして終了
			return;
		}

		isEnabled = true;

		const posDot = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		const posCircle = { x: posDot.x, y: posDot.y };
		const mouse = { x: posDot.x, y: posDot.y };

		// 位置更新
		const updatePosition = () => {
			if (!isVisible) return;

			const dotSpeed = 0.25;
			posDot.x += (mouse.x - posDot.x) * dotSpeed;
			posDot.y += (mouse.y - posDot.y) * dotSpeed;

			const circleSpeed = isHovering ? 0.15 : 0.1;
			posCircle.x += (mouse.x - posCircle.x) * circleSpeed;
			posCircle.y += (mouse.y - posCircle.y) * circleSpeed;

			gsap.set(cursorDot, { x: posDot.x, y: posDot.y });
			gsap.set(cursorCircle, { x: posCircle.x, y: posCircle.y });
		};

		// マウス移動
		const handleMouseMove = (e) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;

			if (!isVisible) {
				isVisible = true;
				gsap.to([cursorDot, cursorCircle], {
					opacity: 1,
					duration: 0.3
				});
			}
		};

		// ウィンドウ外に出た時
		const handleMouseLeaveWindow = () => {
			isVisible = false;
			gsap.to([cursorDot, cursorCircle], {
				opacity: 0,
				duration: 0.3
			});
		};

		// ウィンドウに入った時
		const handleMouseEnterWindow = (e) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
			posDot.x = mouse.x;
			posDot.y = mouse.y;
			posCircle.x = mouse.x;
			posCircle.y = mouse.y;
		};

		// ホバーエフェクト
		const handleHoverEnter = () => {
			isHovering = true;
			gsap.to(cursorCircle, {
				scale: 2,
				backgroundColor: '#FFF',
				duration: 0.3,
				ease: 'power2.out'
			});
			if (cursorCircle) cursorCircle.style.mixBlendMode = 'difference';
			gsap.to(cursorDot, {
				scale: 0,
				duration: 0.3,
				ease: 'power2.out'
			});
		};

		const handleHoverLeave = () => {
			isHovering = false;
			gsap.to(cursorCircle, {
				scale: 1,
				backgroundColor: 'rgba(59, 130, 246, 0.4)',
				duration: 0.3,
				ease: 'power2.out'
			});
			if (cursorCircle) cursorCircle.style.mixBlendMode = 'normal';
			gsap.to(cursorDot, {
				scale: 1,
				duration: 0.3,
				ease: 'power2.out'
			});
		};

		// イベント委譲でホバー検出（動的要素にも対応）
		const hoverSelector = 'a, button, [role="button"], input, textarea, select, .hoverable';

		const handleMouseOver = (e) => {
			if (e.target.closest(hoverSelector)) {
				handleHoverEnter();
			}
		};

		const handleMouseOut = (e) => {
			if (e.target.closest(hoverSelector)) {
				// 別のホバー要素に移動してないか確認
				if (!e.relatedTarget?.closest(hoverSelector)) {
					handleHoverLeave();
				}
			}
		};

		// イベントリスナー登録
		window.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseover', handleMouseOver);
		document.addEventListener('mouseout', handleMouseOut);
		document.documentElement.addEventListener('mouseleave', handleMouseLeaveWindow);
		document.documentElement.addEventListener('mouseenter', handleMouseEnterWindow);

		// アニメーションループ
		gsap.ticker.add(updatePosition);

		// デフォルトカーソル非表示
		document.body.classList.add('custom-cursor-enabled');

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseover', handleMouseOver);
			document.removeEventListener('mouseout', handleMouseOut);
			document.documentElement.removeEventListener('mouseleave', handleMouseLeaveWindow);
			document.documentElement.removeEventListener('mouseenter', handleMouseEnterWindow);
			gsap.ticker.remove(updatePosition);
			document.body.classList.remove('custom-cursor-enabled');
		};
	});

	// ページ遷移後にホバー状態リセット
	afterNavigate(() => {
		if (isEnabled && isHovering) {
			isHovering = false;
			gsap.to(cursorCircle, {
				scale: 1,
				backgroundColor: 'rgba(59, 130, 246, 0.4)',
				duration: 0.3
			});
			if (cursorCircle) cursorCircle.style.mixBlendMode = 'normal';
			gsap.to(cursorDot, {
				scale: 1,
				duration: 0.3
			});
		}
	});
</script>

<div class="cursor-dot" bind:this={cursorDot}></div>
<div class="cursor-circle" bind:this={cursorCircle}></div>

<style>
	.cursor-dot {
		position: fixed;
		top: 0;
		left: 0;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: #000;
		pointer-events: none;
		z-index: 99999;
		transform: translate(-50%, -50%);
		will-change: transform;
		opacity: 0;
	}

	.cursor-circle {
		position: fixed;
		top: 0;
		left: 0;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: rgba(59, 130, 246, 0.4);
		pointer-events: none;
		z-index: 99998;
		transform: translate(-50%, -50%);
		will-change: transform;
		opacity: 0;
	}

	/* タブレット以下では完全に非表示 */
	@media (max-width: 1024px), (pointer: coarse) {
		.cursor-dot,
		.cursor-circle {
			display: none !important;
		}
	}

	/* カスタムカーソル有効時のみデフォルトカーソル非表示 */
	:global(body.custom-cursor-enabled) {
		cursor: none !important;
	}

	:global(body.custom-cursor-enabled a),
	:global(body.custom-cursor-enabled button),
	:global(body.custom-cursor-enabled input),
	:global(body.custom-cursor-enabled textarea),
	:global(body.custom-cursor-enabled select),
	:global(body.custom-cursor-enabled [role="button"]) {
		cursor: none !important;
	}
</style>