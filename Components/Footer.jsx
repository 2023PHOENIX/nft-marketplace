import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import Button from "./Button";

import twitter from "../assets/twitter.png";
import instagram from "../assets/instagram.png";
import logo from "../assets/logo.png";

const Footer = () => {
  const { theme } = useTheme();

  const FooterLink = ({ heading, items }) => {
    return (
      <div className="flex-1 justify-start items-start">
        <h3 className="font-poppins dark:text-white text-nft-black-1  font-semibold mb-10">
          {heading}
        </h3>

        {items.map((item, ix) => (
          <p key={ix} className="font-poppins dark:text-white text-nft-black-1 font-normal cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3">
            {item}
          </p>
        ))}
      </div>
    );
  };
  return (
    <footer
      className="flexCenter flex-col border-t dark:border-nft-black-1
    border-nft-gray-1 sm:py-8 py-16"
    >
      <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16 pt-10">
        <div className="flexStart flex-1 flex-col p-4">
          <div className="flexCenter cursor-pointer">
            <Image
              src={logo}
              height={32}
              width={32}
              objectFit="contain"
              alt="logo"
            />
            <p className="font-semibold text-lg dark:text-white text-nft-black-1 ml-1">
              NFT
            </p>
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base mt-6">
            Get the latest updates
          </p>
          <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white dark:border-nft-black-2 border-nft-gray-2 rounded-md">
            <input
              type="email"
              placeholder="enter your email"
              className="h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md dark:text-white text-nft-black-1 font-normal text-xs 
              minlg:text-lg outline-none
            "
            />
            <Button btnName="Email me" classStyles="rounded-md" />
          </div>
        </div>

        <div
          className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0
      md:mt-8"
        >
          <FooterLink
            heading="NFT trading center"
            items={["Explore", "How it works", "Contact Us"]}
          />

          <FooterLink
            heading="Support"
            items={[
              "Help center",
              "Terms of service",
              "Legal",
              "privacy policy",
            ]}
          />
        </div>
      </div>

      <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
          <p
            className="font-poppins dark:text-white text-nft-black-1 
          font-semibold text-base"
          >
            NFT tradepark All rights are reserve
          </p>

          <div className="flex flex-row sm:mt-4">
            <div className="mx-2 cursor-pointer">
              <Image
                src={instagram}
                objectFit="contain"
                alt="insta"
                width={24}
                height={24}
                className={theme === "light" && "filter invert"}
              />
            </div>
            <div className="mx-2 cursor-pointer">
              <Image
                src={twitter}
                objectFit="contain"
                alt="twitter"
                width={24}
                height={24}
                className={theme === "light" && "filter invert"}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
