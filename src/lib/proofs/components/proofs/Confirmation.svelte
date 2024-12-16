<script lang="ts">

	import { goto } from "$app/navigation";
	import { pushMessage } from "$lib/connect";
	import { sessionStore } from "$stores/stores";
	import { CHAIN, type CitizenshipProofData, type OwnershipProofData, type PersonhoodProofData } from "$types/local_types";

  const ethKeyId:OwnershipProofData|undefined = $sessionStore.proofs?.ownershipData?.find((o) => o.chain === CHAIN.ETHEREUM);
  const solKeyId:OwnershipProofData|undefined = $sessionStore.proofs?.ownershipData?.find((o) => o.chain === CHAIN.SOLANA);
  const stxKeyId:OwnershipProofData|undefined = $sessionStore.proofs?.ownershipData?.find((o) => o.chain === CHAIN.STACKS);
  const citKeyId:CitizenshipProofData|undefined = $sessionStore.proofs?.citizenshipData;
  const perKeyId:PersonhoodProofData|undefined = $sessionStore.proofs?.personhoodData;

  const buildZk = () => {
    const message = {
      message_type: 'ProofGeneration',
      proof_type: 'VdfProof',
      start: '1',
      n: 16,
    }
    pushMessage(message);
  }
</script>
<!-- IntroPage.svelte -->
<div class="min-h-screen flex flex-col justify-start mt-10 items-center bg-black text-white p-6">
    <!-- Header Section -->
    <h1 class="text-4xl font-bold mb-4 text-primary-500">Zero Knowledge Identity</h1>
      
    <!-- Data Collection Explanation -->
    <div class="bg-gray-900 rounded-lg shadow-lg p-6 max-w-3xl w-full">
      <h2 class="w-full text-2xl font-semibold mb-4 text-primary-500">Proof will be generated for;</h2>


      <div class="bg-gray-900 rounded-lg shadow-lg p-4 w-full">
        <div class="grid  justify-center gap-y-5">
          <div class="col-span-1">
            <div class="font-semibold text-primary-400">Proof of ownership</div> 
            {#if ethKeyId}
            <div class="text-sm font-mono">
             {ethKeyId.address}
            </div>
            {/if}
            {#if solKeyId}
            <div class="text-sm font-mono">
             {solKeyId.address}
            </div>
            {/if}
            {#if stxKeyId}
            <div class="text-sm font-mono">
             {stxKeyId.address}
            </div>
            {/if}
          </div>
          <div class="col-span-1">
            <div class="font-semibold text-primary-400">Proof of citizenship</div>
            <div class="text-sm font-mono">
              {#if citKeyId}
              {citKeyId.passportImage.substring(0,40)}
              {:else}
              -
              {/if}
            </div>
          </div>
          <div class="col-span-1">
            <div class="font-semibold text-primary-400">Proof of personhood</div>
            <div class="text-sm font-mono">
              {#if perKeyId}
              {perKeyId.likenessImage.substring(0,40)}
              {:else}
              -
              {/if}
            </div>
          </div>
        </div>
      </div>
      
      <p class="text-sm mt-10 text-gray-500 text-center">
        No data is collected or sent anywhere. We generate a zero knowledge proof that you can later use to verify yourself as a human being on different chains and projects
      </p>
    </div>
  
    <!-- Action Button -->
    <div class="w-full mt-8 flex justify-center">
      <button on:click={() => buildZk()} class="bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200">
        Build to zkProof
      </button>
    </div>
</div>
  
