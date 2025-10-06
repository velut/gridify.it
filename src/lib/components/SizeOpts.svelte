<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import InputWithUnit from '$lib/components/InputWithUnit.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import OptsCard from '$lib/components/OptsCard.svelte';
	import MaterialSymbolsHeightRounded from '~icons/material-symbols/height-rounded';
	import MaterialSymbolsExpandRounded from '~icons/material-symbols/expand-rounded';
	import MaterialSymbolsDatasetLinkedOutlineRounded from '~icons/material-symbols/dataset-linked-outline-rounded';
	import MaterialSymbolsOpenInFullRounded from '~icons/material-symbols/open-in-full-rounded';

	const { render } = getAppState();
	let size = $derived(render.opts.opts.size);
</script>

<OptsCard title="Size options">
	<FormField>
		<label for="size-type">
			<MaterialSymbolsDatasetLinkedOutlineRounded class="size-4" />
			Size type
		</label>
		<select id="size-type" class="w-full" bind:value={size.type}>
			<option value="original">Original size</option>
			<option value="scale-linked">Set scale</option>
			<option value="scale-independent">Set horizontal and vertical scales</option>
			<option value="dimensions-width">Set width</option>
			<option value="dimensions-height">Set height</option>
			<option value="dimensions-both">Set width and height</option>
		</select>
	</FormField>

	{#if size.type === 'scale-linked'}
		<FormField>
			<label for="size-scale-x">
				<MaterialSymbolsOpenInFullRounded class="size-4" />
				Scale
			</label>
			<InputWithUnit unit="x">
				<input id="size-scale-x" type="text" bind:value={size.scale.x} />
			</InputWithUnit>
		</FormField>
	{:else if size.type === 'scale-independent'}
		<FormField>
			<label for="size-scale-x">
				<MaterialSymbolsHeightRounded class="size-4 rotate-90" />
				Horizontal scale
			</label>
			<InputWithUnit unit="x">
				<input id="size-scale-x" type="text" bind:value={size.scale.x} />
			</InputWithUnit>
		</FormField>

		<FormField>
			<label for="size-scale-y">
				<MaterialSymbolsHeightRounded class="size-4" />
				Vertical scale
			</label>
			<InputWithUnit unit="x">
				<input id="size-scale-y" type="text" bind:value={size.scale.y} />
			</InputWithUnit>
		</FormField>
	{:else if size.type === 'dimensions-width'}
		<FormField>
			<label for="size-dimensions-width">
				<MaterialSymbolsExpandRounded class="size-4 rotate-90" />
				Image width
			</label>
			<InputWithUnit unit="px">
				<input
					id="size-dimensions-width"
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					title="Use 1 or a bigger integer number of pixels"
					bind:value={size.dimensions.width}
				/>
			</InputWithUnit>
		</FormField>
	{:else if size.type === 'dimensions-height'}
		<FormField>
			<label for="size-dimensions-height">
				<MaterialSymbolsExpandRounded class="size-4" />
				Image height
			</label>
			<InputWithUnit unit="px">
				<input
					id="size-dimensions-height"
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					title="Use 1 or a bigger integer number of pixels"
					bind:value={size.dimensions.height}
				/>
			</InputWithUnit>
		</FormField>
	{:else if size.type === 'dimensions-both'}
		<FormField>
			<label for="size-dimensions-width">
				<MaterialSymbolsExpandRounded class="size-4 rotate-90" />
				Image width
			</label>
			<InputWithUnit unit="px">
				<input
					id="size-dimensions-width"
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					title="Use 1 or a bigger integer number of pixels"
					bind:value={size.dimensions.width}
				/>
			</InputWithUnit>
		</FormField>

		<FormField>
			<label for="size-dimensions-height">
				<MaterialSymbolsExpandRounded class="size-4" />
				Image height
			</label>
			<InputWithUnit unit="px">
				<input
					id="size-dimensions-height"
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					title="Use 1 or a bigger integer number of pixels"
					bind:value={size.dimensions.height}
				/>
			</InputWithUnit>
		</FormField>
	{/if}
</OptsCard>
