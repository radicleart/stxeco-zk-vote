<script lang="ts">
	import { pushMessage } from "$lib/connect";

    let status = "Disconnected";
    let receivedMessage = "";

    // Send a message to the Rust server
    function sendMessage() {
        const message = {
            action: "start_processing",
            data: "image_data_or_signature_here" // Placeholder data
        };
        pushMessage(message);
    }
</script>

<button on:click={sendMessage}>Send Message</button>

<p>{status}</p>
<p>Received: {receivedMessage}</p>
