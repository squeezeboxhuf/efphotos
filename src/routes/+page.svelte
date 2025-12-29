<script lang="ts">
	import Daysrow from '$lib/components/daysrow.svelte';
	import Monthsrow from '$lib/components/monthsrow.svelte';
	import Searchrow from '$lib/components/searchrow.svelte';
	import Yearsrow from '$lib/components/yearsrow.svelte';
	import { getPhotos } from '$lib/photos.remote';
	import { getSelections } from '$lib/state.svelte';
	import { PersistedState } from 'runed';

	let selections = getSelections();
	let currentId = new PersistedState('currentId', selections.state.rowId);

	let photoData = $derived(await getPhotos(`${String(selections.state.selectedDay)}`));

	$effect(() => {
		getPhotos(`${String(selections.state.selectedDay)}`).refresh();
	});
	$inspect('selection', selections.state, photoData);
</script>

<Yearsrow />
<Monthsrow />
<Daysrow />

<Searchrow />
<article class="mx-auto max-w-2xl px-4 py-2">
	<h1>Photos ({selections.state.selectedDay}) ({photoData.photoData.length} photos)</h1>

	{#if selections.state.selectedDay !== '0'}
		<div class="grid grid-cols-5 gap-2 leading-5">
			{#each photoData.photoData as photo}
				<a
					class="decoration-0"
					onclick={() => {
						selections.selectId(photo?.rowid ?? 99999);
						currentId.current = photo.rowid ?? 99999;
					}}
					href="/photo"
				>
					<p>{photo.title}</p>
					<p>
						<img
							src={`/jpegs/${String(photo.thisDate).slice(0, 4)}/${String(photo.thisDate).slice(4, 6)}/${String(photo.thisDate).slice(-2)}/${photo.photo}`}
							alt={photo.title}
							class="h-32 w-32 object-cover"
						/>
					</p>
					<p>{photo.photosNarrative}</p>
				</a>
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
