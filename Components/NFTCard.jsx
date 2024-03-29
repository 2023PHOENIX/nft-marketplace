import { NFTContext } from "../context/NFTContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import img from "../assets";

const NFTCard = ({ nft }) => {
  


  const {NFTCurrency} = useContext(NFTContext);
  
  console.log("from nft card line 13",NFTCurrency);

  return (<Link href={{ pathname: "/nft-details", query:nft}}>
      <div className= "flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full 
      sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white 
      rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2  cursor-pointer shadow-empty"
      >
        <div
          className="relative w-full h-52 sm:h-36 xs:h-56 
        mind:h-60 minlg:h-300 rounded-2xl overflow-hidden
        "
        >
          <Image
            src={nft.img || img[`nft${nft.i}`]}
            alt="img"
            layout="fill"
            objectFit="cover"
            height={28}
            width={28}
          />

        </div>

        <div className="mt-3 flex flex-col ">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {nft.name} 
          </p>
          <div className="flexBetween mt-3 minlg:mt-3 flex-row xs:flex-col  xs:items-start xs:mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg ">
              {nft.price || 0.0}
              <span className="normal">{NFTCurrency} </span>
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              {nft.seller}
            </p>
          </div>
        </div>
      </div>
    </Link>);
};

export default NFTCard;
