import { useRef, useEffect } from "react";
import winSound from "../../assets/sounds/win.wav";
import freeSpinsSound from "../../assets/sounds/free-spins.wav";
import useSlotGame from "../../zustang/useSlotGame";
import SlotFreeSpinsStartModal from "./SlotFreeSpinsStartModal";
import WinAnimation from "./WinAnimation";
import Reel from "./Reel";

export default function SlotReels() {
  const {
    reels,
    reelsSpinning,
    symbols,
    showWinAnimation,
    freeSpins,
    freeSpinMultiplier,
  } = useSlotGame();

  const winAudioRef = useRef(null);
  const freeSpinsAudioRef = useRef(null);
  const prevFreeSpins = useRef(freeSpins);

  useEffect(() => {
    winAudioRef.current = new window.Audio(winSound);
    winAudioRef.current.load();
    freeSpinsAudioRef.current = new window.Audio(freeSpinsSound);
    freeSpinsAudioRef.current.load();
  }, []);

  useEffect(() => {
    if (showWinAnimation && winAudioRef.current) {
      winAudioRef.current.currentTime = 0;
      winAudioRef.current.play();
    }
  }, [showWinAnimation]);

  useEffect(() => {
    if (freeSpins > prevFreeSpins.current && freeSpinsAudioRef.current) {
      freeSpinsAudioRef.current.currentTime = 0;
      freeSpinsAudioRef.current.play();
    }
    prevFreeSpins.current = freeSpins;
  }, [freeSpins]);

  return (
    <>
      <div
        className={`flex flex-row items-center justify-center ${
          freeSpins > 0 ? "bg-cyan-400/10" : "bg-black/40"
        } backdrop-blur-xl rounded-lg shadow-2xl p-2 sm:p-8 relative w-[95%] max-w-[900px] h-[180px] sm:h-[320px] overflow-hidden`}
      >
        {showWinAnimation && <WinAnimation />}
        {reels.map((r, i) => (
          <Reel key={i} symbol={symbols[r]} spinning={reelsSpinning[i]} />
        ))}
        {freeSpins > 0 && (
          <div className="absolute right-2 sm:right-4 top-2 sm:top-4 bg-yellow-400 text-black font-extrabold px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-lg sm:text-2xl shadow-lg border border-white sm:border-2">
            x{freeSpinMultiplier}
          </div>
        )}
      </div>
      <SlotFreeSpinsStartModal />
    </>
  );
}
