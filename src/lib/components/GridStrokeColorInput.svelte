<script lang="ts">
	const inputId = 'grid.stroke.color';

	export let value = '#000000';
</script>

<div class="form-control w-full">
	<label for={inputId} class="label">
		<span class="label-text">Grid color</span>
	</label>
	<input
		id={inputId}
		name={inputId}
		type="color"
		class="input-bordered input input-sm w-full"
		bind:value
	/>
</div>
