import Modal from "../../UI/Modal";
import fttBonusImg from "../../assets/slot/ftt-bonus.png";
import sbfImg from "../../assets/slot/sbf.png";
import czImg from "../../assets/slot/cz.png";
import carolineImg from "../../assets/slot/caroline.png";

const SlotGameInfoModal = ({ infoOpen, setInfoOpen }) => {
  const SYMBOLS = [
    { img: fttBonusImg, name: "FTT Bonus", multiplier: "Bonus Game" },
    { img: sbfImg, name: "SBF", multiplier: "x5" },
    { img: czImg, name: "CZ", multiplier: "x4" },
    { img: carolineImg, name: "Caroline", multiplier: "x3" },
  ];

  return (
    <Modal isOpen={infoOpen} onClose={() => setInfoOpen(false)}>
      <div className="bg-white text-black rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-2xl lg:max-w-5xl mx-auto shadow-2xl border border-gray-300">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-2xl lg:text-4xl font-bold text-black mb-3 sm:mb-4">
            Symbols & Payouts
          </h2>
        </div>

        {/* Symbols Grid - 2x2 на мобилен, 4x1 на десктоп */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {SYMBOLS.map((symbol, index) => (
            <div
              key={index}
              className="group relative bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-500 hover:shadow-2xl text-center overflow-hidden"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gray-100 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Symbol Image */}
              <div className="relative mb-3 sm:mb-4 flex justify-center">
                <div className="relative">
                  <img
                    src={symbol.img}
                    alt={symbol.name}
                    className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-25 lg:h-25 rounded-xl object-cover transition-all duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Symbol Info */}
              <div className="relative space-y-2 sm:space-y-3">
                <h3 className="font-bold text-sm sm:text-base lg:text-lg text-black  transition-colors leading-tight">
                  {symbol.name}
                </h3>

                <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black group-hover:bg-gradient-to-r  text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-300 shadow-lg transform group-hover:scale-105">
                  {symbol.multiplier}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-ftx mb-2">
              <p className="text-sm sm:text-base lg:text-lg font-bold">
                Match 3 identical symbols to win!
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              FTT Bonus triggers special bonus game with extra rewards
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SlotGameInfoModal;
