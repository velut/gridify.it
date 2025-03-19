<script lang="ts">
	const inputId = 'grid.stroke.color';

	interface Props {
		value?: string;
	}

	let { value = $bindable('#000000') }: Props = $props();
</script>

<div class="form-control w-full">
	<label for={inputId} class="label">
		<span class="label-text">Grid color</span>
	</label>
	<input
		id={inputId}
		name={inputId}
		type="color"
		class="input input-sm input-bordered w-full"
		bind:value
	/>
</div>
