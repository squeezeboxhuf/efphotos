<script lang="ts">
	import { getYearMonths } from '$lib/photos.remote';
	import { getSelections } from '$lib/state.svelte';

	let selections = getSelections();
	let monthsData = $derived(await getYearMonths(String(selections?.state?.selectedYear ?? 0)));

	const months = [
		'Select A Year',
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	let selectedMonth = $derived(selections?.state.selectedMonth);
	$effect(() => {
		getYearMonths(String(selections?.state?.selectedYear ?? 0)).refresh();
	});
</script>

{#if monthsData.monthsData.length > 0}
	<div
		class="grid w-full grid-cols-[repeat(auto-fill,minmax(50px,1fr))] items-center gap-1 bg-sky-700 px-0 py-1 sm:px-2 lg:px-4"
	>
		{#each monthsData.monthsData as mon, inx}
			<button
				class={`flex flex-col items-center justify-center gap-0 rounded border px-2 py-2 leading-2 ${selectedMonth === mon.month ? 'bg-red-800!' : 'bg-red-300'}`}
				onclick={() => {
					selections.selectMonth(mon?.month ?? '0');
					// selections.selectDay(`D${selections.state.selectedYear}${mon.month}**`);
				}}
			>
				<span class="font-semibold">{months[Number(mon.month)]}</span><span class="text-xs"
					>({mon.photoCount})</span
				>
			</button>
		{/each}
	</div>
{/if}
