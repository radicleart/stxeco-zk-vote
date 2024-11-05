<script lang="ts">
	import { goto } from "$app/navigation";
	import { sessionStore } from '$stores/stores'
	import { ArrowRightAltOutline } from "flowbite-svelte-icons";

</script>


<div class="min-h-screen flex flex-col justify-start mt-5 items-center bg-black text-white p-6">
    <!-- Header Section -->
  <h1 class="text-4xl font-bold mb-4 text-primary-500">Proof of Personhood</h1>
  <p class="text-lg mb-2 text-gray-300 text-center max-w-3xl">
    Connect the camera and to capture likeness
  </p>
    
  <!-- Data Collection Explanation -->
  <div class="bg-gray-900 rounded-lg shadow-lg p-6 max-w-3xl w-full">
    <h2 class="text-2xl font-semibold mb-4 text-primary-500">Provide likeness</h2>
    <div>
      <div class="flex flex-col my-5 mt-10">
        <div class="grid ">
          <div class="grid  gap-4">
            <div class="flex shadow-md items-center rounded-lg justify-center py-8text-[#ffffff] h-[290px] bg-[#54B3EB]">
              <span class="py-6 px-4 flex justify-content-start text-center">
                Attach camera and take likeness
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="text-sm mt-6 text-gray-500 text-center">
      No data is collected or sent anywhere. We generate a zero knowledge proof that you can later use to verify yourself as a human being on different chains and projects
    </p>
  </div>

  <!-- Action Button -->
  <div class="w-full mt-8 flex justify-center">
    <button on:click={() => goto('/proofs/citizenship')} disabled={$sessionStore.proofs?.ownershipData?.length === 0} class="bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200 disabled:bg-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed">
      <ArrowRightAltOutline class="inline"/> Continue
    </button>
  </div>
</div>
