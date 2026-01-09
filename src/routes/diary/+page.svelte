<script lang="ts">
	import { diarySearch, getDiary, getDiaryYear, listYears } from '$lib/diary.remote';
	import { Search } from '@lucide/svelte';

	let diaryData = await getDiary(0);
	let yearsList = $derived(await listYears());

	let data: { entryDate: string | null; content: string | null }[] = $derived(diaryData);

	let progress = $state(1);

	let searchField: HTMLInputElement | undefined = $state();
	let searchButton: HTMLButtonElement | undefined = $state();
	let yearPicker: HTMLSelectElement | undefined = $state();
	let headerTitle = $state("Eric's Diary");
	async function getMore(progress: number) {
		const d = await getDiary(progress);
		data = [...data, ...d];
	}
</script>

<svelte:window
	on:keyup={(event) => {
		if (event.key === 'Enter') {
			searchButton?.click();
		}
	}}
/>
<article class="mx-auto text-slate-300">
	<p class="mb-2 flex flex-wrap items-center gap-2 bg-sky-800 p-2">
		<label for="year">Pick a year:</label>
		<select
			class="rounded border bg-white p-2 text-slate-900"
			name="year"
			bind:this={yearPicker}
			onchange={async () => {
				data = await getDiaryYear(yearPicker?.value ?? '1965');
				headerTitle = `Year selected ${yearPicker?.value} : found ${data.length} entries`;
			}}
		>
			{#each yearsList as year}
				<option value={year.year}>{year.year}</option>
			{/each}
		</select>

		<label class="flex items-center"
			>or Search:<input
				name="search"
				bind:this={searchField}
				class="mx-2 rounded border bg-white px-2 py-1 text-slate-800"
			/>
		</label><button
			bind:this={searchButton}
			type="submit"
			onclick={async () => {
				data = await diarySearch(searchField?.value ?? '');
				headerTitle = `Search results ${searchField?.value} : found ${data.length} entries`;
			}}><Search /></button
		>
		<button
			class="ml-auto bg-pink-800! hover:bg-pink-700!"
			onclick={() => window.location.assign('/')}>Photos</button
		>
	</p>
	<h2 class="px-2 text-3xl font-semibold text-slate-300">{headerTitle}</h2>
	<div class="mb-10 px-2">
		{#each data as day}
			<p class="text-xl font-semibold">
				{new Date(day.entryDate ?? '').toUTCString().slice(0, 16)}
			</p>
			<p class="mb-2 border-b">{@html day.content}</p>
		{/each}
	</div>
	<button
		class="rounded"
		onclick={() => {
			getMore(progress++);
		}}>More...</button
	>
</article>
