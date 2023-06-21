<script lang="ts">
	import Metadata from '$lib/components/Metadata.svelte';
	import { githubIssuesUrl, projectName } from '$lib/metadata';
</script>

<Metadata title="FAQ" description="Frequently asked questions for {projectName}" path="faq" />

<main class="flex items-center justify-center p-4 sm:p-8">
	<article class="prose">
		<hgroup>
			<h1>FAQ</h1>
			<p>
				This is a list of frequently asked questions about {projectName}.
				<br />
				Last updated on June 20, 2023.
			</p>
		</hgroup>

		<div class="divider" />

		<ul>
			<li>
				<p><strong>What can I use this app for?</strong></p>
				<p>
					With {projectName} you can easily <strong>add a customizable grid</strong> to your images or
					pixel art creations. You can use different grid types and line colors, resize images, and round
					the corners of grid cells.
				</p>
				<p>
					The pictures below show some examples of what you can do. Click on the previews to see the
					images in full size.
				</p>

				<div class="my-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
					{#each ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'] as imageUrl}
						<a href="/examples/{imageUrl}" target="_blank" class="block h-full w-full">
							<img class="m-0 rounded" src="/examples/small/{imageUrl}" alt="Example {imageUrl}" />
						</a>
					{/each}
				</div>

				<blockquote class="text-sm">
					<p>
						Photo by <a href="https://unsplash.com/@cedric_photography" target="_blank">Cédric VT</a
						>
						on
						<a href="https://unsplash.com/photos/IuJc2qh2TcA" target="_blank">Unsplash</a>
					</p>
				</blockquote>
			</li>

			<li>
				<p><strong>Is this app free to use?</strong></p>
				<p><strong>Yes.</strong> This app is completely free to use.</p>
			</li>

			<li>
				<p><strong>Are my images kept private?</strong></p>
				<p>
					<strong>Yes.</strong> This app works entirely inside your browser and no file ever leaves your
					device.
				</p>
			</li>

			<li>
				<p><strong>Which image formats are supported by the app?</strong></p>
				<p>
					<strong>It depends.</strong> As this app runs inside your browser, you should be able to process
					the image formats natively supported by your browser. In practice, most common images formats
					should work with this app.
				</p>
			</li>

			<li>
				<p><strong> How many images can I process?</strong></p>
				<p>
					<strong>As many as you want.</strong> You can process one image at a time or many images together.
				</p>
			</li>

			<li>
				<p>
					<strong>How do I load images into the app?</strong>
				</p>
				<p>
					Either click on the <strong>Select or Drop Images</strong> button to open a file picker
					dialog or directly <strong>drag and drop</strong> the images on the page.
				</p>
			</li>

			<li>
				<p>
					<strong>How do I remove loaded images?</strong>
				</p>
				<p>
					Click on the <strong>Remove Images</strong> button to discard all images.
				</p>
			</li>

			<li>
				<p>
					<strong>How do I reset the rendering options?</strong>
				</p>
				<p>
					Click on the <strong>Reset Options</strong> button to reset the rendering options to their
					default values.
				</p>
			</li>

			<li>
				<p>
					<strong>How do I apply the rendering options to my images?</strong>
				</p>
				<p>
					Either click on the <strong>Render Images</strong> button or use the keyboard shortcut by
					pressing
					<strong>Ctrl</strong>
					and <strong>Enter</strong> together.
				</p>
			</li>

			<li>
				<p>
					<strong>How do I download the rendered images?</strong>
				</p>
				<p>
					Click on the <strong>Download Images</strong> button to save to your device a zip file containing
					the rendered images.
				</p>
			</li>

			<li>
				<p>
					<strong>Why do the images in the preview look wrong?</strong>
				</p>
				<p>
					A graphical glitch may happen if images are too small, too big, or if they have too many
					grid lines. Always click on the image preview to see the real rendered image in a new
					page.
				</p>
			</li>

			<li>
				<p>
					<strong>Why have the images been rendered incorrectly?</strong>
				</p>
				<p>
					Incorrectly rendered images may be the result of bugs in browsers or graphical drivers.
					Try changing the rendering options and then render the images again. Alternatively, try
					using different browsers or devices to render the images.
				</p>
			</li>

			<li>
				<p>
					<strong>Which grid type should I choose?</strong>
				</p>
				<p>
					Use <strong>None</strong> if you don't want any type of grid lines; use
					<strong>Inner lines only</strong> if you want just the horizontal and vertical bars
					dividing the image; use <strong>Outer border only</strong> if you just want a frame around
					your image; use <strong>Full grid</strong> if you want both the frame around your image and
					the horizontal and vertical bars dividing the image.
				</p>
			</li>

			<li>
				<p>
					<strong>Which grid stroke size should I choose?</strong>
				</p>
				<p>
					Use 1 if you want grid lines that are 1 pixel in size; use higher values if you want
					thicker grid lines. For example, use 25 for grid lines that are 25 pixels thick.
				</p>
			</li>

			<li>
				<p><strong>How do I change the color of the grid?</strong></p>
				<p>
					Click on the <strong>Grid color</strong> input to choose a different color for the grid.
					The selected color is also used to round cell corners even if the grid type is
					<strong>None</strong>.
				</p>
			</li>

			<li>
				<p>
					<strong>What are grid cells?</strong>
				</p>
				<p>
					Grid cells are the parts of your image created by dividing it with grid lines. In other
					words, a cell is a part of your image surrounded by grid lines. They are like the pieces
					of a puzzle that together form a complete image.
				</p>
			</li>

			<li>
				<p>
					<strong>How do I change the aspect ratio of cells?</strong>
				</p>
				<p>
					Toggle on (default) or off the <strong>Square cells</strong> switch to change between square
					cells and rectangular cells.
				</p>
			</li>

			<li>
				<p>
					<strong>How do I change cell dimensions?</strong>
				</p>
				<p>
					Use the <strong>Cell width</strong> input (and/or the <strong>Cell height</strong> input
					if the
					<strong>Square cells</strong> switch is off) to change the dimensions in pixels of the cells.
					All cells in the grid will have the same dimensions except for the ones that do not fit in
					the image which instead will fill the remaining space.
				</p>
			</li>

			<li>
				<p>
					<strong>Which cell scale multiplier should I use?</strong>
				</p>
				<p>
					Use 1 if you want the cells to keep the same size they have in the original image; use
					higher values if you want to scale up the cells. For example, a 2x3 pixels cell with a
					scale value of 5 becomes a 10x15 pixels cell in the rendered image.
				</p>
			</li>

			<li>
				<p>
					<strong>Which cell corner radius should I use?</strong>
				</p>
				<p>
					Use 0 if you want cells to have square corners; use higher values to round cell corners
					more and more; use really high values like 1000 to turn square cells into circles. You may
					need to scale up cells if they are too small to be rounded correctly.
				</p>
			</li>

			<li>
				<p>
					<strong>When should I use the fully opaque pixels option?</strong>
				</p>
				<p>
					Toggle on the <strong>Fully opaque pixels</strong> switch only if your original image contains
					transparent pixels that you don't want to be mixed with the grid color.
				</p>
			</li>

			<li>
				<p>
					<strong>Are the original image colors exactly preserved in the rendered images?</strong>
				</p>
				<p>
					<strong>Probably not.</strong> Depending on the browser that you are using, you should expect
					some slight differences between the colors in a rendered image and the original image colors.
					In general, rendering images should be considered a lossy operation.
				</p>
			</li>

			<li>
				<p>
					<strong>Why is the app becoming slow and unresponsive?</strong>
				</p>
				<p>
					The app performance is influenced by your browser and device. If you are processing a high
					number of images or even a single image with large dimensions, you should expect some
					slowdowns.
				</p>
			</li>

			<li>
				<p>
					<strong>I found an error / I want to ask another question.</strong>
				</p>
				<p>
					Please <a href={githubIssuesUrl} target="_blank">open an issue on Github</a>, it's the
					fastest way to have your question seen.
				</p>
			</li>
		</ul>

		<div class="divider" />
	</article>
</main>
