<script lang="ts">
	interface Props {
		text: string;
	}

	let { text }: Props = $props();
</script>

<div class="flex h-full items-center justify-center">
	<div class="text-base-content text-opacity-80 text-lg font-semibold uppercase select-none">
		{text}
	</div>
</div>
