<script lang="ts">
	type Props = {
		title: string;
	};

	let { title }: Props = $props();
</script>

<div class="card">
	<section class="prose grid place-items-center">
		<h1>{title}</h1>
	</section>
</div>
