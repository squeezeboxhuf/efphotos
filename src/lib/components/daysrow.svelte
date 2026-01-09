<script lang="ts">
	import { getYearMonthDays } from '$lib/photos.remote';
	import { getSelections } from '$lib/state.svelte';

	let selections = getSelections();
	let daysData = $derived(await getYearMonthDays(selections.state.selectedDay.slice(1)));

	let selectedDay = $derived(selections?.state.selectedDay);

	$effect(() => {
		getYearMonthDays(selections.state.selectedDay.slice(1)).refresh();
	});
</script>

{#if daysData.dayData.length > 0}
	<div
		class="grid w-full grid-cols-[repeat(auto-fill,minmax(40px,1fr))] items-center gap-1 bg-sky-600 px-0 py-1 sm:px-2 lg:px-4"
	>
		{#each daysData.dayData as day, inx}
			{@const thisdate = String(day.photoDate)}
			<button
				class={`flex flex-col items-center justify-center gap-0 rounded border px-2 py-2 leading-2 ${selectedDay.slice(1) == (day?.photoDate ?? '0') ? 'bg-red-800!' : 'bg-red-300'}`}
				onclick={() => {
					selections.selectDay(`D${thisdate}`);
				}}
			>
				<span class="font-semibold">{Number(thisdate.slice(6, 8))} </span><span class="text-xs"
					>({day.photoCount})</span
				>
			</button>
		{/each}
	</div>
{/if}
