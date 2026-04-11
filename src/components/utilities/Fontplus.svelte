<!-- src/lib/components/FontPlus.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';

	interface Props {
		debug?: boolean;
	}

	let { debug = false }: Props = $props();

	declare global {
		interface Window {
			FONTPLUS?: {
				async: () => void;
				start: () => void;
				reload: (init?: boolean) => void;
				isloading: () => boolean;
				attachCompleteEvent: (callback: (res: { code: number }) => void) => void;
			};
		}
	}

	function log(...args: unknown[]) {
		if (debug) console.log('[FontPlus]', ...args);
	}

	function reloadFonts(init: boolean = false) {
		if (!browser || !window.FONTPLUS) return;

		if (window.FONTPLUS.isloading()) {
			log('Still loading, retry...');
			setTimeout(() => reloadFonts(init), 200);
			return;
		}

		log('Reloading...', init ? '(init)' : '');
		window.FONTPLUS.reload(init);
	}

	onMount(() => {
		const waitForFontPlus = () => {
			if (window.FONTPLUS) {
				log('Starting...');
				window.FONTPLUS.attachCompleteEvent((res) => {
					log('Complete:', res.code === 0 ? 'ok' : `error(${res.code})`);
				});
				window.FONTPLUS.start();
			} else {
				setTimeout(waitForFontPlus, 100);
			}
		};
		waitForFontPlus();
	});

	afterNavigate(({ from }) => {
		if (!from) return; // 初回ロードは除外
		
		// DOM更新を待ってからリロード
		setTimeout(() => reloadFonts(true), 150);
	});






</script>