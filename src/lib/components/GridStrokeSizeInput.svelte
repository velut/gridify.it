<script lang="ts">
	export let disabled = false;

	const inputId = 'grid.stroke.size';
</script>

<div class="form-control w-full">
	<label for={inputId} class="label">
		<span class="label-text">Grid stroke size in pixels</span>
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
