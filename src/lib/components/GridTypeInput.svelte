<script lang="ts">
	const inputId = 'grid.type';

	export let value: string;
</script>

<div class="form-control w-full">
	<label for={inputId} class="label pt-0">
		<span class="label-text">Grid type</span>
	</label>
	<select id={inputId} name={inputId} class="select-bordered select select-sm" bind:value>
		<option value="none">None</option>
		<option value="inner">Inner lines only</option>
		<option value="outer">Outer border only</option>
		<option value="full">Full grid (Outer border and inner lines)</option>
	</select>
</div>
