<script>
	import { goto } from '$app/navigation';
	import { ArrowRightAltOutline } from 'flowbite-svelte-icons';

	$: selected = 0;
</script>

<!-- IntroPage.svelte -->
<div class="min-h-screen flex flex-col justify-start mt-10 items-center bg-black text-white p-6">
	<!-- Header Section -->
	<h1 class="text-4xl font-bold mb-4 text-primary-500">
		ZK-VOTING - Privacy Enhanced DAO and DeFi
	</h1>
	<p class="text-lg mb-2 text-gray-300 text-center max-w-3xl">Control your online identity</p>
	<p class="text-sm mb-8 text-gray-500 text-center leading-tight max-w-2xl">
		Zero knowledge proofs change the way we think about ourselves online and pave the way for
		decentralised digital ownership, finance, advertising and more
	</p>

	<!-- Data Collection Explanation -->
	<div class="bg-gray-900 rounded-lg shadow-lg p-6 max-w-3xl w-full">
		<h2 class="w-full text-2xl font-semibold mb-4 text-primary-500">What to prove?</h2>
		<div class="grid md:grid-cols-3 grid-cols-1 space-4 gap-4">
			<div
				class="col-span-1 p-5 border border-gray-300 rounded-lg cursor-pointer hover:bg-sand-200 hover:text-sand-800"
				on:focus
				on:mouseover={() => (selected = 5)}
				role="button"
				tabindex="0"
			>
				<div class="font-semibold text-primary-400 pb-2">Voting</div>
				<div class="text-sm font-mono">
					Prove you're elligible to what and the voting power you own
				</div>
				<div class="text-sm font-mono text-center text-secondary-500">
					{#if selected === 5}
						<div class="w-full mt-8 flex justify-center">
							<button
								on:click={() => goto('/proofs/voting')}
								class="bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200"
							>
								<ArrowRightAltOutline class="inline" /> Continue
							</button>
						</div>
					{/if}
				</div>
			</div>

			<div
				class="col-span-1 p-5 border border-gray-300 rounded-lg cursor-pointer hover:bg-sand-200 hover:text-sand-800"
				on:focus
				on:mouseover={() => (selected = 0)}
				role="button"
				tabindex="0"
			>
				<div class="font-semibold text-primary-400 pb-2">Ownership</div>
				<div class="text-sm font-mono">
					Sign messages to provide proof of ownership of your accounts and assets
				</div>
				<div class="text-sm font-mono text-center text-secondary-500">
					{#if selected === 1}
						<div class="w-full mt-8 flex justify-center">
							<button
								on:click={() => goto('/proofs/keys')}
								class="bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200"
							>
								<ArrowRightAltOutline class="inline" /> Coming soon!
							</button>
						</div>
					{/if}
				</div>
			</div>

			<div
				class="col-span-1 p-5 border border-gray-300 rounded-lg cursor-pointer hover:bg-sand-200 hover:text-sand-800"
				on:focus
				on:mouseover={() => (selected = 0)}
				role="button"
				tabindex="0"
			>
				<div class="font-semibold text-primary-400 pb-2">Age</div>
				<div class="text-sm font-mono">
					Proove your over a certain age without revealing your actual age or date of birth
				</div>
				<div class="text-sm font-mono text-center text-secondary-500">
					{#if selected === 2}
						<div class="w-full mt-8 flex justify-center">
							<button
								on:click={() => goto('/proofs/keys')}
								class="bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200"
							>
								<ArrowRightAltOutline class="inline" /> Coming soon!
							</button>
						</div>
					{/if}
				</div>
			</div>

			<div
				class="col-span-1 p-5 border border-gray-300 rounded-lg cursor-pointer hover:bg-sand-200 hover:text-sand-800"
				on:focus
				on:mouseover={() => (selected = 0)}
				role="button"
				tabindex="0"
			>
				<div class="font-semibold text-primary-400 pb-2">Humanity</div>
				<div class="text-sm font-mono">Prove your not a bot or AI agent</div>
				<div class="text-sm font-mono text-center text-secondary-500">
					{#if selected === 3}
						<div class="w-full mt-8 flex justify-center">
							<button
								on:click={() => goto('/proofs/keys')}
								class="bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200"
							>
								<ArrowRightAltOutline class="inline" /> Coming soon!
							</button>
						</div>
					{/if}
				</div>
			</div>

			<div
				class="col-span-1 p-5 border border-gray-300 rounded-lg cursor-pointer hover:bg-sand-200 hover:text-sand-800"
				on:focus
				on:mouseover={() => (selected = 0)}
				role="button"
				tabindex="0"
			>
				<div class="font-semibold text-primary-400 pb-2">Citizenship</div>
				<div class="text-sm font-mono">The place you have a passport and residency</div>
				<div class="text-sm font-mono text-center text-secondary-500">
					{#if selected === 4}
						<div class="w-full mt-8 flex justify-center">
							<button
								on:click={() => goto('/proofs/keys')}
								class="bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200"
							>
								<ArrowRightAltOutline class="inline" /> Coming soon!
							</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<p class="text-sm mt-10 text-gray-500 text-center">
		No data is collected or sent anywhere. We generate a zero knowledge proof that you can later use
		to verify yourself as a human being on different chains and projects
	</p>
</div>
