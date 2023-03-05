import CreatorCard from "../Components/CreatorCard.jsx";
import Banner from "../Components/Banner.jsx";
import { useRef } from "react";
import  img  from "../assets";
import Image from "next/image";
import { makeId } from "../utils/makeID.js";
export default function Home() {
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
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
              {[0,1, 2, 3, 4, 5,7,8,9,10].map((v, i) => (
                <CreatorCard
                  data={v}
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={img[`creator${i}`]}
                  creatorName={makeId}
                  creatorEths = {10 - i * 0.5}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
