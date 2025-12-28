<script lang="ts">
	let { data, params } = $props();

	let dayList = $derived(data.dayData);
	let day = $derived(String(data.dayData[0].thisDate)?.slice(-2));
	let month = $derived(String(data.dayData[0].thisDate)?.slice(4, 6));
	let year = $derived(String(data.dayData[0].thisDate)?.slice(0, 4));
	let yearMonth = $derived(String(data.dayData[0].thisDate)?.slice(0, 6));
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
	const mon = $derived(Number(month ?? 0));
</script>

<h1>
	Photos for {day}
	<a href={`yearmonth-${yearMonth}`}>{months[mon]}</a> <a href={`year-${year}`}>{year}</a>
</h1>
<h2>Photos to pick from...</h2>

<ul>
	{#each dayList as d}
		<li class="flex flex-row items-center gap-2">
			<p>{d.title}, {d.photosNarrative}</p>
		</li>
	{/each}
</ul>
