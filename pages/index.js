import CreatorCard from "../Components/CreatorCard.jsx";
import Banner from "../Components/Banner.jsx";
import { useEffect, useRef, useState } from "react";
import img from "../assets";
import Image from "next/image";
import { makeId } from "../utils/makeID.js";
import { useTheme } from "next-themes";
import NFTCard from "../Components/NFTCard.jsx";


export default function Home() {
  const parentRef = useRef(null);
  const scrollRef = useRef(null);

  const theme = useTheme();

  const [dirButton, useDirButton] = useState(true);
 
  const handleClick = (dir) => {
    const { current } = scrollRef;

    if (dir === "left") {
      current.scrollLeft -= 100;
    } else {
      current.scrollLeft += 100;
    }
  };

  const isScrollAble = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth > parent?.offsetWidth) {
      dirButton(true);
    } else {
      dirButton(false);
    }
    useEffect(() => {
      isScrollAble();
      window.addEventListener("resize", isScrollAble);

      return () => {
        window.addEventListener("resize", isScrollAble);
      };
    });
  };
  return (
    <div className="flex justify-center sm:px-4 p-12 xl:mx-24">
      <div className="w-full minwd:w-4/5">
        <Banner
          textContent="Buy and Sell NFTs from all over the world"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl  text-left"
        />

        <div className="">
          <h1
            className="font-poppins dark:text-white text-nft-black-1
        text-2xl minlg:text-4xl text-semibold ml-4 xs:ml-0"
          >
            {" "}
            Best Creators{" "}
          </h1>
          {/* reference to data */}
          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}
            >
              {[0, 1, 2, 3, 4, 5, 7, 8, 9, 10].map((v, i) => (
                <CreatorCard
                  data={v}
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={img[`creator${i}`]}
                  creatorName={makeId}
                  creatorEths={10 - i * 0.5}
                />
              ))}
              {dirButton && (
                <>
                  <div
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12
                top-45 cursor-pointer 
                "
                    onClick={() => {
                      handleClick("left");
                    }}
                  >
                    <Image
                      src={img.left}
                      layout="fill"
                      objectFit="contain"
                      alt="left arrow"
                      className={theme === "light" && "filter invert"}
                    />
                  </div>
                  <div
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12
                top-45 cursor-pointer  right-0
                "
                    onClick={() => {
                      handleClick("right");
                    }}
                  >
                    <Image
                      src={img.right}
                      layout="fill"
                      objectFit="contain"
                      alt="right arrow"
                      className={theme === "light" && "filter invert"}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1
              className="font-poppins dark:text-white text-nft-black-1
        text-2xl minlg:text-4xl text-semibold sm:mb-4
            "
            >
              Best NFTS
            </h1>
            <div>SearchBar</div>
          </div>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {[1, 2, 3, 4, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `NIFTY NFT ${i}`,
                  price : (10 - i * 0.534).toFixed(2),
                  seller: `0x${makeId(3)}...${makeId(4)}`,
                  owner: `0x${makeId(3)}...${makeId(4)}`,
                  description : `Cool NFT on Sale`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
