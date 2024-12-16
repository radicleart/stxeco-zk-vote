// run some test transactions

import {
	Connection,
	Keypair,
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
	sendAndConfirmTransaction
} from '@solana/web3.js';
import fs from 'fs';

export const aliceRaw = [
	151, 101, 216, 96, 23, 74, 18, 214, 43, 201, 89, 220, 245, 225, 7, 183, 145, 158, 160, 117, 93,
	216, 231, 44, 39, 76, 156, 27, 129, 13, 98, 11, 49, 242, 18, 208, 57, 225, 29, 49, 215, 0, 9, 234,
	51, 68, 25, 9, 53, 34, 123, 26, 47, 25, 33, 14, 160, 52, 136, 9, 140, 219, 94, 67
];
export const bobRaw = [
	104, 30, 212, 239, 28, 250, 31, 210, 233, 186, 244, 41, 40, 185, 152, 207, 156, 207, 170, 68, 207,
	214, 173, 73, 245, 92, 52, 134, 147, 141, 88, 192, 157, 26, 108, 213, 65, 225, 131, 248, 250, 180,
	21, 15, 78, 101, 241, 186, 46, 137, 2, 98, 134, 100, 138, 5, 208, 20, 192, 40, 171, 231, 181, 125
];

// Helper function to load a keypair from a JSON file
function loadKeypair(filePath: string): Keypair {
	const keypairData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
	return Keypair.fromSecretKey(new Uint8Array(keypairData));
}

// Load Alice and Bob's wallets
const aliceKeyPair = Keypair.fromSecretKey(new Uint8Array(aliceRaw));
const bobKeyPair = Keypair.fromSecretKey(new Uint8Array(bobRaw));
export const bob = bobKeyPair.publicKey;
export const alice = aliceKeyPair.publicKey;
console.log('Bob Public Key:', bob.toBase58());
console.log('Bob Public Key:', alice.toBase58());

const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

async function sendSol(from: Keypair, to: PublicKey, amount: number) {
	const transaction = new Transaction().add(
		SystemProgram.transfer({
			fromPubkey: from.publicKey,
			toPubkey: to,
			lamports: amount * LAMPORTS_PER_SOL // Convert SOL to lamports
		})
	);

	const signature = await sendAndConfirmTransaction(connection, transaction, [from]);
	console.log(`Transaction successful with signature: ${signature}`);
}

export async function transferSol() {
	sendSol(aliceKeyPair, bob, 1)
		.then(() => console.log('Transfer complete'))
		.catch((err) => console.error('Transfer failed:', err));
	sendSol(bobKeyPair, alice, 10)
		.then(() => console.log('Transfer complete'))
		.catch((err) => console.error('Transfer failed:', err));
	sendSol(aliceKeyPair, bob, 50)
		.then(() => console.log('Transfer complete'))
		.catch((err) => console.error('Transfer failed:', err));
}

// Example: Send 1 SOL from Alice to Bob
export async function getTransactionHistory(publicKey: PublicKey) {
	const confirmedSignatures = await connection.getSignaturesForAddress(publicKey);
	const transactionDetails = [];

	for (const signatureInfo of confirmedSignatures) {
		const transaction = await connection.getSignaturesForAddress(publicKey);
		if (transaction) {
			transactionDetails.push(transaction);
		}
	}
	console.log('Transaction history:', transactionDetails);
	return transactionDetails;
}
