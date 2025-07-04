<script lang="ts">
	import MaterialSymbolsContrast from '~icons/material-symbols/contrast';

	function changeTheme() {
		if (document.documentElement.classList.contains('dark')) {
			localStorage.theme = 'light';
			document.documentElement.classList.remove('dark');
		} else {
			localStorage.theme = 'dark';
			document.documentElement.classList.add('dark');
		}
	}
</script>

<button type="button" class="btn-sm-icon-outline" title="Change theme" onclick={changeTheme}>
	<MaterialSymbolsContrast class="size-4" />
	<span class="sr-only">Change theme</span>
</button>
