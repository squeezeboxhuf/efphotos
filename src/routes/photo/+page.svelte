<script lang="ts">
	import { getPhoto } from '$lib/photos.remote';
	import { getSelections } from '$lib/state.svelte';

	let selections = getSelections();

	let photoResult = $derived(
		await getPhoto(selections.state.idTable[selections.state.rowId] ?? 99999)
	);
	let photo = $derived(photoResult.photo);

	// $inspect('photopage', selections.state, photoResult, photo);

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
		}
	}
	function next() {
		if (selections.state.rowId < selections.state.idTable.length - 1) {
			selections.selectId(selections.state.rowId + 1);
		}
	}

	$effect(() => {
		getPhoto(selections.state.idTable[selections.state.rowId]).refresh();
	});
</script>

{#if photo?.rowid !== 99999}
	<div class="flex w-full max-w-2xl flex-row justify-between">
		<button onclick={previous}>Previous</button>
		<a href="/" class="button no-underline">Back</a>
		<button onclick={next}>Next</button>
	</div>
	<h1>{photoDate.toString().slice(0, 15)} : {photo.title}</h1>
	<p class="relative">
		<input type="checkbox" id="zoomer" class="hidden" />
		<label for="zoomer">
			<img
				src={`http://mooserve:8037/${String(photo.thisDate).slice(0, 4)}/${String(photo.thisDate).slice(4, 6)}/${String(photo.thisDate).slice(-2)}/${photo.photo}`}
				alt={photo.title}
				class="photo relative max-h-screen max-w-screen cursor-zoom-in overflow-scroll scroll-auto rounded object-contain transition-all duration-300"
			/>
		</label>
	</p>
	<p>{photo.photosNarrative}</p>
	<p>Keywords : {photo.photosKeywords} {photo.datesKeywords}</p>
{:else}
	<p>A big whoopsie...</p>
{/if}

<style>
	input[type='checkbox']:checked ~ label > img {
		scale: 2;
		cursor: zoom-out;
	}
</style>
