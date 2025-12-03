<script>
	import { opFinished } from '$lib/op';

	// 初回ロード時に自動で開始
	let show = true;

	// アニメ終了時
	function finish() {
		opFinished.set(true);
		show = false;
	}
</script>

{#if show}
	<div class="op">
		<!-- 白フェード → グラデーション → ロゴ → 終了 -->
		<div class="white"></div>
		<div class="gradation"></div>
		<div class="logo">LOGO</div>

		<!-- 仮のアニメタイマー -->
		{#await new Promise(r => setTimeout(r, 2000)) then _}
			{finish()}
		{/await}
	</div>
{/if}

<style>
	.op {
		position: fixed;
		inset: 0;
		background: white;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.white {
		position: absolute;
		inset: 0;
		background: white;
		animation: fadeOut 1.2s forwards;
	}

	.gradation {
		position: absolute;
		inset: 0;
		opacity: 0;
		animation: fadeIn 1s 0.8s forwards;
		background: linear-gradient(135deg, #eee, #ccc);
	}

	.logo {
		position: relative;
		opacity: 0;
		animation: logoIn 0.8s 1.4s forwards;
	}

	@keyframes fadeOut {
		to { opacity: 0; }
	}
	@keyframes fadeIn {
		to { opacity: 1; }
	}
	@keyframes logoIn {
		to { opacity: 1; transform: translateY(0); }
		from { opacity: 0; transform: translateY(20px); }
	}
</style>