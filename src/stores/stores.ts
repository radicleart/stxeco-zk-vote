import { persisted } from 'svelte-local-storage-store';
import type { SessionStore } from '$types/local_types';

/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/
export const sessionStore = persisted('sessionStore', {
	wsConnected: false,
	name: 'webapp',
	loggedIn: false,
	proofs: {
		ownershipData: [],
		citizenshipData: undefined,
		personhoodData: undefined,
		active: false,
		available: false
	},
	testData: {
		bitcoinTxid: ''
	}
} as unknown as SessionStore);
