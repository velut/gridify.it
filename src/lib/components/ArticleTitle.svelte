<script lang="ts">
	type Props = {
		title: string;
	};

	let { title }: Props = $props();
</script>

<div class="bg-base-100 prose border-base-content/30 grid place-items-center rounded-md border p-8">
	<h1>{title}</h1>
</div>
