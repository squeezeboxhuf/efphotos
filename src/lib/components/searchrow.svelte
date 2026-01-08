<script lang="ts">
	import { getPhotos, search } from '$lib/photos.remote';
	import { Search } from '@lucide/svelte';
	import { getSelections } from '$lib/state.svelte';

	let selections = getSelections();

	let searchField: HTMLInputElement | undefined = $state();
</script>

<p class=" bg-sky-500/70 px-2 py-2 text-slate-900">
	<label class="flex items-center"
		>Search:<input
			name="search"
			bind:this={searchField}
			class="mx-2 rounded border bg-white px-2 py-1"
		/>
		<button
			type="submit"
			onclick={() => {
				// search(searchField?.value ?? '00000000');
				selections.selectDay(`S${searchField?.value ?? '00000000'}`);
				getPhotos(`S${searchField?.value ?? '00000000'}`).refresh();
			}}><Search /></button
		></label
	>
</p>
