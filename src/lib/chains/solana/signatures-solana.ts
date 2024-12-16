import { Keypair, Connection, clusterApiUrl } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { hex, base64 } from '@scure/base';

function formatVotingMessage(
	proposal: string,
	vote: string,
	votingPower: string,
	votingWindowBegins: number,
	votingWindowEnds: number
): string {
	return `
	  Your signature of the following message represents your voting intention.
	  Proposal: ${proposal}
	  Vote: ${vote}
	  Voting Power: ${votingPower}
	  Voting Window Begins: ${votingWindowBegins}
	  Voting Window Ends: ${votingWindowEnds}
	`.trim();
}

async function signVotingMessage(wallet: any) {
	const proposal = 'SIP-028: sBTC Signer Criteria';
	const vote = 'for';
	const votingPower = '0.000000';
	const votingWindowBegins = 868000;
	const votingWindowEnds = 869749;

	const message = formatVotingMessage(
		proposal,
		vote,
		votingPower,
		votingWindowBegins,
		votingWindowEnds
	);

	// Convert the message to a byte array
	const messageBytes = new TextEncoder().encode(message);

	// Request the user to sign the message
	const signedMessage = await wallet.signMessage(messageBytes);

	console.log('Signed Message:', signedMessage);
	console.log('Base64 Signature:', base64.encode(signedMessage.signature));
	return signedMessage;
}

export function isLoggedInSolana() {
	return (window as any).solana && (window as any).solana.isConnected;
}

export const connectWallet = async () => {
	try {
		const provider = (window as any).solana;
		if (provider) {
			// && provider.isPhantom) {
			console.log('Phantom wallet found');
			await provider.connect();
			const wallet = provider.publicKey.toString();
			console.log('Connected with public key:', wallet);

			// Sign the voting message
			const signedMessage = await signVotingMessage(provider);
			return signedMessage;
		} else {
			throw new Error('Phantom wallet not detected');
		}
	} catch (err: any) {
		throw new Error('Failed to connect wallet: ' + err.message);
	}
};

export async function checkAndReconnectWallet() {
	// Check if Phantom wallet is installed
	if ((window as any).solana) {
		try {
			// Attempt to reconnect without prompting the user
			const response = await (window as any).solana.connect({ onlyIfTrusted: true });
			if (response.publicKey) {
				console.log('Phantom wallet reconnected with public key:', response.publicKey.toBase58());
			} else {
				console.log('Phantom wallet is not connected.');
			}
		} catch (error) {
			console.error('Wallet connection failed:', error);
		}
	} else {
		console.log('Phantom wallet not detected.');
	}
}

export const disconnectSolanaWallet = async () => {
	// if ((window as any).solana && (window as any).solana.isPhantom) {
	// } else {
	// 	console.log('Phantom wallet not detected.');
	// }
	try {
		await (window as any).solana.disconnect();
		console.log('Phantom wallet disconnected successfully.');
	} catch (error) {
		console.error('Failed to disconnect Phantom wallet:', error);
	}
};
