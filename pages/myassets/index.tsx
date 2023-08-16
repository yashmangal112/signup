import React, { useEffect, useState } from 'react';
import fetch, { RequestInit } from 'node-fetch';

interface ERC1155Metadata {
  tokenId: string;
}

interface ERC1155Event {
  erc1155Metadata: ERC1155Metadata[] | null;
  tokenId: string;
  rawContract: {
    address: string;
  };
}

const address = "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1";
const apiKey = '8J8m-U5NKDwJk_q8Rl_f5LCOfrIBci1T';
const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
const fetchURL = `${baseURL}`;

const NFTTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<ERC1155Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.stringify({
          "jsonrpc": "2.0",
          "id": 0,
          "method": "alchemy_getAssetTransfers",
          "params": [
            {
              "fromBlock": "0x0",
              "fromAddress": "0x0000000000000000000000000000000000000000",
              "toAddress": address,
              "excludeZeroValue": true,
              "category": ["erc721", "erc1155"]
            }
          ]
        });

        const requestOptions: RequestInit = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: data,
          redirect: 'follow' as const
        };

        const response = await fetch(fetchURL, requestOptions);
        const jsonResponse = await response.json();
        setTransactions(jsonResponse.result.transfers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {transactions.map((events, index) => (
        <div key={index}>
          {events.erc1155Metadata === null ? (
            <div>
              <h3>{`ERC-721 Token Minted: ID - ${events.tokenId}`}</h3>
              <h3>{`Contract - ${events.rawContract.address}`}</h3>
            </div>
          ) : (
            events.erc1155Metadata.map((erc1155, innerIndex) => (
              <div key={innerIndex}>
                <h3>{`ERC-1155 Token Minted: ID - ${erc1155.tokenId}`}</h3>
                <h3>{`Contract - ${events.rawContract.address}`}</h3>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default NFTTransactions;
