<script lang="ts">
	type Props = {
		horizontal?: boolean;
	};

	let { horizontal }: Props = $props();
</script>

{#if horizontal}
	<div class="bg-border w-[1px]"></div>
{:else}
	<div class="bg-border h-[1px]"></div>
{/if}
