import { useEffect, useRef } from "react";
import { Volume2, VolumeOff, Info } from "lucide-react";
import spinSound from "../../assets/sounds/spin.wav";
import useWalletStore from "../../zustang/useWalletStore";
import useSlotGame from "../../zustang/useSlotGame";
import BetButton from "./BetButton";
import BuyBonusButton from "./BuyBonusButton";

const SlotControls = ({ musicMuted, setMusicMuted, onInfoClick }) => {
  const { wallet } = useWalletStore();
  const {
    lastWin,
    bets,
    bet,
    freeSpins,
    freeSpinsBet,
    spinning,
    handleBetAndSpin,
    handleBuyBonus,
    inFreeSpinsSession,
    showFreeSpinsModal,
    pendingFreeSpinsEndModal,
  } = useSlotGame();

  const realBalance = wallet?.wallet?.usdBalance || 0;
  const spinAudioRef = useRef(null);

  useEffect(() => {
    spinAudioRef.current = new window.Audio(spinSound);
    spinAudioRef.current.load();
  }, []);

  const playSpinSound = () => {
    if (spinAudioRef.current) {
      spinAudioRef.current.currentTime = 0;
      spinAudioRef.current.play();
    }
  };

  const isBetDisabled = (b) =>
    showFreeSpinsModal ||
    pendingFreeSpinsEndModal ||
    (freeSpins > 0 ? b !== freeSpinsBet : spinning || realBalance < b);

  const isBuyBonusDisabled = (b) =>
    spinning || realBalance < b * 10 || freeSpins > 0 || inFreeSpinsSession;

  return (
    <div className="w-[95%] max-w-[900px] bg-black/50 backdrop-blur-md rounded-lg px-2 sm:px-8 py-4 mt-2 shadow-2xl ">
      {/* Mobile: balance and win same row, buttons bellow */}
      <div className="flex flex-row w-full justify-between items-center mb-2 sm:hidden">
        <div className="flex flex-col items-center min-w-[120px]">
          <span className="text-xl font-extrabold text-white tracking-wider leading-none">
            {realBalance.toLocaleString()}
          </span>
          <span className="text-xs text-yellow-400 font-bold uppercase mt-1 tracking-widest">
            BALANCE
          </span>
        </div>
        <div className="flex flex-col items-center min-w-[120px]">
          <span className="text-xl font-extrabold text-white tracking-wider leading-none">
            {lastWin > 0 ? `${lastWin.toLocaleString()}` : "0.00"}
          </span>
          <span className="text-xs text-yellow-400 font-bold uppercase mt-1 tracking-widest">
            WIN
          </span>
        </div>
      </div>
      <div className="mt-4 w-full overflow-x-auto sm:hidden">
        <div className="flex flex-row gap-2 min-w-max px-1 justify-center items-center w-full">
          {bets.map((b) => (
            <div key={b} className="flex flex-col items-center flex-shrink-0">
              <BetButton
                value={b}
                selected={bet === b}
                disabled={isBetDisabled(b)}
                onClick={() => {
                  playSpinSound();
                  handleBetAndSpin(b);
                }}
              />
              <BuyBonusButton
                value={b}
                disabled={isBuyBonusDisabled(b)}
                onClick={() => handleBuyBonus(b)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Desktop: all in one row */}
      <div className="hidden sm:flex flex-row w-full items-end justify-between gap-4">
        <div className="flex flex-col items-center min-w-[120px] relative">
          {/* Mute and info buttons only in desktop */}
          <button
            className="cursor-pointer z-10 absolute -top-10 left-1/2 -translate-x-1/2 bg-white rounded-full p-1 shadow hover:bg-gray-200 transition sm:block hidden"
            aria-label="Info"
            onClick={onInfoClick}
          >
            <Info className="w-5 h-5 text-black" />
          </button>
          <span className="text-3xl font-extrabold text-white tracking-wider leading-none">
            {realBalance.toLocaleString()}
          </span>
          <span className="text-sm text-yellow-400 font-bold uppercase mt-1 tracking-widest">
            BALANCE
          </span>
        </div>
        <div className="flex flex-row flex-wrap items-end gap-3 flex-1 justify-center">
          {bets.map((b) => (
            <div key={b} className="flex flex-col items-center">
              <BetButton
                value={b}
                selected={bet === b}
                disabled={isBetDisabled(b)}
                onClick={() => {
                  playSpinSound();
                  handleBetAndSpin(b);
                }}
              />
              <BuyBonusButton
                value={b}
                disabled={isBuyBonusDisabled(b)}
                onClick={() => handleBuyBonus(b)}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center min-w-[120px] relative">
          <button
            className="cursor-pointer absolute z-10 bg-white -top-10 left-1/2 -translate-x-1/2  rounded-full p-1 shadow hover:bg-gray-200 transition sm:block hidden"
            aria-label={musicMuted ? "Start music" : "Stop music"}
            onClick={() => setMusicMuted((m) => !m)}
          >
            {musicMuted ? (
              <VolumeOff className="w-5 h-5 text-black" />
            ) : (
              <Volume2 className="w-5 h-5 text-black" />
            )}
          </button>
          <span className="text-3xl font-extrabold text-white tracking-wider leading-none">
            {lastWin > 0 ? `${lastWin.toLocaleString()}` : "0.00"}
          </span>
          <span className="text-sm text-yellow-400 font-bold uppercase mt-1 tracking-widest">
            WIN
          </span>
        </div>
      </div>
    </div>
  );
};

export default SlotControls;
