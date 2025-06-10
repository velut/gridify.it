<script lang="ts">
	type Props = {
		title: string;
	};

	let { title }: Props = $props();
</script>

<div class="bg-base-100 prose grid place-items-center rounded-lg border p-8">
	<h1>{title}</h1>
</div>
