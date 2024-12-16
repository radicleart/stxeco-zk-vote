<script lang="ts">
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';
	import { sessionStore } from '$stores/stores';
	import { configStore } from '$stores/stores_config';

	const unsubscribe1 = sessionStore.subscribe(() => {});
	const unsubscribe3 = configStore.subscribe(() => {});

	onDestroy(async () => {
		unsubscribe1();
		unsubscribe3();
	});

	onMount(async () => {});
</script>

<div
	class="bg-gray-1000 bg-[url('$lib/assets/bg-lines.svg')] bg-cover text-white font-extralight min-h-screen"
>
	<div class="min-h-[calc(100vh-160px)] mx-auto px-6">
		{#if $sessionStore.wsConnected}
			<slot></slot>
		{/if}
	</div>
</div>
