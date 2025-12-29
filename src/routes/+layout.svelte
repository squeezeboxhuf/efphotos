<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Yearsrow from '$lib/components/yearsrow.svelte';
	import Monthsrow from '$lib/components/monthsrow.svelte';
	import { setSelectionState } from '$lib/state.svelte.js';
	import Daysrow from '$lib/components/daysrow.svelte';

	setSelectionState();

	let { data, children } = $props();

	// let { yearsData } = await getYears();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Yearsrow />
<Monthsrow />
<Daysrow />
<article class="prose lg:prose-xl">
	{@render children()}
</article>
