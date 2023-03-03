import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// some assets are required from the app
import logo from "../assets/logo.png";
import menu from "../assets/menu.png";
import cross from "../assets/cross.png";
import Button from "./Button";

const MenuItems = ({ isMobile, active, setActive }) => {
  const GenerateLinks = (i) => {
    if (i === 1) {
      return "/created-nfts";
    } else if (i === 2) {
      return "/my-nfts";
    } else {
      return "/";
    }
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && "flex-col h-full"
      }`}
    >
      {["Explore NFTs", "Listed NFTs", "My NFTs"].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item);
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
          ${
            active === item
              ? "dark:text-white text-nft-black-1"
              : "dark:text-nft-gray-3 text-nft-gray-2"
          } 
          ${isMobile && "my-5 text-xl"}`}
        >
          <Link href={GenerateLinks(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};
const ButtonGroup = ({ setActive, router }) => {
  const hasConnected = true; // connection with metamask

  return hasConnected ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive("");
        router.push("/create-nft");
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        console.log("send to connecting wallet");
      }}
    />
  );
};
const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState("Explore NFTs");
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter();

  console.log({ theme });
  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark">
      {/* logo with text */}
      <div className="flex flex-1 flex-row justify-start">
        {/* FOR NORMAL DEVICE */}
        <Link href="/">
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => {
              console.log("From navbar icon\n not linked with some link.");
            }}
          >
            <Image
              src={logo}
              height={32}
              width={32}
              objectFit="contain"
              alt="logo"
            />
            <p className="font-semibold text-lg dark:text-white text-nft-black-1 ml-1">
              {" "}
              NFT
            </p>
          </div>
        </Link>
        {/* FOR MEDIUM SIZED DEVICE */}
        <Link href="/">
          {/* logo with text */}

          <div
            className="hidden md:flex"
            onClick={() => {
              console.log("From navbar icon\n not linked with some link.");
            }}
          >
            <Image
              src={logo}
              height={32}
              width={32}
              objectFit="contain"
              alt="logo"
            />
          </div>
        </Link>
      </div>

      {/* For  Theme menu*/}
      <div className="flex flex-row justify-end flex-initial">
        <div className="flex items-center mr-2">
          {/* FOR THEME COMPONENT */}
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
          >
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />

            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>
        {/* FOR MENU ITEMS only for large devices */}
        <div className="md:hidden flex">
          <MenuItems active={active} setActive={setActive} isMobile={false} />

          <div className="ml-4">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
      </div>

      {/* FOR SMALL DEVICES MOBILE NAVIGATION */}
      <div className="hidden md:flex ml-2">
        {!isOpen ? (
          <Image
            src={menu}
            objectFit="contain"
            width={25}
            height={25}
            alt="menu"
            onClick={() => setIsOpen(!isOpen)}
            className={theme === "light" ? "filter invert" : undefined}
          />
        ) : (
          <Image
            src={cross}
            objectFit="contain"
            width={20}
            height={20}
            alt="close"
            onClick={() => setIsOpen(!isOpen)}
            className={theme === "light" ? "filter invert" : undefined}
          />
        )}

        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems
                active={active}
                setActive={setActive}
                isMobile
                setIsOpen={setIsOpen}
              />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup setActive={setActive} router={router} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
