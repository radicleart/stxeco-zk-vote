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
import type { VotingEventProposeProposal, VotingEventVoteOnProposal } from '@mijoco/stx_helpers';
import { openStructuredDataSignatureRequestPopup } from '@stacks/connect';
import { StacksMainnet } from '@stacks/network';
import { appDetails } from './config';
import type { MessageInputs, SignatureData } from '$types/local_types';

// type Message = {
// 	script: Uint8Array;
// 	signature: string;
// };
const concat = P.concatBytes;

const prefix = Uint8Array.from([0x53, 0x49, 0x50, 0x30, 0x31, 0x38]); // SIP018

const network = new StacksMainnet();

export async function structuredDataSignature(messageObj: MessageInputs, callback: any) {
	try {
		const response = await openStructuredDataSignatureRequestPopup({
			message: messageCV(messageObj),
			domain: domainCV,
			network,
			appDetails,
			onFinish: (data: any) => {
				callback(data);
			}
		});
	} catch (error) {
		console.error('Error during signature request:', error);
	}
}

export const enum ChainID {
	Testnet = 2147483648,
	Mainnet = 1
}

// export type SignatureData = {
// 	signature: Uint8Array;
// 	public_key: Uint8Array;
// };

export const domain = {
	name: getConfig().VITE_PUBLIC_APP_NAME,
	version: getConfig().VITE_PUBLIC_APP_VERSION,
	chain_id: getConfig().VITE_NETWORK === 'mainnet' ? ChainID.Mainnet : ChainID.Testnet
};

export const domainCV = tupleCV({
	name: stringAsciiCV(getConfig().VITE_PUBLIC_APP_NAME),
	version: stringAsciiCV(getConfig().VITE_PUBLIC_APP_VERSION),
	'chain-id': uintCV(getConfig().VITE_NETWORK === 'mainnet' ? ChainID.Mainnet : ChainID.Testnet)
});

export function messageCV(msg: MessageInputs) {
	return tupleCV({
		message: stringAsciiCV(msg.message),
		proposal: stringAsciiCV(msg.proposal),
		vote: stringAsciiCV(msg.vote),
		'voting-power': stringAsciiCV(fmtMicroToStx(msg.balance_at_height)),
		'voting-window-begins': uintCV(msg.burn_start_height),
		'voting-window-ends': uintCV(msg.burn_end_height)
	});
}

export function verifySignedMessage(signature_data: SignatureData) {
	if (!signature_data) return false;
	const sig =
		typeof signature_data.signature === 'string'
			? hex.decode(signature_data.signature)
			: signature_data.signature;
	return verifyStructuredDataSignature(
		signature_data.message_inputs,
		hex.decode(signature_data.public_key),
		sig
	);
}

export function hash_cv(clarityValue: ClarityValue) {
	return sha256(serializeCV(clarityValue));
}

export function structuredDataHash(message: MessageInputs) {
	return hex.encode(sha256(concat(prefix, hash_cv(domainCV), hash_cv(messageCV(message)))));
}

export function verifyStructuredDataSignature(
	message: MessageInputs,
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
