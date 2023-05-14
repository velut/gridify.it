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
	type="button"
	class="btn-outline btn-sm btn w-full hover:btn-error"
	on:click={resetFormAndRenderOptions}
	{disabled}>Reset Options</button
>
