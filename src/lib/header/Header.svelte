<script lang="ts">
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem
	} from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import AccountDropdown from './AccountDropdown.svelte';
	import Brand from './Brand.svelte';
	import type { HeaderLink } from '$types/local_types';
	import SettingsDropdown from './SettingsDropdown.svelte';
	import { isWalletConnected } from '$lib/connect';
	import ConnectWallet from '../proofs/voting/ConnectWallet.svelte';

	export let headerLinks: Array<HeaderLink> = [];
	export let account: {
		stxAddress: string;
		cardinal: string;
		ordinal: string;
		bnsNameInfo: { names: Array<string> };
	};
	export let balances: {
		sbtcBalance?: string;
		cardinalBalance?: string;
		ordinalBalance?: string;
		stacksBalance?: string;
	};

	const dispatch = createEventDispatcher();
	let component;

	let dropdownOpen = false;

	const handleClick = (e: any) => {
		e.preventDefault();
		dropdownOpen = !dropdownOpen;
		//alert ('Clicked on: ' + e.target)
	};

	const setDisconnected = async () => {};

	const setConnected = async () => {};

	const doLogin = async () => {
		dispatch('do_login');
	};

	const doCopy = async (e: any) => {
		dispatch('do_copy', e);
	};

	const doLogout = async () => {
		dispatch('do_logout');
	};

	const switchNetwork = async (network: string) => {
		dispatch('switch_network', { newNetwork: network });
	};

	$: getNavActiveClass = (item: string) => {
		if ($page.route.id && $page.route.id === item)
			return ' text-base text-primary-500 !px-4 !py-2 rounded-lg hover:bg-white/[8%] focus:bg-white/[16%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50';
		return ' text-base !px-4 !py-2 rounded-lg hover:bg-white/[8%] focus:bg-white/[16%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50';
	};
</script>

<Navbar
	class="mx-auto flex max-w-7xl items-center !px-6 lg:px-8 !bg-transparent"
	let:hidden
	let:toggle
	fluid={true}
>
	<NavBrand href="/">
		<Brand />
	</NavBrand>

	<div class="hidden md:flex md:gap-2 md:order-3">
		{#if isWalletConnected()}
			<AccountDropdown {account} {balances} on:do_logout={doLogout} on:do_copy={doCopy} />
		{:else}
			<ConnectWallet on:connection={setConnected} on:disconnection={setDisconnected} />

			<!-- <button
				class="inline-flex items-center gap-x-1.5 bg-primary-01 px-4 py-2 font-normal text-black rounded-lg border border-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50 shrink-0"
				on:keydown
				on:click={doLogin}
			>
				Connect wallet
				<svg
					width="20"
					height="21"
					viewBox="0 0 20 21"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<mask
						id="mask0_3780_6397"
						style="mask-type:alpha"
						maskUnits="userSpaceOnUse"
						x="0"
						y="0"
						width="20"
						height="21"
					>
						<rect y="0.5" width="20" height="20" fill="#D9D9D9" />
					</mask>
					<g mask="url(#mask0_3780_6397)">
						<path
							d="M17.5 10.5C17.5 10.0027 17.3025 9.52581 16.9508 9.17417C16.5992 8.82254 16.1223 8.625 15.625 8.625H12.5C12.5 9.28804 12.2366 9.92393 11.7678 10.3928C11.2989 10.8616 10.663 11.125 10 11.125C9.33696 11.125 8.70107 10.8616 8.23223 10.3928C7.76339 9.92393 7.5 9.28804 7.5 8.625H4.375C3.87772 8.625 3.40081 8.82254 3.04917 9.17417C2.69754 9.52581 2.5 10.0027 2.5 10.5M17.5 10.5V15.5C17.5 15.9973 17.3025 16.4742 16.9508 16.8258C16.5992 17.1775 16.1223 17.375 15.625 17.375H4.375C3.87772 17.375 3.40081 17.1775 3.04917 16.8258C2.69754 16.4742 2.5 15.9973 2.5 15.5V10.5M17.5 10.5V8M2.5 10.5V8M17.5 8C17.5 7.50272 17.3025 7.02581 16.9508 6.67417C16.5992 6.32254 16.1223 6.125 15.625 6.125H4.375C3.87772 6.125 3.40081 6.32254 3.04917 6.67417C2.69754 7.02581 2.5 7.50272 2.5 8M17.5 8V5.5C17.5 5.00272 17.3025 4.52581 16.9508 4.17417C16.5992 3.82254 16.1223 3.625 15.625 3.625H4.375C3.87772 3.625 3.40081 3.82254 3.04917 4.17417C2.69754 4.52581 2.5 5.00272 2.5 5.5V8"
							stroke="black"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</g>
				</svg>
			</button> -->
		{/if}
	</div>

	<NavHamburger class="text-white hover:bg-gray-1000" on:click={toggle} />

	<NavUl
		{hidden}
		class="order-1 md:flex-1"
		ulClass="dark:bg-black dark:md:bg-transparent md:border-0 border border-black flex flex-col p-2 md:p-4 mt-4 md:flex-row md:mt-0 md:text-sm md:font-medium !md:space-x-4"
	>
		{#each headerLinks as link}
			<NavLi nonActiveClass={getNavActiveClass(link.href)}
				><a href={link.href} target={link.target || '_self'}>{link.display}</a></NavLi
			>
		{/each}

		<NavLi nonActiveClass="md:hidden"><SettingsDropdown /></NavLi>
		<NavLi nonActiveClass="md:hidden ml-0 md:ml-2">
			{#if isWalletConnected()}
				<AccountDropdown {account} {balances} on:do_logout={doLogout} on:do_copy={doCopy} />
			{:else}
				<ConnectWallet on:connection={setConnected} on:disconnection={setDisconnected} />
				<!-- <button
					id="connect-wallet"
					class="block w-full items-center gap-x-1.5 bg-primary-01 px-4 py-2 font-normal text-black rounded-lg border border-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50"
					on:keydown
					on:click={doLogin}
				>
					Connect wallet
				</button> -->
			{/if}
		</NavLi>
	</NavUl>
</Navbar>
