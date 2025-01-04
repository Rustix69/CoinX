import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet, ethers } from "ethers";
import { Button } from "./components/ui/button";
import { CopyIcon } from "lucide-react";
import { getBalance } from "./api/eth";

export const EthWallet = ({ mnemonic }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState([]); // Store all wallets
    const [selectedWalletIndex, setSelectedWalletIndex] = useState(0); // Index of the currently displayed wallet
    const [balance, setBalance] = useState(null); // Store balance of selected wallet

    const generateWallet = async () => {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`; // Ethereum path
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const ethWallet = new Wallet(privateKey);

        const newWallet = {
            name: `Ethereum ${currentIndex + 1}`,
            publicKey: ethWallet.address,
            privateKey: privateKey,
        };

        setWallets([...wallets, newWallet]); // Add to wallets array
        setCurrentIndex(currentIndex + 1); // Increment index for next wallet
        setSelectedWalletIndex(wallets.length); // Set newly generated wallet as the active one
    };

    const fetchBalance = async () => {
        const selectedWallet = wallets[selectedWalletIndex];
        const balanceInWei = await getBalance(selectedWallet.publicKey);
        if (balanceInWei !== null) {
            // Convert from Wei to Ether (1 Ether = 10^18 Wei)
            const balanceInEther = ethers.utils.formatEther(balanceInWei);
            setBalance(balanceInEther); // Set balance in Ether
        } else {
            alert("Error fetching balance");
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const trimKey = (key) => `${key.slice(0, 12)}...${key.slice(-2)}`;

    return (
        <div className="flex flex-col items-center">
            <Button onClick={generateWallet} style={{ marginBottom: "32px" }}>
                <h1 className="text-base font-bold">Add ETH Wallet</h1>
            </Button>

            {wallets.length > 0 && (
                <div>
                    <label>
                        Select Wallet:
                        <select
                            value={selectedWalletIndex}
                            onChange={(e) => setSelectedWalletIndex(parseInt(e.target.value, 10))}
                            style={{ marginLeft: "10px", padding: "5px" }}
                        >
                            {wallets.map((wallet, index) => (
                                <option key={index} value={index}>
                                    {wallet.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div
                        style={{
                            margin: "20px 0",
                            border: "1px solid black",
                            padding: "10px",
                            borderRadius: "10px",
                        }}
                        className="w-64"
                    >
                        <h3>{wallets[selectedWalletIndex].name}</h3>

                        <div>
                            <strong>Public Key:</strong>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="text"
                                    value={trimKey(wallets[selectedWalletIndex].publicKey)}
                                    readOnly
                                    style={{
                                        width: "80%",
                                        marginRight: "10px",
                                        fontFamily: "monospace",
                                    }}
                                />
                                <button
                                    onClick={() => copyToClipboard(wallets[selectedWalletIndex].publicKey)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <CopyIcon size={20} />
                                </button>
                            </div>
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            <strong>Private Key:</strong>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="text"
                                    value={trimKey(wallets[selectedWalletIndex].privateKey)}
                                    readOnly
                                    style={{
                                        width: "80%",
                                        marginRight: "10px",
                                        fontFamily: "monospace",
                                    }}
                                />
                                <button
                                    onClick={() => copyToClipboard(wallets[selectedWalletIndex].privateKey)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <CopyIcon size={20} />
                                </button>
                            </div>
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <div className="items-center flex justify-center">
                                <Button onClick={fetchBalance}>Check Balance</Button>
                            </div>

                            {balance !== null && (
                                <div style={{ marginTop: "10px" }}>
                                    <strong>Balance:</strong> {balance} ETH
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
