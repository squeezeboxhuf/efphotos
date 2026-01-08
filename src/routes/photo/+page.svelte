<script lang="ts">
	import { getPhoto } from '$lib/photos.remote';
	import { getSelections } from '$lib/state.svelte';
	import { PersistedState } from 'runed';

	let selections = getSelections();
	let currentSelection = new PersistedState('currentSelection', selections.state);

	// if (selections.state.rowId === 99999 && currentSelection.current.idTable.length !== 0) {
	// 	selections.selectYear(currentSelection.current.selectedYear);
	// 	selections.selectMonth(currentSelection.current.selectedMonth);
	// 	selections.selectDay(currentSelection.current.selectedDay);
	// 	selections.selectId(currentSelection.current.rowId);
	// }

	let photoResult = $derived(
		await getPhoto(selections.state.idTable[selections.state.rowId] ?? 99999)
	);
	let photo = $derived(photoResult.photo);

	// $effect(() => {
	// 	getPhoto(selections.state.idTable[selections.state.rowId]).refresh();
	// });
	$inspect('photopage', currentSelection.current, selections.state, photoResult, photo);

	let photoDate = $derived(
		new Date(
			Number(String(photo?.thisDate ?? '0000').slice(0, 4)),
			Number(String(photo?.thisDate ?? '0000').slice(4, 6)) - 1,
			Number(String(photo?.thisDate).slice(6, 8))
		)
	);

	function previous() {
		if (selections.state.rowId > 0) {
			selections.selectId(selections.state.rowId - 1);
			// currentSelection.current.rowId = selections.state.rowId - 1;
		}
	}
	function next() {
		if (selections.state.rowId < selections.state.idTable.length) {
			selections.selectId(selections.state.rowId + 1);
			// currentSelection.current.rowId = selections.state.rowId + 1;
		}
	}

	$effect(() => {
		getPhoto(selections.state.idTable[selections.state.rowId]).refresh();
		// currentId.current = selections.state.rowId;
	});
</script>

<article class="mx-4 flex w-full flex-col items-center">
	{#if photo?.rowid !== 99999}
		<div class="flex w-full max-w-2xl flex-row justify-between">
			<button onclick={previous}>Previous</button>
			<a href="/" class="button no-underline">Back</a>
			<button onclick={next}>Next</button>
		</div>
		<h1>{photoDate.toString().slice(0, 15)} : {photo.title}</h1>
		<p>
			<img
				src={`/jpegs/${String(photo.thisDate).slice(0, 4)}/${String(photo.thisDate).slice(4, 6)}/${String(photo.thisDate).slice(-2)}/${photo.photo}`}
				alt={photo.title}
				class="max-h-screen max-w-screen rounded object-contain"
			/>
		</p>
		<p>{photo.photosNarrative}</p>
		<p>Keywords : {photo.photosKeywords} {photo.datesKeywords}</p>
	{:else}
		<p>A big whoopsie...</p>
	{/if}
</article>
