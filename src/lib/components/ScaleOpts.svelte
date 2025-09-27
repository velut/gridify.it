<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import InputWithUnit from '$lib/components/InputWithUnit.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import OptsCard from '$lib/components/OptsCard.svelte';
	import MaterialSymbolsHeightRounded from '~icons/material-symbols/height-rounded';
	import MaterialSymbolsDatasetLinkedOutlineRounded from '~icons/material-symbols/dataset-linked-outline-rounded';
	import MaterialSymbolsOpenInFullRounded from '~icons/material-symbols/open-in-full-rounded';

	const { render } = getAppState();
	let scale = $derived(render.opts.opts.scale);
</script>

<OptsCard title="Scale options">
	<FormField>
		<label for="scale-type">
			<MaterialSymbolsDatasetLinkedOutlineRounded class="size-4" />
			Scale type
		</label>
		<select id="scale-type" class="w-full" bind:value={scale.type}>
			<option value="same">Same scale for x and y axis</option>
			<option value="different">Different scales for x and y axis</option>
		</select>
	</FormField>

	{#if scale.type === 'same'}
		<FormField>
			<label for="scale-x">
				<MaterialSymbolsOpenInFullRounded class="size-4" />
				Scale for x and y
			</label>
			<InputWithUnit unit="x">
				<input id="scale-x" type="text" bind:value={scale.x} />
			</InputWithUnit>
		</FormField>
	{:else}
		<FormField>
			<label for="scale-x">
				<MaterialSymbolsHeightRounded class="size-4 rotate-90" />
				Scale for x
			</label>
			<InputWithUnit unit="x">
				<input id="scale-x" type="text" bind:value={scale.x} />
			</InputWithUnit>
		</FormField>

		<FormField>
			<label for="scale-y">
				<MaterialSymbolsHeightRounded class="size-4" />
				Scale for y
			</label>
			<InputWithUnit unit="x">
				<input id="scale-y" type="text" bind:value={scale.y} />
			</InputWithUnit>
		</FormField>
	{/if}
</OptsCard>
