<script lang="ts">
	let { data } = $props();

	let yearList = $derived(data.years);

	let sort: 'ascending' | 'descending' = $state('ascending');
	// $inspect(sort, yearList);
</script>

<article class="mx-auto max-w-2xl px-4 py-2">
	<h1>Photos</h1>
	<h2>Years to pick from...</h2>
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
	</ul>
</article>
