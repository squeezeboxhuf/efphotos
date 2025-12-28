<script lang="ts">
	let { data, params } = $props();

	let yearList = $derived(data.yearMonths);
	const months = [
		'Ooops',
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
</script>

<h1>Photos for {params.year}</h1>
<h2>Months to pick from...</h2>
<p>Back to <a href="/">year index</a></p>

<ul>
	{#each yearList as y}
		{@const mon = Number(y?.month ?? 0)}
		<li class="flex flex-row items-center gap-2">
			<a href={`yearmonth-${y.yearMonth}`} class="cursor-pointer text-xl">{months[mon]}</a>
			<span>{y.photoCount} photo{(y?.photoCount ?? 0 > 1) ? 's' : ''}</span>
		</li>
	{/each}
</ul>
