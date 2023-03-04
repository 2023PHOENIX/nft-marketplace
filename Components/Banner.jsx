import React from "react";

const Banner = ({ parentStyles, childStyles, textContent }) => {
  return (
    <div
      className={`relative w-full flex items-center z-0 overflow-hidden nft-gradient ${parentStyles}`}
    >
      <p
        className={`font-bold text-5xl font-poppins leading-70 ${childStyles}`}
      >
        {" "}
        {textContent}
      </p>

      <div
        className="absolute w-48 h-48 sm:w-32 
          sm:h-32 rounded-full white-bg -top-9  -left-9 -z-5
          "
      />
      <div
        className=" absolute w-72 h-72 sm:w-56 
          sm:h-56 rounded-full white-bg -bottom-24 -right-14 -z-5
          "
      />
      <div
        className=" md:hidden  absolute w-72 h-72 sm:w-56 
          sm:h-56 rounded-full white-bg -bottom-16 -z-5
          "
      />
      <div
        className="md:hidden absolute w-48 h-48 sm:w-32 
          sm:h-32 rounded-full white-bg -right-14 -top-9
          "
      />
    </div>
  );
};

export default Banner;
