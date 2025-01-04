import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

export const getBalance = async (publicKey) => {
    try {
        const publicKeyObj = new PublicKey(publicKey);
        const balance = await connection.getBalance(publicKeyObj);
        return balance;
    } catch (error) {
        console.error("Error fetching balance:", error);
        return null;
    }
};
