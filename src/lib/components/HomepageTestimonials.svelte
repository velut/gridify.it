<script lang="ts">
	let testimonials = $state([
		{
			name: 'AnythingUnderHeaven on Reddit',
			text: 'This works really well and helped my mum with her crafting!',
			url: 'https://reddit.com/r/webdev/comments/14nx8p5/i_made_a_website_to_add_grids_to_images_and_pixel/khosydk/'
		},
		{
			name: 'Jane Smith',
			text: 'A fantastic tool for artists. Highly recommend it!',
			url: '/testimonials/john.jpg'
		},
		{
			name: 'Jane Smith',
			text: 'A fantastic tool for artists. Highly recommend it!',
			url: '/testimonials/john.jpg'
		},
		{
			name: 'Jane Smith',
			text: 'A fantastic tool for artists. Highly recommend it!',
			url: '/testimonials/john.jpg'
		},
		{
			name: 'Jane Smith',
			text: 'A fantastic tool for artists. Highly recommend it!',
			url: '/testimonials/john.jpg'
		},
		{
			name: 'Jane Smith',
			text: 'A fantastic tool for artists. Highly recommend it!',
			url: '/testimonials/john.jpg'
		},
		{
			name: 'Jane Smith',
			text: 'A fantastic tool for artists. Highly recommend it!',
			url: '/testimonials/john.jpg'
		},
		{
			name: 'Jane Smith',
			text: 'A fantastic tool for artists. Highly recommend it!',
			url: '/testimonials/john.jpg'
		},
		{
			name: 'Alice Johnson',
			text: 'I love using this app for my projects. It makes everything so much easier.',
			url: '/testimonials/john.jpg'
		}
	]);
</script>

<div class="grid place-items-center border-t px-6 py-12">
	<div class="flex max-w-7xl flex-wrap gap-6 *:grow">
		{#each testimonials as t}
			<div class="card">
				<section>
					<div class="flex flex-col gap-2 text-sm">
						<a href={t.url} class="text-muted-foreground hover:underline">{t.name}</a>
						<p>{t.text}</p>
					</div>
				</section>
			</div>
		{/each}
	</div>
</div>
