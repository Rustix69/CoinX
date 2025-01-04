import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");

export const getBalance = async (address) => {
    try {
        const balance = await provider.getBalance(address); // Fetch balance of the address
        return ethers.utils.formatEther(balance); // Convert balance from Wei to Ether
    } catch (error) {
        console.error("Error fetching balance:", error);
        return null;
    }
};
