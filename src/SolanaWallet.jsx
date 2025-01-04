import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { Button } from "./components/ui/button";
import { CopyIcon } from "lucide-react";
import { getBalance } from "./api/sol";
// Import the API function

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState([]); // Store all wallets
    const [selectedWalletIndex, setSelectedWalletIndex] = useState(0); // Index of the currently displayed wallet
    const [balance, setBalance] = useState(null); // Store the balance of the selected wallet
    const generateWallet = () => {
        const seed = mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secretKey);

        const newWallet = {
            name: `Solana ${currentIndex + 1}`,
            publicKey: keypair.publicKey.toBase58(),
            privateKey: Buffer.from(keypair.secretKey).toString("hex"),
        };

        setWallets([...wallets, newWallet]); // Add to the wallets array
        setCurrentIndex(currentIndex + 1); // Increment index for the next wallet
        setSelectedWalletIndex(wallets.length); // Display the newly generated wallet
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const trimKey = (key) => `${key.slice(0, 12)}...${key.slice(-2)}`;

    const fetchBalance = async () => {
        const selectedWallet = wallets[selectedWalletIndex];
        const walletBalance = await getBalance(selectedWallet.publicKey);
        if (walletBalance !== null) {
            setBalance(walletBalance / 1000000000); // Convert from lamports to SOL
        } else {
            alert("Error fetching balance");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <Button onClick={generateWallet} style={{ marginBottom: "32px" }}>
                <h1 className="text-base font-bold">Add SOL Wallet</h1>
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
                        <h3 className="text-base pb-3">{wallets[selectedWalletIndex].name}</h3>

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
                                <div>
                                    <strong>Balance: </strong>{balance} SOL
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
