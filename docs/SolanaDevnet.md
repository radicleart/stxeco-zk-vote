To set up a local Solana devnet, create test accounts, and connect Phantom to it, follow these steps:

1. Install Solana CLI
   Ensure you have the Solana CLI installed. If not, install it with the following command:

bash
Copy code
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
Verify the installation:

bash
Copy code
solana --version 2. Start the Local Solana Cluster
Run a local Solana cluster on your machine:

bash
Copy code
solana-test-validator
This command starts the local Solana devnet, initializing the blockchain and making it ready for development.

3. Configure the CLI to Use the Local Cluster
   Point the Solana CLI to your local cluster:

bash
Copy code
solana config set --url http://127.0.0.1:8899 4. Create Test Accounts
Generate test wallets to use with your local devnet:

bash
Copy code
solana-keygen new --outfile ~/my-test-wallet.json
Repeat the command to create multiple test wallets if needed. To airdrop tokens to these accounts:

bash
Copy code
solana airdrop 100 ~/my-test-wallet.json
This command airdrops 100 SOL to the specified wallet on your local devnet.

5. Connect Phantom Wallet to Local Devnet
   To use Phantom with your local devnet, follow these steps:

Open Phantom Wallet and navigate to Settings > Network.
Select Custom RPC.
Enter the RPC URL for your local Solana cluster:
arduino
Copy code
http://127.0.0.1:8899
Save and switch to this custom network. 6. Add the Test Account to Phantom
To import the test account into Phantom:

Export the private key from the generated test wallet:

bash
Copy code
solana-keygen recover 'prompt://'
This will display the private key that can be imported into Phantom.

In Phantom Wallet, go to Settings > Add / Connect Wallet > Import Private Key and paste the private key.

7. Verify Connection and Balance
   Run the following command to check the balance of an account:

bash
Copy code
solana balance ~/my-test-wallet.json
This confirms that your local Solana devnet is running, test accounts have been set up, and Phantom is connected to the local network.
