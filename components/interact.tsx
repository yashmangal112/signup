import { ethers } from 'ethers';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { pinJSONToIPFS } from './pinata';

const alchemyKey = "https://eth-mainnet.g.alchemy.com/v2/8J8m-U5NKDwJk_q8Rl_f5LCOfrIBci1T";
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require('../components/contract-abi.json');
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE";

export const mintNFT = async (url: string, name: string, description: string) => {

    // error handling
    if (url.trim() === "" || (name.trim() === "" || description.trim() === "")) {
        return {
            success: false,
            status: "❗Please make sure all fields are completed before minting.",
        };
    }

    // make metadata
    const metadata: Record<string, string> = {};
    metadata.name = name;
    metadata.image = url;
    metadata.description = description;

    // pinata pin request
    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "😢 Something went wrong while uploading your tokenURI.",
        };
    }
    const tokenURI = pinataResponse.pinataUrl;

    // load smart contract
    (window as any).contract = await new web3.eth.Contract(contractABI, contractAddress);

    // set up your Ethereum transaction
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: (window as any).ethereum.selectedAddress, // must match user's active address.
        'data': (window as any).contract.methods.mintNFT((window as any).ethereum.selectedAddress, tokenURI).encodeABI() // make call to NFT smart contract
    };

    // sign transaction via Metamask
    try {
        const txHash = await (window as any).ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        return {
            success: true,
            status: "✅ Check out your transaction on Etherscan: https://sepolia.etherscan.io/tx/" + txHash
        };
    } catch (error:any) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        };
    }
};
