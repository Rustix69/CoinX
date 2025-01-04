# CoinX - Crypto Wallet

CoinX is a simple yet powerful crypto wallet application that allows you to generate Ethereum and Solana wallets from a mnemonic seed phrase (BIP39 standard). It provides an intuitive interface to manage multiple wallets and check their balances in real-time using RPC calls to Ethereum and Solana mainnets.
## What can you find in this ?

- **BIP39 Seed Phrase Generation**: CoinX supports the generation of wallet seed phrases using the BIP39 standard, which is widely used in the crypto community.
- **Wallet Generation**: From a generated seed phrase, CoinX can derive both Ethereum and Solana wallets.
- **Multi-Wallet Support**: CoinX allows you to generate multiple wallets and switch between them seamlessly.
- **Balance Fetching**: You can view the real-time balance of your wallets using RPC calls:
  - **Ethereum**: Fetch balance using the Ethereum mainnet and display it in Ether (ETH).
  - **Solana**: Fetch balance using the Solana mainnet and display it in Sol (SOL).
- **Clipboard Copy**: Easily copy wallet addresses and private keys to your clipboard for quick access.

## Tech Stack

- **React**: Frontend framework used to build the user interface.
- **ethers.js**: Library used to interact with the Ethereum blockchain.
- **@solana/web3.js**: Library to interact with the Solana blockchain.
- **BIP39**: Used for mnemonic (seed phrase) generation.
- **Tailwind CSS**: Used for styling the user interface.


## Features:

### 1. **Generate a Wallet**
- Upon loading the app, you can generate a new wallet by clicking the **"Add ETH Wallet"** or **"Add SOL Wallet"** button. This will generate a new wallet using a BIP39 seed phrase.

### 2. **Select a Wallet**
- Once you generate wallets, you can select them from a dropdown menu to view their details.

### 3. **View Wallet Details**
- For the selected wallet, you can view the following details:
  - **Public Key (Address)**
  - **Private Key**
  - **Balance**

### 4. **Fetch Balance**
- Click the **"Fetch Balance"** button to retrieve the current balance of the selected wallet.
  - **For Ethereum (ETH)**: The balance is displayed in Ether (ETH).
  - **For Solana (SOL)**: The balance is displayed in Sol (SOL).

### 5. **Copy Wallet Details**
- You can copy the public key or private key to your clipboard by clicking the respective **copy button** next to them.

---

## Example Use Case:

### 1. **Generate an Ethereum Wallet**
- Click on **"Add ETH Wallet"** and a new wallet is generated with a **public key** and **private key**.
- You can check the wallet's balance by clicking on **"Fetch Balance"**.
- View your balance in **Ether (ETH)**.

### 2. **Generate a Solana Wallet**
- Click on **"Add SOL Wallet"** to generate a **Solana wallet**.
- Fetch its balance using the **Solana RPC call** and view it in **SOL**.

