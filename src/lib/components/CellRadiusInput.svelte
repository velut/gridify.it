<script lang="ts">
	const inputId = 'cell.radius';

	export let value: string;
	export let errors: string[] | undefined = undefined;
</script>

<div class="form-control w-full">
	<label for={inputId} class="label">
		<span class="label-text">Cell corner radius in pixels</span>
	</label>
	<input
		id={inputId}
		name={inputId}
		type="text"
		inputMode="numeric"
		pattern="[0-9]*"
		class="input-bordered input input-sm w-full"
		class:input-error={errors}
		data-invalid={errors}
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
