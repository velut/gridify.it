<script lang="ts">
	export let disabled = false;

	const inputId = 'cell.height';
</script>

<div class="form-control w-full">
	<label for={inputId} class="label">
		<span class="label-text">Cell height in pixels</span>
	</label>
	<input
		id={inputId}
		name={inputId}
		type="text"
		inputMode="numeric"
		pattern="[0-9]*"
		placeholder="1"
		class="input-bordered input input-sm w-full"
		{disabled}
	/>
</div>
