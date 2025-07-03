const Services = () => {
  return (
    <section className="bg-white py-10 pb-10 sm:pb-5">
      <div className="grid max-w-7xl mx-auto px-6 lg:gap-8 xl:gap-0  lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="text-4xl font-bold sm:text-6xl mb-4">
            Your gateway to smart Crypto & NFT trading
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            Discover a simple and secure way to trade crypto with our modern
            app. Get real-time prices, track your portfolio, and buy or sell in
            just a few taps. Perfect for both beginners and experienced traders.
          </p>
          <a
            href="#"
            className="inline-flex  bg-ftx items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 "
          >
            Get started
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 "
          >
            Speak to Sales
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://ethereum.org/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fimpact_transparent.7420c423.png&w=828&q=75"
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
