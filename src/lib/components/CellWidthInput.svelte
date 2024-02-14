<script lang="ts">
	const inputId = 'cell.width';

	export let value: string;
	export let errors: string[] | undefined = undefined;
</script>

<div class="form-control w-full">
	<label for={inputId} class="label">
		<span class="label-text">Cell width in pixels</span>
	</label>
	<input
		id={inputId}
		name={inputId}
		type="text"
		inputMode="numeric"
		pattern="[0-9]*"
		class="input input-sm input-bordered w-full"
		class:input-error={errors}
		aria-invalid={errors ? 'true' : undefined}
		bind:value
	/>
	{#if errors}
		<div class="label">
			<div class="label-text text-error" role="alert">
				{errors}
			</div>
		</div>
	{/if}
</div>
