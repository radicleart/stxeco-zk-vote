<script lang="ts">
	import { type OwnershipProofData } from '$types/local_types';
	import { ProfileCardOutline } from 'flowbite-svelte-icons';

	export let keyInfo:OwnershipProofData;

</script>
  
<div class="me-3 flex justify-content-end">
    <ProfileCardOutline class="w-6 h-6 text-blue-500" />
</div>
<div class="w-4/5 flex flex-col justify-content-start">
        <p class="text-md font-medium capitalize">
            {keyInfo.chain}
        </p>
        <p class="text-sm font-medium">
            {keyInfo.address.substring(0,16)}...
        </p>
        <p class="text-sm font-medium">
            Signature: {keyInfo.signature.substring(0,6)}
        </p>
</div>
