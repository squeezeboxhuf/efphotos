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

<div class="my-2 flex flex-row items-center gap-1 bg-orange-200 py-1">
	{#each daysData.dayData as day, inx}
		{@const thisdate = String(day.photoDate)}
		<button
			class={`flex flex-col items-center justify-center gap-0 rounded border px-2 py-2 leading-2 ${selectedDay === (day?.photoDate ?? '0'.slice(6, 8)) ? 'bg-red-800!' : 'bg-red-300'}`}
			onclick={() => {
				selections.selectDay(`D${thisdate}`);
			}}
		>
			<span class="font-semibold">{Number(thisdate.slice(6, 8))}</span><span class="text-xs"
				>({day.photoCount})</span
			>
		</button>
	{/each}
</div>
