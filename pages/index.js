import Banner from "../Components/Banner.jsx";

export default function Home() {
  return (
    <div className="flex justify-center sm:px-4 p-12 xl:mx-24">
      <div className="w-full minwd:w-4/5">
        <Banner
          textContent="Buy and Sell NFTs from all over the world"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl  text-left"
        />
      </div>
    </div>
  );
}
