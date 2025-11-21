<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import ArticleSection from '$lib/components/ArticleSection.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
</script>

<Article>
	<ArticleTitle title="Help" />

	<ArticleSection>
		<ul class="text-lg">
			<li><a href="#uploading-images">Uploading images</a></li>
			<li><a href="#downloading-images">Downloading images</a></li>
			<li><a href="#previewing-images">Previewing images</a></li>
			<li><a href="#rendering-images">Rendering images</a></li>
			<li><a href="#rendering-options">Rendering options</a></li>
			<li><a href="#rendering-options-grid">Rendering options: Grid</a></li>
			<li><a href="#rendering-options-grid-cells">Rendering options: Grid cells</a></li>
			<li><a href="#tips-for-pixel-art">Tips for pixel art</a></li>
			<li><a href="#tips-for-high-resolution-images">Tips for high resolution images</a></li>
			<li><a href="#other-questions">Other questions</a></li>
		</ul>
	</ArticleSection>

	<ArticleSection>
		<h2 id="uploading-images">Uploading images</h2>

		<h3>How do I upload images?</h3>
		<p>
			You can click on the <strong>Upload images</strong> button to open a file picker dialog. You
			can also directly <strong>drag and drop</strong> the images on the app page.
		</p>

		<h3>How do I remove uploaded images?</h3>
		<p>
			You can click on the <strong>Remove images</strong> button to remove all uploaded images. You can
			also reload the app page to start from scratch.
		</p>

		<h3>Which image formats can I use?</h3>
		<p>
			The app supports most common raster image formats. For best results, you should use
			<strong>JPEG</strong> and <strong>PNG</strong> images.
		</p>

		<h3>How many images can I upload?</h3>
		<p>You can upload a single image or multiple images together.</p>

		<h3>Are my uploaded images kept private?</h3>
		<p>
			<strong>Yes!</strong> The app works entirely in your browser and your images never leave your device.
		</p>
	</ArticleSection>

	<ArticleSection>
		<h2 id="downloading-images">Downloading images</h2>

		<h3>How do I download the rendered images?</h3>
		<p>
			You can click on the <strong>Download images</strong> button to save the rendered images on your
			device.
		</p>
	</ArticleSection>

	<ArticleSection>
		<h2 id="previewing-images">Previewing images</h2>

		<h3>How do I preview images?</h3>
		<p>
			After uploading your images, you will see them in the preview area. If you upload multiple
			images, you can choose which one to display by selecting its filename at the top of the
			preview area.
		</p>

		<h3>How do I preview an image at full size?</h3>
		<p>
			You can click on an image in the preview area to see it at full size in a new browser tab.
		</p>

		<h3>How do I change the preview mode?</h3>
		<p>
			You can choose between <strong>Show as pixel art</strong> (for pixel art, game sprites, and
			smaller images) and <strong>Show as hi-res image</strong> (for photos, drawings, and larger images)
			at the top of the preview area.
		</p>

		<h3>Why do image previews look weird?</h3>
		<p>
			Scaling in the preview area may cause image previews to contain visual artifacts. You can
			click on an image to see it at full size in a new browser tab.
		</p>

		<h3>What are the numbers at the top of the preview area?</h3>
		<p>
			At the top of the preview area, you can see the image dimensions in pixels (width x height)
			and the image file size in bytes.
		</p>
	</ArticleSection>

	<ArticleSection>
		<h2 id="rendering-images">Rendering images</h2>

		<h3>How do I render images?</h3>
		<p>
			You can click on the <strong>Render images</strong> button. You can also use the
			<kbd class="kbd">Ctrl + Enter</kbd> keyboard shortcut.
		</p>

		<h3>How do I undo the images render?</h3>
		<p>
			You can click on the <strong>Undo</strong> button to restore images to their previous
			appearance. You can also use the <kbd class="kbd">Ctrl + Z</kbd> keyboard shortcut.
		</p>

		<h3>How do I redo the images render?</h3>
		<p>
			You can click on the <strong>Redo</strong> button to repeat a previously undone render. You
			can also use the <kbd class="kbd">Ctrl + Y</kbd> keyboard shortcut.
		</p>

		<h3>Why have the images been rendered incorrectly?</h3>
		<p>
			Bugs in browsers or graphical drivers may cause images to be rendered incorrectly. You can try
			changing the rendering options or using different browsers or devices to render the images.
		</p>
	</ArticleSection>

	<ArticleSection>
		<h2 id="rendering-options">Rendering options</h2>

		<h3>What are the rendering options?</h3>
		<p>
			The <strong>rendering options</strong> are the settings that determine how the images will look
			like after being rendered. You can use the rendering options to change the size and colors of images
			and also add a custom grid.
		</p>

		<h3>How do I reset the rendering options?</h3>
		<p>
			You can click on the <strong>Reset render options</strong> button to restore the rendering options
			to their default values.
		</p>
	</ArticleSection>

	<ArticleSection>
		<h2 id="rendering-options-grid">Rendering options: Grid</h2>

		<h3>Which grid type should I choose?</h3>
		<p>You can choose between five different grid types:</p>
		<ul>
			<li>
				<p><strong>No grid</strong></p>
				<p>Use this if you want to completely disable grid rendering.</p>
			</li>
			<li>
				<p><strong>Full grid</strong></p>
				<p>
					Use this if you want the grid to have both the outer border and the inner grid lines
					between grid cells as shown below.
				</p>
				<div class="not-prose grid place-items-start">
					<div class="bg-card-foreground grid grid-cols-3 grid-rows-3 gap-px p-px">
						{#each { length: 9 }}
							<div class="bg-card size-8"></div>
						{/each}
					</div>
				</div>
			</li>
			<li>
				<p><strong>Only grid lines</strong></p>
				<p>
					Use this if you want only the inner grid lines between grid cells without the outer border
					as shown below.
				</p>
				<div class="not-prose grid place-items-start">
					<div class="bg-card-foreground grid grid-cols-3 grid-rows-3 gap-px">
						{#each { length: 9 }}
							<div class="bg-card size-8"></div>
						{/each}
					</div>
				</div>
			</li>
			<li>
				<p><strong>Only outer border</strong></p>
				<p>
					Use this if you want only the outer border without the inner grid lines as shown below.
				</p>
				<div class="not-prose grid place-items-start">
					<div class="bg-card-foreground grid grid-cols-3 grid-rows-3 p-px">
						{#each { length: 9 }}
							<div class="bg-card size-8"></div>
						{/each}
					</div>
				</div>
			</li>
			<li>
				<p><strong>Invisible grid</strong></p>
				<p>
					Use this if you do not want any type of grid lines but still want to have grid cells. This
					can be useful when you only want to round the corners of grid cells as shown below.
				</p>
				<div class="not-prose grid place-items-start">
					<div class="grid grid-cols-3 grid-rows-3 p-px">
						{#each { length: 9 }}
							<div class="bg-card-foreground size-8 rounded-lg"></div>
						{/each}
					</div>
				</div>
			</li>
		</ul>

		<h3>How do I change the color of the grid?</h3>
		<p>
			You can click on the <strong>Grid color</strong> setting to choose a different color for the
			grid. The selected color applies to the outer border and grid lines and is also used to round
			the corners of grid cells when the grid type is
			<strong>Invisible grid</strong>.
		</p>

		<h3>How do I change the grid lines size?</h3>
		<p>
			You can click on the <strong>Grid border and lines size</strong> setting and type a value in pixels
			to choose how thin or thick you want the outer border and the inner grid lines to be.
		</p>
	</ArticleSection>

	<ArticleSection>
		<h2 id="rendering-options-grid-cells">Rendering options: Grid cells</h2>

		<h3>What are grid cells?</h3>
		<p>
			A grid divides an image into cells that are separated by grid lines. For example, in the 3x3
			grid below there are nine grid cells labeled from 1 to 9.
		</p>

		<div class="not-prose grid place-items-start">
			<div class="bg-card-foreground grid grid-cols-3 grid-rows-3 gap-px p-px">
				{#each { length: 9 }, i}
					<div class="bg-card grid size-8 place-items-center">{i + 1}</div>
				{/each}
			</div>
		</div>

		<h3>How do I change the type of grid cells?</h3>
		<p>
			You can click on the <strong>Grid cell type</strong> setting and choose between
			<strong>Square</strong> to have grid cells with the same width and height (shown below on the
			left) and
			<strong>Rectangle</strong> to freely choose the grid cell sizes (shown below on the right).
		</p>

		<div class="not-prose flex items-center gap-8">
			<div class="grid place-items-start">
				<div class="bg-card-foreground grid grid-cols-3 grid-rows-3 gap-px p-px">
					{#each { length: 9 }}
						<div class="bg-card size-8"></div>
					{/each}
				</div>
			</div>

			<div class="grid place-items-start">
				<div class="bg-card-foreground grid grid-cols-3 grid-rows-3 gap-px p-px">
					{#each { length: 9 }}
						<div class="bg-card h-8 w-16"></div>
					{/each}
				</div>
			</div>
		</div>

		<h3>How do I change the width of grid cells?</h3>
		<p>
			You can click on the <strong>Grid cell width</strong> setting and type a value in pixels to
			choose how wide you want the grid cells to be. This value is also be used for the height of
			grid cells if the <strong>Grid cell type</strong> is set to <strong>Square</strong>.
		</p>

		<h3>How do I change the height of grid cells?</h3>
		<p>
			You can click on the <strong>Grid cell type</strong> setting and select the
			<strong>Rectangle</strong> option, then click on the <strong>Grid cell height</strong> setting
			and type a value in pixels to choose how tall you want the grid cells to be.
		</p>

		<h3>Are all the grid cells the exact same size?</h3>
		<p>
			All grid cells have the exact same size except for the ones that do not fit in the image at
			the right and bottom edges. Fox example, in the grid below the cells 3, 6, and 9 are smaller
			and only fill the remaining space on the right border of the image.
		</p>

		<div class="not-prose grid place-items-start">
			<div class="bg-card-foreground grid grid-cols-[2fr_2fr_1fr] grid-rows-3 gap-px p-px">
				{#each { length: 9 }, i}
					<div class={['bg-card grid h-8 place-items-center', (i + 1) % 3 === 0 ? 'w-8' : 'w-16']}>
						{i + 1}
					</div>
				{/each}
			</div>
		</div>

		<h3>How do I scale up grid cells?</h3>
		<p>
			You can click on the <strong>Grid cell scale</strong> setting and type a multiplier value to apply
			to the grid cell sizes. For example, if you set the scale to 5, a grid cell that is 20x20 pixels
			in the original image will be scaled up to 100x100 pixels in the rendered image.
		</p>

		<h3>How do I round the corners of grid cells?</h3>
		<p>
			You can click on the <strong>Grid cell corner radius</strong> setting and type a value in
			pixels for the radius to apply to the corners of grid cells. You may need to also scale up
			grid cells using the <strong>Grid cell scale</strong> setting if they are too small to be rounded
			correctly.
		</p>
	</ArticleSection>

	<ArticleSection>
		<h2 id="tips-for-pixel-art">Tips for pixel art</h2>

		<h3>Use square, 1x1 pixels grid cells</h3>
		<p>
			If you want every pixel in the original pixel art image to be its own grid cell, you should
			use the <strong>Square</strong> grid cell type and set the <strong>Grid cell width</strong> to
			be 1 pixel. These are the default values when rendering an image.
		</p>

		<h3>Scale up grid cells to distinguish them from grid lines</h3>
		<p>
			If every pixel is its own grid cell and the grid lines size is also 1 pixel, the rendered
			image can look confusing. To avoid this, you can set the <strong>Grid cell scale</strong> to 10
			for example. This causes the grid cells to become 10x10 pixels in the rendered image while the
			grid lines remain 1 pixel thick.
		</p>

		<h3>Scale up grid cells to round their corners</h3>
		<p>
			If every pixel is its own grid cell and you want the corners to be rounded, you need to scale
			up the grid cells. For example, you can set the <strong>Grid cell scale</strong> to 50 and the
			<strong>Grid cell corner radius</strong> to 10. This causes the grid cells to become 50x50 pixels
			in the rendered image with a corner radius of 10 pixels.
		</p>
	</ArticleSection>

	<ArticleSection>
		<h2 id="tips-for-high-resolution-images">Tips for high resolution images</h2>

		<h3>Use larger grid cells</h3>
		<p>
			If you are adding a grid to a high resolution image, you can try setting the
			<strong>Grid cell width</strong> to a higher value like 100 pixels. Otherwise, the grid will be
			very fine and the rendered image will look like a darker version of the original image.
		</p>

		<h3>Use thicker grid lines</h3>
		<p>
			If you are using larger cell sizes, you may also need to increase the
			<strong>Grid lines size</strong> value to better see the grid lines in the rendered images.
		</p>

		<h3>Render fewer images at a time</h3>
		<p>
			Adding grids to high resolution images, especially with smaller cell sizes, is a resource
			intensive operation which may cause the app to become slow and unresponsive. When processing
			many high resolution images, you should try rendering them in smaller batches or one by one.
		</p>
	</ArticleSection>

	<ArticleSection>
		<h2 id="other-questions">Other questions</h2>

		<h3>Are the original colors exactly preserved in the rendered images?</h3>
		<p>
			<strong>Probably not.</strong> Depending on the browser that you are using, you should expect some
			slight differences between the colors in a rendered image and the ones in the original image. In
			general, rendering images should be considered a lossy operation.
		</p>

		<h3>Why is the app becoming slow and unresponsive?</h3>
		<p>
			The app performance is influenced by your browser and device. If you are rendering a high
			number of images or even a single high quality image, you should expect some slowdowns.
		</p>

		<h3>I want to ask another question.</h3>
		<p>
			Please <a href="https://github.com/velut/gridify.it/issues">open an issue on GitHub</a>, it's
			the fastest way for me too see your question. You can also send me an email to
			<a href="mailto:scibona.edoardo@proton.me">scibona.edoardo@proton.me</a>.
		</p>
	</ArticleSection>
</Article>
