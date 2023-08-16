import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from "react";
import {mintNFT} from '../components/interact';
import { Web3Button, Web3Modal } from '@web3modal/react'

  
const Minter: React.FC = () => {
    // useEffect(async () => { }, []);
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  
  const onMintPressed = async () => { 
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
  };
  return (

    <div className="Minter max-w-80vh max-h-80vh p-16 mx-auto text-left">
      <button id="walletButton" className='text-right float-right mb-8 text-sm'>
        <Web3Button/>
      </button>

      <br></br>
      <h1 id="title" className='pt-8'>🧙‍♂️ Alchemy NFT Minter</h1>
      <p>
        Simply add your assest link here
      </p>
      <form className='mt-8'>
        <h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
          className="border-b-2 border-gray-300 focus:border-blue-400 text-lg w-full py-2"
        />
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
          className="border-b-2 border-gray-300 focus:border-blue-400 text-lg w-full py-2"
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
          className="border-b-2 border-gray-300 focus:border-blue-400 text-lg w-full py-2"
        />
      </form>
      <button id="mintButton" onClick={onMintPressed} className='className="mt-8 bg-blue-500 text-white py-3 px-6 rounded-full text-lg font-semibold cursor-pointer"'>
        Mint NFT
      </button>
      <p id="status" className="text-red-500 mt-4">
        {status}
      </p>
    </div>
  );
};

export default Minter;
