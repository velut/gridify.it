<script lang="ts">
	const inputId = 'pixel.fullyOpaque';

	export let checked: boolean | undefined;
</script>

<div class="form-control w-full">
	<label for={inputId} class="label cursor-pointer py-0">
		<span class="label-text">Fully opaque pixels</span>
		<input id={inputId} name={inputId} type="checkbox" class="toggle" bind:checked />
	</label>
</div>
