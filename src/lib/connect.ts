import { getConfig, getSession } from '$stores/store_helpers';
import { isLoggedIn } from '@mijoco/stx_helpers/dist/index';
import { testProposals } from './devnet/proposals';
import { isLoggedInSolana } from './signatures-solana';
import type { SessionStore, SignatureData } from '$types/local_types';
import { sessionStore } from '$stores/stores';

let ws: WebSocket;
let status = 'Disconnected';
let receivedMessage = '';

// Connect to the Rust WebSocket server
export function connectWebSocket() {
	ws = new WebSocket('ws://127.0.0.1:9001');

	ws.onopen = () => {
		status = 'Connected to Rust WebSocket Server';
		sessionStore.update((conf: SessionStore) => {
			conf.wsConnected = true;
			return conf;
		});
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

export async function getProposals() {
	if (getConfig().VITE_NETWORK === 'devnet') {
		return testProposals;
	} else {
		const path = `${getConfig().VITE_BRIDGE_API}/proposals/v1/all-proposals`;
		const response = await fetch(path);
		if (response.status === 404) return [];
		const res = await response.json();
		return res;
	}
}

export function isWalletConnected() {
	return isLoggedIn() || isLoggedInSolana();
}

export async function sendGenerateProof(body: any) {
	try {
		const path = 'http://127.0.0.1:3030/stacks/proof/generate';
		const response = await fetch(path, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('HTTP request failed:', error);
	}
}
