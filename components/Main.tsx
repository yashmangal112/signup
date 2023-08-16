import React from 'react';
import { Raleway } from 'next/font/google'
import { Web3Button, useWeb3Modal } from '@web3modal/react';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Minter from '@/app/minter';

const Main: React.FC = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { open, close } = useWeb3Modal()
  if (isConnected)
    return (
      <div>
        Connected to {address}
        <Minter/>
      </div>
    )
    
    return (
    <>
      <div className="flex justify-center items-center h-screen bg-white overflow-hidden">
      {/* Box for the Image (Left side) */}
          <div className="w-full lg:w-1/2 hidden lg:block">
              <svg xmlns="http://www.w3.org/2000/svg" width="588.026" height="564" viewBox="0 0 820 864" fill="none" className='absolute'>
                <g fill="#DDA4F8" className='absolute top-[158px] left-[81px] w-[588.026] h-[564]' filter='blur(75px)'>
                  <path d="M609.83 390.5C609.83 523.324 339.305 714 194.33 714C49.3554 714 84.8301 523.324 84.8301 390.5C275.33 302 202.355 150 347.33 150C492.305 150 797.33 287.5 609.83 390.5Z" fill="#DDA4F8" />
                </g>
              </svg>

              <svg className='absolute'
                xmlns="http://www.w3.org/2000/svg"
                width="594.5" height="388.5"
                viewBox="0 0 704 689"
                fill="none"
              >
                <g className="absolute top-[366px] left-[41px] w-[594.5] h-[388.5]" fill="rgba(165, 111, 255, 0.40)" filter='blur(75px)'>
                  <path
                    d="M553.5 325.5C553.5 462.467 361.042 538.5 218 538.5C182.5 342.5 -41 427.467 -41 290.5C-41 153.533 202.458 150 345.5 150C488.542 150 553.5 188.533 553.5 325.5Z"
                    fill="#A56FFF"
                    fill-opacity="0.4"
                  />
                </g>
              </svg>
              <img src="images/Saly-1 1.png" alt="Your Image" className="h-screen w-auto relative" />
          </div>

      {/* Box for Buttons and Heading (Right side) */}
          <div className="w-full lg:w-1/2 p-4 flex text-center flex-col justify-center items-center lg:mr-8">
              <div className='text-gray-700 text-center font-raleway text-base font-normal leading-7 mb-4'>Future Of Creation </div>
              <div className='text-black font-raleway md:text-3xl text-2xl font-semibold mb-9'>Welcome to Creator Console!</div>
              <button className="bg-purple-400 font-syne font-semibold text-lg capitalize flex justify-center items-center gap-4 md:w-[411.104px] w-[334px] py-[18.271px] px-[36.543px] rounded-[45.678px] text-white " onClick={() => open()}>
                Connect With Wallet
              </button>
              <div className='md:mt-7 md:mb-7 mt-5 mb-7 font-syne text-21.926 text-xl font-medium leading-normal text-purple-700 '>Or</div>
              <button className="bg-purple-400 flex justify-center items-center gap-2 md:w-[411.104px] w-[334px] py-[18.271px] px-[36.543px] rounded-[45.678px] text-white ">
                <img src="https://static.vecteezy.com/system/resources/previews/022/484/503/original/google-lens-icon-logo-symbol-free-png.png" alt="google" className='w-6 h-6'/>
                <div className='font-syne font-semibold text-lg capitalize'>
                  Continue With Google 
                </div>
              </button>
          </div>
      </div>
    </>
  );
};

export default Main;
