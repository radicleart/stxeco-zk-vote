import { get } from 'svelte/store';
import { configStore } from '$stores/stores_config';
import type { Config } from '$lib/config';
import { sessionStore } from './stores';
import type { SessionStore } from '@mijoco/stx_helpers/dist/index';

export function getConfig(): Config {
	return get(configStore);
}

export function getSession(): SessionStore {
	return get(sessionStore);
}
