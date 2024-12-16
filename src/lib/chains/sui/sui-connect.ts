import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import * as SuiCrypto from '@mysten/sui/cryptography';
import { generateNonce, generateRandomness } from '@mysten/sui/zklogin';
import { Ed25519Keypair, Ed25519PublicKey } from '@mysten/sui/keypairs/ed25519';

let client: SuiClient;

export function isLoggedInSui() {
	return false;
}

export async function suiConnect(network: 'mainnet' | 'testnet' | 'devnet' | 'localnet') {
	const rpcUrl = getFullnodeUrl(network);
	// create a client connected to devnet
	client = new SuiClient({ url: rpcUrl });
	console.log(SuiCrypto);
	const FULLNODE_URL = 'https://fullnode.devnet.sui.io'; // replace with the RPC URL you want to use
	const suiClient = new SuiClient({ url: FULLNODE_URL });
	const { epoch, epochDurationMs, epochStartTimestampMs } =
		await suiClient.getLatestSuiSystemState();

	const maxEpoch = Number(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
	const ephemeralKeyPair = new Ed25519Keypair();
	const randomness = generateRandomness();
	const NONCE = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);
	const CLIENT_ID = '1';
	const REDIRECT_URL = 'http://localhost:8060';
	const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=id_token&redirect_uri=${REDIRECT_URL}&scope=openid&nonce=${NONCE}`;
}

export async function getFunds(owner: string) {
	await client.getCoins({
		owner
	});
}
