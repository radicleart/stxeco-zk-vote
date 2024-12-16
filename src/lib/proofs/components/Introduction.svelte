<script>
	import { goto } from '$app/navigation';
	import { ArrowRightAltOutline } from 'flowbite-svelte-icons';
	import ProofCard from '$lib/proofs/components/ProofCard.svelte';

	$: selected = 0;
</script>

<!-- IntroPage.svelte -->
<div
	class="min-h-screen flex flex-col justify-start mt-10 items-center bg-transparent text-white p-6"
>
	<!-- Header Section -->
	<h1 class="text-4xl font-bold mb-4 text-primary-500">ZK-KYC - Privacy Enhanced DAO and DeFi</h1>
	<p class="text-lg mb-2 text-gray-300 text-center max-w-3xl">Control your online identity</p>
	<p class="text-sm mb-8 text-gray-500 text-center leading-tight max-w-2xl">
		Zero knowledge proofs change the way we think about ourselves online and pave the way for
		decentralised digital ownership, finance, advertising and more
	</p>

	<!-- Data Collection Explanation -->
	<div class="bg-gray-900 rounded-lg shadow-lg p-6 max-w-3xl w-full">
		<!-- <h2 class="w-full text-2xl font-semibold mb-4 text-primary-500">What to prove?</h2> -->
		<div class="grid md:grid-cols-3 grid-cols-1 space-4 gap-4">
			<ProofCard
				target={'/proofs/voting'}
				label={'Continue'}
				title={'Voting'}
				description={"Prove you're elligible to what and the voting power you own"}
				selected={0}
			/>
			<ProofCard
				target={'/proofs/keys'}
				label={'Coming soon!'}
				title={'Ownership'}
				description={'Sign messages to provide proof of ownership of your accounts and assets'}
				selected={1}
			/>
			<ProofCard
				target={'/proofs/keys'}
				label={'Coming soon!'}
				title={'Age'}
				description={'Prove your over a certain age without revealing your actual age or date of birth'}
				selected={1}
			/>
			<ProofCard
				target={'/proofs/keys'}
				label={'Coming soon!'}
				title={'Humanity'}
				description={'Prove your not a bot or AI agent'}
				selected={1}
			/>
			<ProofCard
				target={'/proofs/keys'}
				label={'Coming soon!'}
				title={'Citizenship'}
				description={'The place you have a passport and residency'}
				selected={1}
			/>
		</div>
	</div>

	<p class="text-sm mt-10 text-gray-500 text-center">
		No data is collected or sent anywhere. We generate a zero knowledge proof that you can later use
		to verify yourself as a human being on different chains and projects
	</p>
</div>
