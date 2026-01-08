<script lang="ts">
	import Daysrow from '$lib/components/daysrow.svelte';
	import Monthsrow from '$lib/components/monthsrow.svelte';
	import Searchrow from '$lib/components/searchrow.svelte';
	import Yearsrow from '$lib/components/yearsrow.svelte';
	import { getPhotos } from '$lib/photos.remote';
	import { getSelections } from '$lib/state.svelte';
	import { PersistedState } from 'runed';

	let selections = getSelections();
	let currentEnd = $state(20);
	let currentSelection = new PersistedState('currentSelection', selections.state);

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
	let photoData = $derived(
		await getPhotos(`${String(selections.state.selectedDay ?? '********')}`)
	);
	// let photoIdsData = $derived(
	// 	await getPhotosIds(`${String(selections.state.selectedDay ?? '********')}`)
	// );

	// $effect(() => {
	// 	getPhotos(`${String(selections.state.selectedDay)}`).refresh();
	// });
	$effect(() => {
		selections.setIdTable(photoData.map((p) => p?.rowid ?? 0));
		currentEnd = 20;
		// currentSelection.current = selections.state;
	});
	$inspect('index page', selections.state);
</script>

<article class="mx-auto">
	<Yearsrow />
	<Monthsrow />
	<Daysrow />

	<Searchrow />
	<div class="p-2">
		<h1 class="h1 my-4 text-2xl font-semibold">
			{#if selections.state.selectedDay.slice(0, 1) === 'S'}
				Search Results ({selections.state.selectedDay.slice(1)}) ({photoData.length} photos)
			{:else}
				Photos for {#if selections.state.selectedDay.slice(-2) !== '**'}
					{Number(selections.state.selectedDay.slice(-2))}
				{/if}
				{#if selections.state.selectedMonth !== '00'}
					{months[Number(selections.state.selectedMonth)]}{/if}
			{/if}
			{selections.state.selectedDay.slice(1, 5)} ({photoData.length} photos)
		</h1>

		{#if selections.state.selectedDay !== '0'}
			<div class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 leading-5">
				{#each photoData.slice(0, currentEnd) as photo, inx}
					<div class=" max-w-32 overflow-hidden">
						<a
							class="decoration-0"
							onclick={() => {
								selections.selectId(inx);
								// currentSelection.current =
								// 	selections.state.selectedDay.slice(0, 1) === 'S' ? inx : (photo?.rowid ?? 99999);
								// currentSelection.current = { ...selections.state };
							}}
							href="/photo"
							data-sveltekit-preload-data="tap"
						>
							<p class="h-12 overflow-hidden text-ellipsis">{photo.title}</p>
							<p>
								<img
									src={`/jpegs/${String(photo.thisDate).slice(0, 4)}/${String(photo.thisDate).slice(4, 6)}/${String(photo.thisDate).slice(-2)}/${photo.photo}`}
									alt={photo.title}
									class="h-32 w-32 rounded object-cover"
								/>
							</p>
							<p>{photo.photosNarrative}</p>
						</a>
					</div>
				{/each}
				<div class="flex flex-col gap-2 self-center">
					{#if photoData.length > currentEnd}
						<button
							class="bg-sky-700! hover:bg-sky-600!"
							onclick={() => {
								currentEnd += currentEnd + 20 < photoData.length ? 20 : photoData.length;
							}}
							>Load another 20...
							<hr class="my-2" />
							(there's still another {photoData.length - currentEnd} photos)</button
						>
					{/if}
					{#if photoData.length > currentEnd + 50}
						<button
							class="my-2 bg-sky-700! py-4! hover:bg-sky-600!"
							onclick={() => {
								currentEnd += currentEnd + 50 < photoData.length ? 50 : photoData.length;
							}}
							>Load another 50...
						</button>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</article>
