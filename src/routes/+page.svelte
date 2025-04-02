<script lang="ts">
	import Actions from '$lib/components/Actions.svelte';
	import RenderOptionsForm from '$lib/components/RenderOptionsForm.svelte';
	import { RenderOptionsState } from '$lib/render-options-state.svelte';

	let renderOptionsState = new RenderOptionsState();

	function onRenderOptionsSubmit() {
		console.log(JSON.stringify(renderOptionsState.toRenderOptions(), null, 2));
	}
</script>

<div class="grid grid-cols-[1fr_22rem] gap-4 overflow-hidden p-4">
	<div class="grid grid-rows-[auto_minmax(0,1fr)] gap-4">
		<div class="bg-base-300 rounded-xl p-4">
			<Actions
				onUploadImages={() => {}}
				onResetRenderOptions={() => renderOptionsState.reset()}
				onRemoveImages={() => {}}
				onDownloadImages={() => {}}
			/>
		</div>

		<div class="bg-base-300 rounded-xl p-4"></div>
	</div>

	<div class="bg-base-300 overflow-y-auto rounded-xl p-4">
		<RenderOptionsForm {renderOptionsState} {onRenderOptionsSubmit} />
	</div>
</div>
