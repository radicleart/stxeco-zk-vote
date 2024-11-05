<script lang="ts">
	import { goto } from "$app/navigation";
	import Confirmation from "$lib/components/proofs/Confirmation.svelte";
	import { pushMessage } from "$lib/connect";
	import { ArrowLeftOutline } from "flowbite-svelte-icons";
	import { onMount } from "svelte";
	

	onMount(async () => {
  	})
</script>

<svelte:head>
	<title>Z-KYC Sign Messages</title>
	<meta name="description" content="Proove ownership of your main accounts" />
</svelte:head>


<div class="py-4 mx-auto max-w-7xl md:px-6">
  	<div class="flex flex-col w-full my-8 items-center">
		<div class="w-full flex text-sm mt-2 text-gray-500 justify-end max-w-3xl">
			<button on:click={() => goto('/')} class=" hover:text-primary-600 text-gray-300 font-semibold rounded transition duration-200">
			  <ArrowLeftOutline class="inline-block"/> Back
			</button>
		</div>
		<Confirmation/>
  	</div>
</div>