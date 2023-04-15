<script lang="ts">
	import { store } from '$lib/store';

	$: disabled = $store.outputImages.length === 0;
</script>

<button class="btn-outline btn" {disabled}>Download Images</button>
