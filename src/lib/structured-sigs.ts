import { sha256 } from '@noble/hashes/sha256';
import { verifyMessageSignature } from '@stacks/encryption';
import { hex } from '@scure/base';
import {
	bufferCV,
	serializeCV,
	stringAsciiCV,
	tupleCV,
	uintCV,
	type ClarityValue
} from '@stacks/transactions';
import * as P from 'micro-packed';
import { getConfig } from '$stores/store_helpers';
import { fmtMicroToStx } from './utils';

// type Message = {
// 	script: Uint8Array;
// 	signature: string;
// };
const concat = P.concatBytes;

const prefix = Uint8Array.from([0x53, 0x49, 0x50, 0x30, 0x31, 0x38]); // SIP018

export const enum ChainID {
	Testnet = 2147483648,
	Mainnet = 1
}

export type SignatureData = {
	signature: Uint8Array;
	public_key: Uint8Array;
};

export const domain = {
	name: getConfig().VITE_PUBLIC_APP_NAME,
	version: getConfig().VITE_PUBLIC_APP_VERSION,
	'chain-id': getConfig().VITE_NETWORK === 'mainnet' ? ChainID.Mainnet : ChainID.Testnet
};

export const domainCV = tupleCV({
	name: stringAsciiCV(getConfig().VITE_PUBLIC_APP_NAME),
	version: stringAsciiCV(getConfig().VITE_PUBLIC_APP_VERSION),
	'chain-id': uintCV(getConfig().VITE_NETWORK === 'mainnet' ? ChainID.Mainnet : ChainID.Testnet)
});

export type Message = {
	message: string;
	vote: string;
	proposal: string;
	balanceAtHeight: number;
	burnStartHeight: number;
	burnEndHeight: number;
};
export function messageCV(msg: Message) {
	return tupleCV({
		message: stringAsciiCV(msg.message),
		proposal: stringAsciiCV(msg.proposal),
		vote: stringAsciiCV(msg.vote),
		'voting-power': stringAsciiCV(fmtMicroToStx(msg.balanceAtHeight)),
		'voting-window-begins': uintCV(msg.burnStartHeight),
		'voting-window-ends': uintCV(msg.burnEndHeight)
	});
}

export function verifySignedMessage(message: Message, pubKey: string, signature: string) {
	if (!signature) return false;
	const sig = typeof signature === 'string' ? hex.decode(signature) : signature;
	return verifyStructuredDataSignature(message, hex.decode(pubKey), sig);
}

export function hash_cv(clarityValue: ClarityValue) {
	return sha256(serializeCV(clarityValue));
}

export function structuredDataHash(message: Message) {
	return hex.encode(sha256(concat(prefix, hash_cv(domainCV), hash_cv(messageCV(message)))));
}

export function verifyStructuredDataSignature(
	message: Message,
	public_key: Uint8Array,
	signature: Uint8Array
) {
	const sig = hex.encode(signature);
	return verifyMessageSignature({
		message: structuredDataHash(message),
		signature: sig,
		publicKey: hex.encode(public_key)
	});
}
