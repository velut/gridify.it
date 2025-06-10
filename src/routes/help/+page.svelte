<script lang="ts">
</script>

<main class="grid place-items-center p-4 sm:p-8">
	<article class="grid gap-8">
		<div class="bg-base-100 prose grid place-items-center rounded-lg border p-8">
			<h1 class="">Help & FAQ</h1>
		</div>

		<section class="bg-base-100 prose rounded-lg border p-8">
			<h2>Uploading images</h2>

			<h3>How do I upload images?</h3>
			<p>
				Click on the <strong>Upload images</strong> button to open a file picker dialog. You can
				also directly <strong>drag and drop</strong> the images on the page.
			</p>

			<h3>How do I remove uploaded images?</h3>
			<p>
				Click on the <strong>Remove images</strong> button to remove all uploaded images.
			</p>

			<h3>Which image formats can I use?</h3>
			<p>
				The app supports most common image formats. For best results, use <strong>JPEG</strong> and
				<strong>PNG</strong> images.
			</p>

			<h3>How many images can I upload?</h3>
			<p>
				<strong>As many as you want.</strong> You can upload a single image or many images together.
			</p>

			<h3>Are my uploaded images kept private?</h3>
			<p>
				<strong>Yes!</strong> The app works entirely in your browser and your images never leave your
				device.
			</p>
		</section>

		<section class="bg-base-100 prose rounded-lg border p-8">
			<h2>Downloading images</h2>

			<h3>How do I download the rendered images?</h3>
			<p>
				Click on the <strong>Download images</strong> button to save the rendered images on your device.
			</p>
		</section>

		<section class="bg-base-100 prose rounded-lg border p-8">
			<h2>Previewing images</h2>

			<h3>How do I preview images?</h3>
			<p>After uploading your images, they will automatically show in the preview area.</p>

			<h3>How do I preview an image at full size?</h3>
			<p>Click on an image in the preview area to see it at full size in a new tab.</p>

			<h3>How do I change the preview mode?</h3>
			<p>
				Click on the <strong>Preview mode</strong> setting in the preview area and select between
				<strong>Pixel art</strong> (suited for pixel art, game sprites, and smaller images) and
				<strong>High resolution images</strong> (suited for photos, drawings, and bigger images).
			</p>

			<h3>Why do image previews look weird?</h3>
			<p>
				Due to scaling, image previews may contain visual artifacts; click on an image to see it at
				full size.
			</p>
		</section>

		<section class="bg-base-100 prose rounded-lg border p-8">
			<h2>Rendering images</h2>

			<h3>How do I render images?</h3>
			<p>
				Click on the <strong>Render images</strong> button. You can also use the keyboard shortcut
				by pressing <strong>Ctrl</strong> and
				<strong>Enter</strong> together.
			</p>

			<h3>How do I undo the images render?</h3>
			<p>
				Click on the <strong>Undo render images</strong> button to restore images to their original
				state. You can also use the keyboard shortcut by pressing <strong>Ctrl</strong> and
				<strong>Z</strong> together.
			</p>

			<h3>Why have the images been rendered incorrectly?</h3>
			<p>
				Bugs in browsers or graphical drivers can cause images to be rendered incorrectly. Try
				changing the rendering options and then render the images again. Alternatively, try using
				different browsers or devices to render the images.
			</p>
		</section>

		<section class="bg-base-100 prose rounded-lg border p-8">
			<h2>Rendering options</h2>

			<h3>What are the rendering options?</h3>
			<p>
				The <strong>rendering options</strong> determine how the grid will look like when added to your
				images.
			</p>

			<h3>How do I reset the rendering options?</h3>
			<p>
				Click on the <strong>Reset Options</strong> button to restore the rendering options to their
				default values.
			</p>
		</section>

		<section class="bg-base-100 prose rounded-lg border p-8">
			<h2>Rendering options: Grid</h2>

			<h3>Which grid type should I choose?</h3>
			<p>
				Use <strong>None</strong> if you don't want any type of grid lines; use
				<strong>Inner lines only</strong> if you want just the horizontal and vertical bars dividing
				the image; use <strong>Outer border only</strong> if you just want a frame around your
				image; use <strong>Full grid</strong> if you want both the frame around your image and the horizontal
				and vertical bars dividing the image.
			</p>

			<h3>Which grid stroke size should I choose?</h3>
			<p>
				Use 1 if you want grid lines that are 1 pixel in size; use higher values if you want thicker
				grid lines. For example, use 25 for grid lines that are 25 pixels thick.
			</p>

			<h3>How do I change the color of the grid?</h3>
			<p>
				Click on the <strong>Grid color</strong> input to choose a different color for the grid. The
				selected color is also used to round cell corners even if the grid type is
				<strong>None</strong>.
			</p>

			<h3>When should I use the fully opaque pixels option?</h3>
			<p>
				Toggle on the <strong>Fully opaque pixels</strong> switch only if your original image contains
				transparent pixels that you don't want to be mixed with the grid color.
			</p>
		</section>

		<section class="bg-base-100 prose rounded-lg border p-8">
			<h2>Rendering options: Grid cells</h2>

			<h3>What are grid cells?</h3>
			<p>
				Grid cells are the parts of your image created by dividing it with grid lines. In other
				words, a cell is a part of your image surrounded by grid lines. They are like the pieces of
				a puzzle that together form a complete image.
			</p>

			<h3>How do I change the aspect ratio of cells?</h3>
			<p>
				Toggle on (default) or off the <strong>Square cells</strong> switch to change between square
				cells and rectangular cells.
			</p>

			<h3>How do I change cell dimensions?</h3>
			<p>
				Use the <strong>Cell width</strong> input (and/or the <strong>Cell height</strong> input if
				the
				<strong>Square cells</strong> switch is off) to change the dimensions in pixels of the cells.
				All cells in the grid will have the same dimensions except for the ones that do not fit in the
				image which instead will fill the remaining space.
			</p>

			<h3>Which cell scale multiplier should I use?</h3>
			<p>
				Use 1 if you want the cells to keep the same size they have in the original image; use
				higher values if you want to scale up the cells. For example, a 2x3 pixels cell with a scale
				value of 5 becomes a 10x15 pixels cell in the rendered image.
			</p>

			<h3>Which cell corner radius should I use?</h3>
			<p>
				Use 0 if you want cells to have square corners; use higher values to round cell corners more
				and more; use really high values like 1000 to turn square cells into circles. You may need
				to scale up cells if they are too small to be rounded correctly.
			</p>
		</section>

		<section class="bg-base-100 prose rounded-lg border p-8">
			<h2>Other questions</h2>

			<h3>Are the original image colors exactly preserved in the rendered images?</h3>
			<p>
				<strong>Probably not.</strong> Depending on the browser that you are using, you should expect
				some slight differences between the colors in a rendered image and the original image colors.
				In general, rendering images should be considered a lossy operation.
			</p>

			<h3>Why is the app becoming slow and unresponsive?</h3>
			<p>
				The app performance is influenced by your browser and device. If you are processing a high
				number of images or even a single high quality image, you should expect some slowdowns.
			</p>
		</section>
	</article>
</main>
