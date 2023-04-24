<script lang="ts">
	import { renderOptions } from '$lib/stores';

	export let isDirty: boolean;
	export let reset: () => void;

	const resetOptions = () => {
		reset();
		$renderOptions = null;
	};

	$: disabled = !isDirty && $renderOptions === null;
</script>

<button
	type="button"
	class="btn-outline btn-sm btn w-full hover:btn-error"
	on:click={resetOptions}
	{disabled}>Reset Options</button
>
