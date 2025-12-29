<script lang="ts">
	import { getPhoto } from '$lib/photos.remote';
	import { getSelections } from '$lib/state.svelte';
	import { PersistedState } from 'runed';

	let selections = getSelections();
	let currentId = new PersistedState('currentId', selections.state.rowId);

	if (selections.state.rowId === 99999 && currentId.current !== 0) {
		selections.selectId(currentId.current);
	}

	let photoResult = $derived(await getPhoto(selections.state.rowId));
	let photo = $derived(photoResult.photo[0]);

	$effect(() => {
		getPhoto(selections.state.rowId).refresh();
	});
	// $inspect('selection', selections.state, photoResult, photo);

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
			currentId.current = selections.state.rowId - 1;
		}
	}
	function next() {
		if (selections.state.rowId < 91446) {
			selections.selectId(selections.state.rowId + 1);
			currentId.current = selections.state.rowId + 1;
		}
	}

	$effect(() => {
		getPhoto(selections.state.rowId).refresh();
		// currentId.current = selections.state.rowId;
	});
</script>

<div class="flex flex-row justify-between">
	<button onclick={previous}>Previous</button>
	<a href="/" class="button no-underline">Back</a>
	<button onclick={next}>Next</button>
</div>
<h1>{photoDate.toString().slice(0, 15)} : {photo.title}</h1>
<p>
	<img
		src={`/jpegs/${String(photo.thisDate).slice(0, 4)}/${String(photo.thisDate).slice(4, 6)}/${String(photo.thisDate).slice(-2)}/${photo.photo}`}
		alt={photo.title}
		class="w-full object-contain"
	/>
</p>
<p>{photo.photosNarrative}</p>
