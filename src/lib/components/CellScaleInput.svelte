<script lang="ts">
	const inputId = 'cell.scale';
</script>

<div class="form-control w-full">
	<label for={inputId} class="label">
		<span class="label-text">Cell scale multiplier</span>
	</label>
	<input
		id={inputId}
		name={inputId}
		type="text"
		inputMode="numeric"
		pattern="[0-9]*"
		placeholder="1"
		class="input-bordered input input-sm w-full"
	/>
</div>
