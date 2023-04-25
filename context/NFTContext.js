import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";

// [multiple providers are available are arrange using web3modal ]
import { ethers } from "ethers";
import axios, { Axios } from "axios";
import FormData from "form-data";

import { create as ipfsHttpClient } from "ipfs-http-client";
import { MarketAddress, MarketAddressAbi } from "./contants";

// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(MarketAddress, MarketAddressAbi, signerOrProvider);

export const NFTContext = React.createContext();

export const NFTContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const NFTCurrency = "BTC";

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
    IsWalletConnected();
    createSale("test", "0.025");
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please Install MetaMask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  // used pinata for uploading to ipfs
  let CID = "";
  const uploadToIPFS = async (file, setFileURL) => {
    try {
      const formData = new FormData();
      file = file;
      formData.append("file", file);

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MjM1Y2RhMS05ZDkzLTRlYTUtYjUxYS1iOTllYzczYTYyNTYiLCJlbWFpbCI6ImFiaGlzaGVrc2hyaXZhc3RhdjE5MjBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQ0NWViMDcxNzE2YTlmOTQ5N2Q0Iiwic2NvcGVkS2V5U2VjcmV0IjoiNTMwNTllNjJmZmU3MTdjMzdhMmQ5MGRlNWNmYWFhNmRkN2YxOGRlZDQ0MGZhZGVhZDgwMWE3OGViMDlkZGIyNCIsImlhdCI6MTY4MjQwMjk5Mn0.1_t4DOfmpiSQUXcOtJaWCmEe99DYaf7RKR7KRVvQvgc",
          },
        }
      );
      console.log(res.data.IpfsHash);
      CID = res.data.IpfsHash;
      console.log(
        `final url is : https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
      );
      setFileURL(`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
    } catch (e) {
      console.log("error during the uploading file from nft context", e);
    }
  };

  const createNFT = async (formInput, fileUrl, router) => {
    const { name, description, price } = formInput;

    if (!name || !description || !price || !fileUrl) return;

    try {
      let data = JSON.stringify({
        pinataOptions: {
          cidVersion: 1,
        },
        pinataMetadata: {
          name: name,
          keyvalues: {
            name: name,
            description: description,
            price: price,
            file: fileUrl,
          },
        },
        pinataContent: {},
      });

      let config = {
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MjM1Y2RhMS05ZDkzLTRlYTUtYjUxYS1iOTllYzczYTYyNTYiLCJlbWFpbCI6ImFiaGlzaGVrc2hyaXZhc3RhdjE5MjBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQ0NWViMDcxNzE2YTlmOTQ5N2Q0Iiwic2NvcGVkS2V5U2VjcmV0IjoiNTMwNTllNjJmZmU3MTdjMzdhMmQ5MGRlNWNmYWFhNmRkN2YxOGRlZDQ0MGZhZGVhZDgwMWE3OGViMDlkZGIyNCIsImlhdCI6MTY4MjQwMjk5Mn0.1_t4DOfmpiSQUXcOtJaWCmEe99DYaf7RKR7KRVvQvgc",
        },
        data: data,
      };

      const res = await axios(config);

      const url = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;

      console.log("now go and create sale ", res);

      await createSale(url, price);

      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    const web3Modal = new Web3Modal({});
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, "ether");

    const contract = fetchContract(signer);

    console.log(contract);
    const listingPrice = await contract.getListingPrice();

    const transaction = await contract.createToken(url, price, {
      value: listingPrice.toString(),
    });
    await transaction.wait();
  };
  return (
    <NFTContext.Provider
      value={{
        NFTCurrency,
        connectWallet,
        uploadToIPFS,
        currentAccount,
        createNFT,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};

// const pinata = {
//   "API Key": "445eb071716a9f9497d4",
//   "API Secret":
//     "53059e62ffe717c37a2d90de5cfaaa6dd7f18ded440fadead801a78eb09ddb24",
//   JWT: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MjM1Y2RhMS05ZDkzLTRlYTUtYjUxYS1iOTllYzczYTYyNTYiLCJlbWFpbCI6ImFiaGlzaGVrc2hyaXZhc3RhdjE5MjBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQ0NWViMDcxNzE2YTlmOTQ5N2Q0Iiwic2NvcGVkS2V5U2VjcmV0IjoiNTMwNTllNjJmZmU3MTdjMzdhMmQ5MGRlNWNmYWFhNmRkN2YxOGRlZDQ0MGZhZGVhZDgwMWE3OGViMDlkZGIyNCIsImlhdCI6MTY4MjQwMjk5Mn0.1_t4DOfmpiSQUXcOtJaWCmEe99DYaf7RKR7KRVvQvgc",
// };
