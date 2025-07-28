import React from "react";
import useSlotGame from "../../zustang/useSlotGame";
import fttImage from "../../assets/slot/ftt-bonus.png";

export default function SlotFreeSpinsEndModal() {
  const { showFreeSpinsModal, setShowFreeSpinsModal, freeSpinsWin } =
    useSlotGame();

  if (!showFreeSpinsModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-sm">
      <div className="relative bg-white border border-neutral-200 rounded-2xl shadow-2xl max-w-[95vw] sm:max-w-[500px] w-full flex flex-col items-center gap-6 animate-fade-in p-4 sm:p-7">
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <img
            src={fttImage}
            className="w-32 h-32 sm:w-40 sm:h-40 object-contain mb-2"
            alt="FTT Bonus"
          />
          <span className="text-2xl sm:text-4xl font-bold text-black text-center tracking-tight leading-tight">
            Free Spins Ended
          </span>
          <span className="text-base sm:text-lg text-neutral-700 text-center max-w-[95vw] sm:max-w-[90%]">
            Well played! Your free spins session is over.
            <br />
            You won a total of:
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-green-600 text-center my-2">
            {freeSpinsWin}
          </div>
        </div>
        <button
          onClick={() => setShowFreeSpinsModal(false)}
          className="mt-2 px-6 py-2 sm:px-8 sm:py-3 rounded-xl bg-black text-white font-bold shadow transition-all hover:bg-neutral-800 hover:scale-105 duration-150 text-base sm:text-lg w-full sm:w-auto"
        >
          Collect Winnings
        </button>
      </div>
    </div>
  );
}
