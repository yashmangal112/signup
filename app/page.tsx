"use client";
import Image from 'next/image'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Button, Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, zora, } from 'wagmi/chains'
import Navbar from '@/components/Navbar';
import Main from '@/components/Main';
import { createPublicClient, http } from 'viem'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  // const chains = [mainnet, polygon, optimism, arbitrum, zora,]
  const projectId = 'e74ff7004e1225acdb8c0a85ce0e2c93'
  
  // const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, zora],
    [
      alchemyProvider({ apiKey: '8J8m-U5NKDwJk_q8Rl_f5LCOfrIBci1T' }),
      publicProvider()
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: 'e74ff7004e1225acdb8c0a85ce0e2c93',
    chains
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })
  

  const ethereumClient = new EthereumClient(wagmiConfig, chains)

  const isClient = typeof window !== 'undefined';
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <>
            <Main/>
          </>
        </RainbowKitProvider>
      </WagmiConfig>

      {isClient && (
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      )}
    </>
  )
}
