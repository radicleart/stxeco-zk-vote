<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/polymarket/components/Header.svelte';
	import Footer from '$lib/polymarket/components/Footer.svelte';

	onMount(async () => {});
</script>

<div class="min-h-screen relative flex flex-col">
	<div class="w-full"><Header /></div>
	<div class=" px-6 relative grow">
		<slot></slot>
	</div>
	<div class="w-full"><Footer /></div>
</div>
