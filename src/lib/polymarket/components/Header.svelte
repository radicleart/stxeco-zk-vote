<script lang="ts">
	import { isLoggedInSui, suiConnect } from '$lib/chains/sui/sui-connect';

	export let title = 'Big Market';

	const loginSui = async () => {
		await suiConnect('devnet');
	};
	const logoutSui = async () => {
		await suiConnect('devnet');
	};
</script>

<header class=" text-white p-4">
	<div class="container mx-auto flex justify-between items-center">
		<h1 class="text-2xl font-bold">{title}</h1>
		<nav>
			<a href="/" class="mx-2 hover:text-blue-400">Home</a>
			<a href="/campaign" class="mx-2 hover:text-blue-400">Markets</a>
			{#if isLoggedInSui()}
				<a href="/" on:click|preventDefault={() => logoutSui()} class="mx-2 hover:text-blue-400"
					>Sign out</a
				>
			{:else}
				<a href="/" on:click|preventDefault={() => loginSui()} class="mx-2 hover:text-blue-400"
					>Login</a
				>
			{/if}
		</nav>
	</div>
</header>
