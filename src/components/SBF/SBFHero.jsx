import sbfHero from "../../assets/sbf-hero.jpeg";

const SBFHero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            When Sam said “Hold My Crypto”
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Billions vanish faster than you can say “Bankman-Fried” and the guy
            in charge suddenly remembers he’s got a court date. Welcome to the
            wild ride of FTX — crypto’s biggest “oops” moment ever.
          </p>
        </div>
        <div className="relative">
          <img src={sbfHero} alt="SBF" />
        </div>
      </div>
    </div>
  );
};

export default SBFHero;
