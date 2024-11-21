import type { VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
import type { ChainID } from '@stacks/transactions';

export type SessionStore = {
	wsConnected: boolean;
	preferredChain?: string;
	currentProposal?: VotingEventProposeProposal;
	currentVote?: string;
	signature_data?: SignatureData;
	name: string;
	loggedIn: boolean;
	proofs: Proofs;
	testData?: {
		bitcoinTxid?: string;
	};
};
export type MessageInputs = {
	message: string;
	vote: string;
	proposal: string;
	balance_at_height: number;
	block_proof_height: number;
	voting_end_height: number;
};

export type SignatureData = {
	message_inputs: MessageInputs;
	public_key: string;
	hash: string;
	signature: string;
	message: string;
	domain: {
		name: string;
		version: string;
		chain_id: number;
	};
};

export type Proofs = {
	ownershipData: Array<OwnershipProofData>;
	citizenshipData: CitizenshipProofData | undefined;
	personhoodData: PersonhoodProofData | undefined;
	active: boolean;
	available: boolean;
};

export type OwnershipProofData = {
	type: PROOF_TYPE;
	address: string;
	signature: string;
	chain: string;
	wallet: string;
};

export type CitizenshipProofData = {
	passportImage: string;
};

export type PersonhoodProofData = {
	likenessImage: string;
};

export enum PROOF_TYPE {
	OWNERHSIP = 'ownership',
	PERSONHOOD = 'personhood',
	CITIZENSHIP = 'citizenship'
}

export enum CHAIN {
	ETHEREUM = 'ethereum',
	STACKS = 'stacks',
	SOLANA = 'solana'
}

export enum WALLET {
	METAMASK = 'metamask',
	LEATHER = 'leather',
	PHANTOM = 'phantom'
}
