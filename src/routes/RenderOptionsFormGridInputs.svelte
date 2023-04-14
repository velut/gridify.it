<div class="form-control w-full">
	<label for="grid.type" class="label">
		<span class="label-text">Select grid type</span>
	</label>
	<select id="grid.type" name="grid.type" class="select-bordered select select-sm">
		<option value="none">None</option>
		<option value="inner">Inner lines only</option>
		<option value="outer">Outer border only</option>
		<option value="full">Full grid (Outer border and inner lines)</option>
	</select>
</div>

<div class="form-control w-full">
	<label for="grid.strokeSize" class="label">
		<span class="label-text">Grid stroke size in pixels</span>
	</label>
	<input
		id="grid.strokeSize"
		name="grid.strokeSize"
		type="text"
		inputMode="numeric"
		pattern="[0-9]*"
		placeholder="1"
		class="input-bordered input input-sm w-full"
	/>
</div>

<div class="form-control w-full">
	<label for="grid.strokeColor" class="label">
		<span class="label-text">Grid color</span>
	</label>
	<input
		id="grid.strokeColor"
		name="grid.strokeColor"
		type="color"
		class="input-bordered input input-sm w-full"
	/>
</div>
