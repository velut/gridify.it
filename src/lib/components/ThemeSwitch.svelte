<script lang="ts">
	const changeTheme = () => {
		if (localStorage.theme === 'dark') {
			localStorage.theme = 'light';
			document.documentElement.setAttribute('data-theme', 'light');
			document.documentElement.classList.remove('c_darkmode');
		} else {
			localStorage.theme = 'dark';
			document.documentElement.setAttribute('data-theme', 'dark');
			document.documentElement.classList.add('c_darkmode');
		}
	};
</script>

<button class="link-hover link" on:click={changeTheme}>Change Theme</button>
