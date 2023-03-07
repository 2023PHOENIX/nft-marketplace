/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import { useState, useMemo, useCallback, useContext } from "react";

import { useRouter } from "next/router";

import { useDropzone } from "react-dropzone";

import Image from "next/image";

import { useTheme } from "next-themes";

import Input from "../Components/Input.jsx"

import img from "../assets";

import Button from "../Components/Input";

const createNFT = () => {
  const { theme } = useTheme("dark");

  const [fileUrl, setFileURL] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  /*
     NOTE: useMemo memoise the function
     while useCallback memose the return value 
  
    */

  const createMarket = () => {
    console.log("this is from create-nft [createMarketPlace]");

  }

  const onDrop = useCallback(() => {
    // upload image to the ipfs
  }, []);
  // NOTE: need to look into this part
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  const fileStyle = useMemo(() => {
    `dark:bg-nft-black-1 bg-white dark:border-white border-nft-gray-2
    flex flex-col items-center p-5 rounded-sm border-dashed
    ${isDragActive && "border-file-active"}
    ${isDragAccept && "border-file-Accept"}
    ${isDragReject}`;
  }, [isDragAccept, isDragReject, isDragActive]);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1
          className="font-poppins dark:text-white text-nft-black-1
        text-2xl minlg:text-4xl text-semibold ml-4 xs:ml-0"
        >
          Create New NFT
        </h1>

        <div className="mt-16">
          <p
            className="font-poppins dark:text-white text-nft-black-1
        font-semibold text-xl"
          >
            Upload File
          </p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center dark:bg-nft-black-1 pt-5">
                <p
                  className="font-poppins dark:text-white text-nft-black-1
        font-semibold text-xl "
                >
                  upload any image type media
                </p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={img.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file"
                    className={theme === "light" ? "filter invert" : ""}
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag and Drop File
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  Or browse media on your device
                </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="assets file" />
                </div>
              </aside>
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="Asset Name"
          handleClick={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />

        <Input
          inputType="textarea"
          title="Description"
          placeholder="Asset Description"
          handleClick={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />

        <Input
          inputType="number"
          title="Price"
          placeholder="Asset Price"
          handleClick={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <p> Please make the button here </p>
         </div>
    </div>
  );
};

export default createNFT;
