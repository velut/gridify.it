<script lang="ts">
	const inputId = 'cell.squareAspectRatio';

	export let checked: boolean | undefined;
</script>

<div class="form-control w-full">
	<label for={inputId} class="label cursor-pointer py-0">
		<span class="label-text">Square cells</span>
		<input id={inputId} name={inputId} type="checkbox" class="toggle" bind:checked />
	</label>
</div>
