export type SessionStore = {
    name: string;
    loggedIn: boolean;
    proofs:Proofs;
}

export type Proofs = {
    ownershipData: Array<OwnershipProofData>;
    citizenshipData: CitizenshipProofData|undefined;
    personhoodData: PersonhoodProofData|undefined;
    active: boolean;
    available: boolean;
}

export type OwnershipProofData = {
    type: PROOF_TYPE;
    address: string;
    signature: string;
    chain: string;
    wallet: string
}

export type CitizenshipProofData = {
    passportImage: string;
}

export type PersonhoodProofData = {
    likenessImage: string;
}

export enum PROOF_TYPE {
    OWNERHSIP = "ownership",
    PERSONHOOD = "personhood",
    CITIZENSHIP = "citizenship"
}

export enum CHAIN {
    ETHEREUM = "ethereum",
    STACKS = "stacks",
    SOLANA = "solana"
}

export enum WALLET {
    METAMASK = "metamask",
    LEATHER = "leather",
    PHANTOM = "phantom"
}