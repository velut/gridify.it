<script lang="ts">
	export let disabled = false;

	const inputId = 'grid.stroke.color';
</script>

<div class="form-control w-full">
	<label for={inputId} class="label">
		<span class="label-text">Grid stroke color</span>
	</label>
	<input
		id={inputId}
		name={inputId}
		type="color"
		class="input-bordered input input-sm w-full"
		{disabled}
	/>
</div>
