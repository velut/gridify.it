<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import ArticleSection from '$lib/components/ArticleSection.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
</script>

<Article>
	<ArticleTitle title="About" />

	<ArticleSection>
		<h2>About gridify.it</h2>

		<h3>What is gridify.it?</h3>
		<p>
			<strong>gridify.it</strong> is a free online grid maker that lets you easily create custom grids
			from your images.
		</p>

		<h3>What can I do with gridify.it?</h3>
		<p>
			You can use gridify.it to add grids to your photos, drawings, pictures, pixel art, or game
			sprites. People use gridify.it for illustration, game development, crocheting, knitting,
			cross-stitching, Hama and Perler beads designs, and other crafts and activities where precise
			grids are required.
		</p>

		<h3>Can I use gridify.it for free?</h3>
		<p><strong>Yes!</strong> You can use gridify.it completely for free.</p>

		<h3>Who created gridify.it?</h3>
		<p>
			Hello! I'm <a href="https://github.com/velut">Edoardo Scibona</a>, a software developer from
			Italy. I initially created gridify.it for my own use related to pixel art and nonogram
			puzzles, and I continue to maintain it as it has become a
			<a
				href="https://old.reddit.com/r/webdev/comments/14nx8p5/i_made_a_website_to_add_grids_to_images_and_pixel/"
				>useful tool for many people</a
			>.
		</p>

		<h3>I want to ask another question.</h3>
		<p>
			Please <a href="https://github.com/velut/gridify.it/issues">open an issue on GitHub</a>, it's
			the fastest way for me too see your question. You can also send me an email to
			<a href="mailto:scibona.edoardo@proton.me">scibona.edoardo@proton.me</a>.
		</p>
	</ArticleSection>
</Article>
