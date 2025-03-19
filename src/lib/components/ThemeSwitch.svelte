<script lang="ts">
	function changeTheme() {
		if (document.documentElement.getAttribute('data-theme') === 'dark') {
			localStorage.theme = 'light';
			document.documentElement.setAttribute('data-theme', 'light');
		} else {
			localStorage.theme = 'dark';
			document.documentElement.setAttribute('data-theme', 'dark');
		}
	}
</script>

<button class="link-hover link" onclick={changeTheme}>Change theme</button>
