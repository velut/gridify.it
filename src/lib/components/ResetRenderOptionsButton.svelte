<script lang="ts">
	import { renderOptions } from '$lib/stores';

	interface Props {
		isFormTainted: boolean;
		resetForm: () => void;
	}

	let { isFormTainted, resetForm }: Props = $props();

	const resetFormAndRenderOptions = () => {
		resetForm();
		$renderOptions = null;
	};

	let disabled = $derived(!isFormTainted && $renderOptions === null);
</script>

<button
	title="Click to reset all rendering options"
	type="button"
	class="btn btn-outline btn-sm hover:btn-error w-full"
	onclick={resetFormAndRenderOptions}
	{disabled}>Reset Options</button
>
