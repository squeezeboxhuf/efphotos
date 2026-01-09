<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { setSelectionState } from '$lib/state.svelte.js';
	import { version } from '$app/environment';
	setSelectionState();

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<main class="my-0 flex min-h-screen w-full flex-col justify-between bg-sky-950 px-0 text-slate-200">
	<article class="flex w-full flex-col items-center px-0">
		{@render children()}
	</article>
	<footer class="rounded-none bg-sky-800 px-2 py-4 font-semibold text-amber-400">
		<p>
			App version {version} &copy; {new Date().getFullYear()} Created by Hamish Foxley : JIGS6 TECH
		</p>
	</footer>
</main>
