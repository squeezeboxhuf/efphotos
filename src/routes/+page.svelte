<script lang="ts">
	import Daysrow from '$lib/components/daysrow.svelte';
	import Monthsrow from '$lib/components/monthsrow.svelte';
	import Searchrow from '$lib/components/searchrow.svelte';
	import Yearsrow from '$lib/components/yearsrow.svelte';
	import { getPhotos } from '$lib/photos.remote';
	import { getSelections } from '$lib/state.svelte';

	let selections = getSelections();
	let currentEnd = $state(20);

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
	$effect(() => {
		selections.setIdTable(photoData.map((p) => p?.rowid ?? 0));
		currentEnd = 20;
	});
	// $inspect('index page', selections.state);
</script>

<Yearsrow />
<Monthsrow />
<Daysrow />
<Searchrow />
<div class="w-full px-0 py-2 sm:px-2 lg:px-4">
	<h1 class="h1 my-4 text-2xl font-semibold">
		{#if selections.state.selectedDay.slice(0, 1) === 'S'}
			Search Results ({selections.state.selectedDay.slice(1)}) ({photoData.length} photos)
		{:else if selections.state.selectedDay !== '00'}
			Photos for {#if selections.state.selectedDay.slice(-2) !== '**'}
				{Number(selections.state.selectedDay.slice(-2))}
			{/if}
			{#if selections.state.selectedMonth !== '00'}
				{months[Number(selections.state.selectedMonth)]}{/if}
			{selections.state.selectedDay.slice(1, 5)} ({photoData.length} photos)
		{:else}
			<p>Nothing to see here yet...</p>
			<p>Select a Year, or Search for something!</p>
		{/if}
	</h1>

	{#if selections.state.selectedDay !== '00'}
		<div class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 leading-5">
			{#each photoData.slice(0, currentEnd) as photo, inx}
				<div class="mx-auto max-w-32 overflow-hidden">
					<a
						class="grid decoration-0"
						onclick={() => {
							selections.selectId(inx);
						}}
						href="/photo"
						data-sveltekit-preload-data="tap"
					>
						<p class="h-12 content-end overflow-hidden text-ellipsis">{photo.title}</p>
						<p>
							<img
								src={`http://mooserve:8037/${String(photo.thisDate).slice(0, 4)}/${String(photo.thisDate).slice(4, 6)}/${String(photo.thisDate).slice(-2)}/${photo.photo}`}
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
