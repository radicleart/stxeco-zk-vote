<script lang="ts">
	import { CHAIN, WALLET } from '$types/local_types';
  import { ethers } from 'ethers';
  import { PaperPlaneSolid, ProfileCardOutline, ShoppingBagSolid } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();


  async function connectAndSign() {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
          try {
              // Request wallet connection
              await window.ethereum.request({ method: 'eth_requestAccounts' });

              // Create an ethers provider
              const provider = new ethers.BrowserProvider(window.ethereum);

              // Get the signer
              const signer = await provider.getSigner();

              // Sample message to sign
              const message = "Sign this message to verify your identity";
              
              // Get the signature
              const signature = await signer.signMessage(message);
              const address = ethers.recoverAddress(
                  ethers.hashMessage(message), // Hash the message
                  signature
              );

              console.log('Signature:', signature);
              console.log('address:', address);
              dispatch('signedMessage', {address, signature, chain: CHAIN.SOLANA, wallet: WALLET.PHANTOM})
            } catch (error) {
              console.error('Error connecting to wallet:', error);
          }
      } else {
          console.error('MetaMask is not installed.');
      }
  }
</script>

<div class="me-3 flex justify-content-end">
    <ProfileCardOutline class="w-6 h-6 text-blue-500" />
</div>
<div class="w-4/5 flex flex-col justify-content-start">
    <p class="text-lg font-medium">
        Solana
    </p>
    <p class="text-sm font-thin mb-5">
        Connect with Phantom, Solscan, Solflare etc
    </p>
    <p class="text-sm font-thin">
        <button disabled={true} on:click={() => connectAndSign()} class="bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200 disabled:bg-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed">
            Sign message
        </button>
    </p>
</div>
