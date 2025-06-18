<script lang="ts">
	import DownloadImagesButton from '$lib/components/DownloadImagesButton.svelte';
	import HelpButton from '$lib/components/HelpButton.svelte';
	import RemoveImagesButton from '$lib/components/RemoveImagesButton.svelte';
	import RenderImagesButton from '$lib/components/RenderImagesButton.svelte';
	import ResetRenderOptionsButton from '$lib/components/ResetRenderOptionsButton.svelte';
	import UndoRenderImagesButton from '$lib/components/UndoRenderImagesButton.svelte';
	import UploadImagesButton from '$lib/components/UploadImagesButton.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator';
</script>

<Card.Root>
	<Card.Content class="flex h-full flex-col justify-between gap-4">
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-2">
				<UploadImagesButton />
				<RemoveImagesButton />
			</div>

			<Separator />

			<div class="flex flex-col gap-2">
				<RenderImagesButton />
				<UndoRenderImagesButton />
				<ResetRenderOptionsButton />
			</div>

			<Separator />

			<DownloadImagesButton />
		</div>

		<div class="flex flex-col gap-4">
			<Separator />
			<HelpButton />
		</div>
	</Card.Content>
</Card.Root>
