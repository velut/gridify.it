<script lang="ts">
	import OpenAppButton from '$lib/components/OpenAppButton.svelte';
	import { useInterval } from 'runed';

	let screenshots = $state([
		'/screenshots/light/1.jpg',
		'/screenshots/light/2.jpg',
		'/screenshots/light/3.jpg',
		'/screenshots/light/4.jpg'
	]);

	let darkScreenshots = $state([
		'/screenshots/dark/1.jpg',
		'/screenshots/dark/2.jpg',
		'/screenshots/dark/3.jpg',
		'/screenshots/dark/4.jpg'
	]);

	let index = $state(0);

	useInterval(() => {
		index = (index + 1) % screenshots.length;
	}, 2500);
</script>

<div class="grid place-items-center border-t px-6 py-12">
	<div class="grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
		<div>
			<div class="flex flex-col gap-6 dark:hidden">
				<a href={screenshots[index]} target="_blank" class="contents">
					<img loading="lazy" class="card p-0" src={screenshots[index]} alt="App screenshot" />
				</a>
				<div class="grid grid-cols-4 gap-6">
					{#each screenshots as s}
						<a href={s} target="_blank" class="contents">
							<img loading="lazy" class="card p-0" src={s} alt="App screenshot" />
						</a>
					{/each}
				</div>
			</div>

			<div class="hidden flex-col gap-6 dark:flex">
				<div class="">
					<a href={darkScreenshots[index]} target="_blank" class="contents">
						<img
							loading="lazy"
							class="card p-0"
							src={darkScreenshots[index]}
							alt="App screenshot"
						/>
					</a>
				</div>

				<div class="grid grid-cols-4 gap-6">
					{#each darkScreenshots as s}
						<a href={s} target="_blank" class="contents">
							<img loading="lazy" class="card p-0" src={s} alt="App screenshot" />
						</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="card">
			<section>
				<div class="flex flex-col gap-6">
					<div class="prose **:text-foreground">
						<h2>For photos</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore debitis at magnam
							voluptates voluptatibus eligendi atque. Ipsum dolorem corporis laborum, voluptatum id
							non tempore obcaecati, natus reiciendis fuga nemo? Impedit!
						</p>
					</div>

					<div>
						<OpenAppButton />
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
