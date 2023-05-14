<script lang="ts">
	import { dev } from '$app/environment';
	import { inputImages, inputImagesState } from '$lib/stores';

	$: ({ isLoaded } = $inputImagesState);
	$: images = $inputImages;
	$: disabled = dev ? false : !isLoaded || images.length === 0;
</script>

<button type="submit" class="btn-outline btn w-full" {disabled}>Render Images</button>
