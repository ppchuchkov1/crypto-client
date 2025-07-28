import React from "react";
import { motion } from "framer-motion";
import useSlotGame from "../../zustang/useSlotGame";
import Modal from "../../UI/Modal";
import winSound from "../../assets/sounds/win.wav";
import freeSpinsSound from "../../assets/sounds/free-spins.wav";
import SlotFreeSpinsStartModal from "./SlotFreeSpinsStartModal";
import WinAnimation from "./WinAnimation";
import Reel from "./Reel";
// Компонент за един рил

export default function SlotReels() {
  const {
    reels,
    reelsSpinning,
    symbols,
    showWinAnimation,
    freeSpins,
    freeSpinMultiplier,
    showFreeSpinsMessage, // добавяме новия флаг
    setShowFreeSpinsMessage,
  } = useSlotGame();

  // Пре-зареждам звуците
  const winAudioRef = React.useRef(null);
  const freeSpinsAudioRef = React.useRef(null);
  React.useEffect(() => {
    winAudioRef.current = new window.Audio(winSound);
    winAudioRef.current.load();
    freeSpinsAudioRef.current = new window.Audio(freeSpinsSound);
    freeSpinsAudioRef.current.load();
  }, []);

  // Пускам win звук при анимация
  React.useEffect(() => {
    if (showWinAnimation && winAudioRef.current) {
      winAudioRef.current.currentTime = 0;
      winAudioRef.current.play();
    }
  }, [showWinAnimation]);

  // Пускам free spins звук при спечелване
  const prevFreeSpins = React.useRef(freeSpins);
  React.useEffect(() => {
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
        {/* Анимация с падащи пари */}
        {showWinAnimation && <WinAnimation />}
        {/* Рилове */}
        {reels.map((r, i) => (
          <Reel key={i} symbol={symbols[r]} spinning={reelsSpinning[i]} />
        ))}
        {/* Win multiplier */}
        {freeSpins > 0 && (
          <div className="absolute right-2 sm:right-4 top-2 sm:top-4 bg-yellow-400 text-black font-extrabold px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-lg sm:text-2xl shadow-lg border border-white sm:border-2">
            x{freeSpinMultiplier}
          </div>
        )}
        {/* Промени това */}
      </div>
      <SlotFreeSpinsStartModal />
    </>
  );
}
