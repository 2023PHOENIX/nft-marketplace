import React,{useState,useEffect} from 'react';
import Web3Modal from 'web3modal';

// [multiple providers are available are arrange using web3modal ]
import { ethers } from 'ethers';
import axios from 'axios';




import { MarketAddress,MarketAddressAbi } from './contants';


export const NFTContext = React.createContext();

export const NFTContextProvider = ({children}) => {
  
  const [currentAccount, setCurrentAccount] = useState("");
  
  const NFTCurrency = 'ETH';
  

  const IsWalletConnected = async () => {
    if (!window.ethereum) return alert("please install metamask first");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
     
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("no account found");
    }




    
  };

  useEffect(() => {
    IsWalletConnected()
  },[])
  
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please Install MetaMask");

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setCurrentAccount(accounts[0]);
    window.location.reload();
  }
  return <NFTContext.Provider value={{ NFTCurrency,connectWallet,currentAccount }}>
    {children}
  </NFTContext.Provider>
}

