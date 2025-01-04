import React, { useState } from 'react';
import ShimmerButton from './components/ui/shimmer-button';
import { generateMnemonic } from 'bip39';
import ShineBorder from './components/ui/shine-border';
import ScriptCopyBtn from './components/ui/script-copy-btn';
import { SolanaWallet } from './SolanaWallet';
import { EthWallet } from './EtherumWallet';
import { CopyIcon } from 'lucide-react';
import { Button } from './components/ui/button';

const Landing = () => {
    const [mnemonic, setMnemonic] = useState("");

    const generatePhrase = async () => {
        const mn = await generateMnemonic();
        setMnemonic(mn);
    };
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Secret Key Copied to Clipboard!");
    };
    const seedArray = mnemonic.split(" ");

    return (
        <div className='min-h-screen mt-20'>
            {/* Phrase Generation */}
            <div className='flex flex-col items-center gap-6 justify-center'>
                <h1 className='font-extrabold font-["C059"] text-8xl'>Secret Phrase</h1>

                <div className='flex gap-4'>
                    <ShimmerButton
                        onClick={generatePhrase}
                        className="shadow-2xl h-10"
                    >
                        GENERATE
                    </ShimmerButton>
                </div>

                {/* Show ShineBorder only after mnemonic is generated */}
                {mnemonic && (
                    <ShineBorder
                        className="relative h-auto w-[600px] rounded-lg border bg-background md:shadow-xl"
                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                    >
                        <div className="grid grid-cols-4 gap-10 p-10">
                            {seedArray.map((word, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 p-2 w-[120px] rounded-lg font-serif text-base text-center uppercase"
                                >
                                    {word}
                                </div>
                            ))}
                        </div>
                        <br/>

                        <button
                            onClick={() => copyToClipboard(mnemonic)}
                            className="absolute bottom-2 right-2 bg-gray-50 hover:bg-gray-200 text-sm px-2 py-2 rounded-lg shadow-md"
                        >
                            <CopyIcon/>
                        </button>
                    </ShineBorder>

                )}
            </div>


            {/* Create Wallets */}
            {mnemonic && (
                <div className='flex flex-col items-center gap-6 justify-center mt-20'>
                    <h1 className='font-extrabold font-serif text-7xl'>Generate Wallets</h1>
                    <div className='flex flex-row justify-evenly w-full items-center gap-20 p-10'>
                        <SolanaWallet mnemonic={mnemonic} />
                        <EthWallet mnemonic={mnemonic} />
                    </div>
                </div>
            )}
        </div>

    );
};

export default Landing;
