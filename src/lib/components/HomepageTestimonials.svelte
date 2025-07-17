<script lang="ts">
	let testimonials = $state([
		{
			name: 'not-your-it-support on Reddit',
			text: 'Just what I needed. A huge thank you!',
			url: 'https://old.reddit.com/r/webdev/comments/14nx8p5/i_made_a_website_to_add_grids_to_images_and_pixel/ldcyzex/'
		},
		{
			name: 'Unhappy_Pay6732 on Reddit',
			text: 'This might be the one I need for my crochet project.',
			url: 'https://old.reddit.com/r/webdev/comments/14nx8p5/i_made_a_website_to_add_grids_to_images_and_pixel/lfcjdlq/'
		},
		{
			name: 'AnythingUnderHeaven on Reddit',
			text: 'This works really well and helped my mum with her crafting!',
			url: 'https://old.reddit.com/r/webdev/comments/14nx8p5/i_made_a_website_to_add_grids_to_images_and_pixel/khosydk/'
		},
		{
			name: 'jules_thefools on Reddit',
			text: 'This is so so so sick. THANK YOU.',
			url: 'https://old.reddit.com/r/webdev/comments/14nx8p5/i_made_a_website_to_add_grids_to_images_and_pixel/l5zpb6y/'
		},
		{
			name: 'WestwardSquall on Reddit',
			text: "This is a game changer for me!!! I do perler bead art and the program I use to design patterns doesn't save images with a grid, so I'm always counting pixels!! Thank you so much!!",
			url: 'https://old.reddit.com/r/webdev/comments/14nx8p5/i_made_a_website_to_add_grids_to_images_and_pixel/lveoiko/'
		},
		{
			name: 'ashy_-_- on Reddit',
			text: "I've randomly gotten into building pixel art in minecraft again and this site is such a lifesaver, I love it.",
			url: 'https://old.reddit.com/r/webdev/comments/14nx8p5/i_made_a_website_to_add_grids_to_images_and_pixel/mc5muxq/'
		},
		{
			name: 'OnlyBegottenDaughter on Reddit',
			text: 'I am just getting into beading and i was looking for a tool to convert my own images to patterns, this is very helpful!',
			url: 'https://old.reddit.com/r/webdev/comments/14nx8p5/i_made_a_website_to_add_grids_to_images_and_pixel/msu909h/'
		},
		{
			name: 'AlpacaGoddess on Reddit',
			text: 'I like to crochet certain pixel art things and I want to make an irl minecraft bee, but I wanted to line up my stitches with the actual colors. This will help SO much with that and future projects.',
			url: 'https://old.reddit.com/r/webdev/comments/14nx8p5/i_made_a_website_to_add_grids_to_images_and_pixel/kuqriqt/'
		},
		{
			name: 'Exotic_butter_cats on Reddit',
			text: 'Thank you so much! This is so useful for perler bead designs.',
			url: 'https://old.reddit.com/r/webdev/comments/14nx8p5/i_made_a_website_to_add_grids_to_images_and_pixel/m3dxhif/'
		}
	]);
</script>

<div class="grid place-items-center border-t px-6 py-12">
	<div class="flex max-w-7xl flex-wrap gap-6">
		{#each testimonials as t}
			<div class="card grow">
				<section>
					<div class="flex flex-col gap-2 text-sm">
						<a href={t.url} class="text-muted-foreground hover:underline">{t.name}</a>
						<p class="max-w-[65ch]">{t.text}</p>
					</div>
				</section>
			</div>
		{/each}
	</div>
</div>
