<div class="grow">
	<div class="form-control">
		<label for="grid-type" class="label cursor-pointer">
			<span class="label-text">Enable grid</span>
			<input id="grid-type" type="checkbox" class="toggle" />
		</label>
	</div>

	<div class="form-control w-full">
		<label for="grid-stroke-size" class="label">
			<span class="label-text">Grid lines stroke size in pixels</span>
		</label>
		<input
			id="grid-stroke-size"
			type="text"
			inputMode="numeric"
			pattern="[0-9]*"
			placeholder="1"
			class="input-bordered input input-sm w-full"
		/>
	</div>

	<div class="form-control w-full">
		<label for="scaling-factor" class="label">
			<span class="label-text">Scaling factor</span>
		</label>
		<input
			id="scaling-factor"
			type="text"
			inputMode="numeric"
			pattern="[0-9]*"
			placeholder="1"
			class="input-bordered input input-sm w-full"
		/>
	</div>

	<div class="form-control">
		<label for="fully-opaque-pixels" class="label cursor-pointer">
			<span class="label-text">Fully opaque pixels</span>
			<input id="fully-opaque-pixels" type="checkbox" class="toggle" />
		</label>
	</div>
</div>
