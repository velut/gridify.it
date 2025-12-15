<script lang="ts">
	interface Props {
		horizontal?: boolean;
	}

	let { horizontal }: Props = $props();
</script>

{#if horizontal}
	<div class="bg-border w-px"></div>
{:else}
	<div class="bg-border h-px"></div>
{/if}
