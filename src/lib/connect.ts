import { getConfig } from '$stores/store_helpers';

let ws: WebSocket;
let status = 'Disconnected';
let receivedMessage = '';

// Connect to the Rust WebSocket server
export function connectWebSocket() {
	ws = new WebSocket('ws://127.0.0.1:9001');

	ws.onopen = () => {
		status = 'Connected to Rust WebSocket Server';
		console.log(status);
	};

	ws.onmessage = (event) => {
		receivedMessage = event.data;
		console.log('Received from server:', receivedMessage);
	};

	ws.onclose = () => {
		status = 'Disconnected';
		console.log(status);
	};

	ws.onerror = (error: any) => {
		status = `Error: ${error.message}`;
		console.error(status);
	};
}

export function pushMessage(message: object) {
	if (ws && ws.readyState === WebSocket.OPEN) {
		ws.send(JSON.stringify(message));
		console.log('Message sent:', message);
	}
}

export async function getActiveProposals() {
	const path = `${getConfig().VITE_BRIDGE_API}/proposals/v1/active-proposals`;
	const response = await fetch(path);
	if (response.status === 404) return [];
	const res = await response.json();
	return res;
}
