<script lang="ts">
	import { renderOptions } from '$lib/stores';

	export let isFormTainted: boolean;
	export let resetForm: () => void;

	const resetFormAndRenderOptions = () => {
		resetForm();
		$renderOptions = null;
	};

	$: disabled = !isFormTainted && $renderOptions === null;
</script>

<button
	title="Click to reset all rendering options"
	type="button"
	class="btn btn-outline btn-sm w-full hover:btn-error"
	on:click={resetFormAndRenderOptions}
	{disabled}>Reset Options</button
>
