<script lang="ts">
	let { data, params } = $props();

	let monthList = $derived(data.monthData);
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
	const mon = $derived(Number(monthList[0]?.month ?? 0));
</script>

<h1>
	Photos for {months[mon]} <a href={`year-${monthList[0].year}`}>{monthList[0].year}</a>
</h1>
<h2>Days to pick from...</h2>

<ul>
	{#each monthList as m}
		<li class="flex flex-row items-center gap-2">
			<a href={`date-${m.photoDate}`} class="cursor-pointer">{String(m.photoDate).slice(-2)}</a>
			<span class="text-xl">{m.photoCount} photo{(m?.photoCount ?? 0 > 1) ? 's' : ''}</span>
		</li>
	{/each}
</ul>
