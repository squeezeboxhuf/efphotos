<script lang="ts">
	import { getYears } from '$lib/photos.remote';
	import { getSelections } from '$lib/state.svelte';
	import { ArrowDownWideNarrow, ArrowUpNarrowWide } from '@lucide/svelte';

	let { yearsData } = await getYears();

	let ascDesc = $state('desc');
	let yearList = $derived(
		ascDesc === 'asc'
			? [...yearsData.toSorted((a, b) => Number(a.year) - Number(b.year))]
			: [...yearsData.toSorted((b, a) => Number(a.year) - Number(b.year))]
	);

	let selections = getSelections();

	let selectedYear = $derived(selections?.state.selectedYear ?? 0);
	let yearPicker: HTMLSelectElement | undefined = $state();
</script>

<div class="wrap flex flex-wrap items-center gap-1 bg-sky-800 px-2 py-1 text-slate-100">
	<label for="year">Pick a year:</label>
	<select
		class="tex-slate-900 rounded border bg-white px-2 py-2 text-slate-600"
		name="year"
		bind:this={yearPicker}
		onchange={async () => {
			selections.selectYear(yearPicker?.value ?? '0');
		}}
	>
		<option value={0}>Choose a year</option>
		{#each yearList as year}
			<option value={year.year}>{year.year} | ({year.photoCount} photos)</option>
		{/each}
	</select>
	<button
		class="flex items-center gap-1"
		onclick={() => {
			if (ascDesc === 'asc') {
				ascDesc = 'desc';
			} else {
				ascDesc = 'asc';
			}
		}}
		>{#if ascDesc === 'asc'}<ArrowUpNarrowWide /><span class="hidden sm:inline">Sort years</span>
		{:else}
			<ArrowDownWideNarrow /><span class="hidden sm:inline">Sort years</span>
		{/if}
	</button>
	<button
		class="ml-auto bg-pink-800! hover:bg-pink-700!"
		onclick={() => window.location.assign('/diary')}>Diary</button
	>
</div>
