<script>
	import { onMount } from 'svelte';
	import { lang } from '$lib/utils/lang';

	onMount(() => {
		const initialLang = lang.init();
		document.documentElement.setAttribute('lang', initialLang);
		
		// 言語変更を監視
		const unsub = lang.subscribe(newLang => {
			document.documentElement.setAttribute('lang', newLang);
		});
		
		return unsub;
	});
</script>