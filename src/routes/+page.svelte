<script lang="ts">
	import { getPhotos } from '$lib/photos.remote';
	import { getSelections } from '$lib/state.svelte';

	let selections = getSelections();

	let photoData = $derived(await getPhotos(String(selections.state.selectedDay)));

	$effect(() => {
		getPhotos(String(selections.state.selectedDay)).refresh();
	});
	$inspect('selection', selections.state);
</script>

<article class="mx-auto max-w-2xl px-4 py-2">
	<h1>Photos ({selections.state.selectedDay})</h1>

	{#if selections.state.selectedDay !== '0'}
		<div class="grid grid-cols-5 gap-2 leading-5">
			{#each photoData.photoData as photo}
				<div>
					<p>{photo.title}</p>
					<p>
						<img
							src={`/jpegs/${selections.state.selectedYear}/${String(photo.thisDate).slice(4, 6)}/${String(photo.thisDate).slice(-2)}/${photo.photo}`}
							alt={photo.title}
							class="h-32 w-32 object-cover"
						/>
					</p>
					<p>{photo.photosNarrative}</p>
				</div>
			{/each}
		</div>
	{/if}
	<!-- <h2>Years to pick from...</h2>
	<p>
		<button
			type="button"
			onclick={() => {
				if (sort === 'ascending') {
					yearList = [...yearList.toSorted((b, a) => Number(a.year) - Number(b.year))];
					sort = 'descending';
				} else {
					yearList = [...yearList.toSorted((a, b) => Number(a.year) - Number(b.year))];
					sort = 'ascending';
				}
			}}>Sort years {sort}</button
		>
	</p>

	<ul>
		{#each yearList as y}
			<li class="flex flex-row items-center gap-2">
				<a href={`year-${y.year}`} class="cursor-pointer">{y.year}</a>
				<span>{y.photoCount} photo{(y?.photoCount ?? 0 > 1) ? 's' : ''}</span>
			</li>
		{/each}
	</ul> -->
</article>
