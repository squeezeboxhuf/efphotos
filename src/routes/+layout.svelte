<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { setSelectionState } from '$lib/state.svelte.js';

	setSelectionState();

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<main>
	{@render children()}
</main>
