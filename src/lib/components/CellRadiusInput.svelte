<script lang="ts">
	const inputId = 'cell.radius';

	export let value: string;
</script>

<div class="form-control w-full">
	<label for={inputId} class="label">
		<span class="label-text">Cell border radius in pixels</span>
	</label>
	<input
		id={inputId}
		name={inputId}
		type="text"
		inputMode="numeric"
		pattern="[0-9]*"
		class="input-bordered input input-sm w-full"
		bind:value
	/>
</div>
