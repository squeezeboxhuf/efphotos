<script lang="ts">
	import { getYears } from '$lib/photos.remote';
	import { getSelections } from '$lib/state.svelte';
	import { ArrowDownWideNarrow, ArrowUpNarrowWide } from '@lucide/svelte';
	import { PersistedState } from 'runed';

	let { yearsData } = await getYears();

	let ascDesc = new PersistedState('yearsort', 'desc');
	let yearList = $derived(
		ascDesc.current === 'asc'
			? [...yearsData.toSorted((a, b) => Number(a.year) - Number(b.year))]
			: [...yearsData.toSorted((b, a) => Number(a.year) - Number(b.year))]
	);

	let selections = getSelections();

	let selectedYear = $derived(selections?.state.selectedYear ?? 0);
</script>

<div class="wrap my-2 flex max-w-screen flex-wrap items-center gap-1 bg-orange-300 py-1">
	<button
		onclick={() => {
			if (ascDesc.current === 'asc') {
				ascDesc.current = 'desc';
			} else {
				ascDesc.current = 'asc';
			}
		}}
		>{#if ascDesc.current === 'asc'}<ArrowUpNarrowWide />
		{:else}
			<ArrowDownWideNarrow />
		{/if}</button
	>
	{#each yearList as year, inx}
		<button
			class={`flex flex-col items-center justify-center gap-0 rounded border px-2 py-2 leading-2 ${selectedYear === year.year ? 'bg-red-800!' : 'bg-red-300'}`}
			onclick={() => {
				selections.selectYear(year?.year ?? '0');
				selections.selectMonth('0');
				selections.selectDay(`D${year.year}****`);
			}}
		>
			<span class="font-semibold">{year.year}</span><span class="text-xs">({year.photoCount})</span>
		</button>
	{/each}
</div>
