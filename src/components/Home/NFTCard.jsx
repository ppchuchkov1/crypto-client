const NFTCard = ({ item }) => {
  return (
    <div className="flex items-center flex-col gap-8 w-full group">
      <div className="block w-full">
        <img
          className="w-full h-auto rounded-3xl object-cover"
          src={item.image_url}
          alt="Project Achievements of Sketch"
        />
      </div>
      <div className="flex items-center justify-between max-w-[406px] lg:max-w-full w-full lg:px-0">
        <div className="block">
          <h4 className="text-2xl font-manrope font-semibold text-gray-900 mb-1">
            {item.name}
          </h4>
          <p className="font-medium text-lg text-gray-400">
            {item.price_eth} ETH
          </p>
        </div>
        <button className=" border border-black py-2 px-3.5 rounded-lg transition-all duration-300 group-hover:bg-black">
          <svg
            className="stroke-black transition-all duration-300 group-hover:stroke-white"
            xmlns="http://www.w3.org/2000/svg"
            width={17}
            height={16}
            viewBox="0 0 17 16"
            fill="none"
          >
            <path
              d="M9.62553 4L13.6664 8.0409M13.6664 8.0409L9.62553 12.0818M13.6664 8.0409L1.6665 8.0409"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NFTCard;
