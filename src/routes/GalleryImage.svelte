<script lang="ts">
	import type { Image } from '$lib/image';

	export let image: Image;
</script>

<a href={image.url} target="_blank" class="block">
	<img src={image.url} alt="" class="h-48 w-48 rounded object-cover" />
</a>
