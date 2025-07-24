import React, { useState } from "react";
import fttBonusImg from "../../assets/slot/ftt-bonus.png";
import sbfImg from "../../assets/slot/sbf.png";
import czImg from "../../assets/slot/cz.png";
import carolineImg from "../../assets/slot/caroline.png";
import prisonBg from "../../assets/slot/prison-bg.png";

import { motion } from "framer-motion";

const symbols = [
  { img: fttBonusImg, color: "", multiplier: 0 }, // само free spins
  { img: sbfImg, color: "", multiplier: 5 },
  { img: czImg, color: "", multiplier: 4 },
  { img: carolineImg, color: "", multiplier: 3 },
];

const bets = [100, 500, 1000, 5000];
const FREE_SPINS_COUNT = 7;

export default function SlotGame() {
  const [reels, setReels] = useState([0, 0, 0]);
  const [bet, setBet] = useState(bets[0]);
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(10000);
  const [message, setMessage] = useState("");
  const [freeSpins, setFreeSpins] = useState(0);
  const [freeSpinMultiplier, setFreeSpinMultiplier] = useState(1); // множител за free spins
  const [freeSpinsWin, setFreeSpinsWin] = useState(0); // печалба от free spins
  const [showFreeSpinsModal, setShowFreeSpinsModal] = useState(false);
  const [lastWin, setLastWin] = useState(0); // печалба от последната врътка
  const [showWinAnimation, setShowWinAnimation] = useState(false); // за анимация при печалба
  const [reelsSpinning, setReelsSpinning] = useState([false, false, false]);
  // Държим залога, с който са стартирани free spins
  const [freeSpinsBet, setFreeSpinsBet] = useState(null);

  // По-реалистична анимация: всеки рил спира поетапно
  // Нова функция за смяна на залог и spin с новата стойност
  const handleBetAndSpin = (betValue) => {
    if (spinning) return;
    if (freeSpins > 0) {
      if (betValue !== freeSpinsBet) return;
      spin(betValue);
      return;
    }
    if (balance < betValue) return;
    setBet(betValue);
    spin(betValue);
  };

  // Модифицираме spin да приема по избор betValue
  const spin = (customBet) => {
    const usedBet = customBet !== undefined ? customBet : bet;
    if (spinning || (!freeSpins && balance < usedBet)) return;
    setSpinning(true);
    setReelsSpinning([true, true, true]);
    setMessage("");
    if (!freeSpins) setBalance((b) => b - usedBet);

    let currentReels = [...reels];
    let stopped = [false, false, false];
    let intervals = [null, null, null];
    let finalSymbols = [0, 0, 0];
    const wasFreeSpins = freeSpins > 0; // запомняме дали сме били във free spins преди този spin

    // Функция за въртене на рил
    const startReelSpin = (reelIdx, stopAfterMs) => {
      intervals[reelIdx] = setInterval(() => {
        currentReels[reelIdx] = Math.floor(Math.random() * symbols.length);
        setReels([...currentReels]);
      }, 50);
      setTimeout(() => {
        clearInterval(intervals[reelIdx]);
        // Определяме крайния символ за този рил
        finalSymbols[reelIdx] = Math.floor(Math.random() * symbols.length);
        currentReels[reelIdx] = finalSymbols[reelIdx];
        setReels([...currentReels]);
        stopped[reelIdx] = true;
        setReelsSpinning((prev) => {
          const next = [...prev];
          next[reelIdx] = false;
          return next;
        });
        // Ако всички са спрели, проверяваме за печалба
        if (stopped.every(Boolean)) {
          // WILD LOGIC
          // 0 е индекса на 7️⃣
          const counts = {};
          finalSymbols.forEach((idx) => {
            counts[idx] = (counts[idx] || 0) + 1;
          });
          const count7 = counts[0] || 0;
          let winSymbolIdx = null;
          let isWin = false;
          let isTripleSeven = false;
          // 3x 7️⃣ -> free spins
          if (count7 === 3) {
            isTripleSeven = true;
          } else {
            // Две еднакви + една 7️⃣
            for (let i = 1; i < symbols.length; i++) {
              if (
                (counts[i] === 2 && count7 === 1) ||
                (counts[i] === 1 && count7 === 2)
              ) {
                winSymbolIdx = i;
                isWin = true;
                break;
              }
            }
            // 3 еднакви (без wild)
            for (let i = 1; i < symbols.length; i++) {
              if (counts[i] === 3) {
                winSymbolIdx = i;
                isWin = true;
                break;
              }
            }
          }
          if (isTripleSeven) {
            setMessage(`${FREE_SPINS_COUNT} FREE SPINS!`);
            setFreeSpins((fs) => fs + FREE_SPINS_COUNT);
            if (!wasFreeSpins) {
              setFreeSpinMultiplier(1);
              setFreeSpinsWin(0);
              setFreeSpinsBet(usedBet);
            }
            setLastWin(0);
            setShowWinAnimation(false);
            setSpinning(false);
            return;
          } else if (isWin && winSymbolIdx !== null) {
            let win = usedBet * symbols[winSymbolIdx].multiplier;
            let totalMultiplier = 1;
            if (freeSpins > 0) {
              totalMultiplier = freeSpinMultiplier;
              win = win * totalMultiplier;
              setFreeSpinsWin((w) => w + win);
            }
            setBalance((b) => b + win);
            setLastWin(win);
            setShowWinAnimation(true);
            setTimeout(() => setShowWinAnimation(false), 1800);
          } else {
            setLastWin(0);
            setShowWinAnimation(false);
          }
          // Ако сме във free spins, намаляваме броя им (само ако не са добавени нови 5) и увеличаваме множителя
          if (freeSpins > 0 && !isTripleSeven) {
            setFreeSpins((fs) => (fs > 0 ? fs - 1 : 0));
            setFreeSpinMultiplier((m) => m + 1);
          }
          // Когато свършат free spins, нулираме freeSpinsBet
          if (freeSpins === 1 && !isTripleSeven) {
            setTimeout(() => {
              setFreeSpinMultiplier(1);
              setShowFreeSpinsModal(true);
              setFreeSpinsBet(null);
            }, 500);
          }
          setSpinning(false);
        }
      }, stopAfterMs);
    };

    // Всеки рил спира с малко закъснение
    startReelSpin(0, 900);
    startReelSpin(1, 1200);
    startReelSpin(2, 1500);
  };

  // Купуване на бонус (free spins) с избрания залог
  const handleBuyBonus = (betValue) => {
    if (spinning || freeSpins > 0) return;
    const bonusPrice = betValue * 30; // примерна цена
    if (balance < bonusPrice) return;
    setBalance((b) => b - bonusPrice);
    setFreeSpins(FREE_SPINS_COUNT);
    setFreeSpinMultiplier(1);
    setFreeSpinsWin(0);
    setFreeSpinsBet(betValue);
    setBet(betValue); // маркираме този bet като активен
    setMessage(`${FREE_SPINS_COUNT} БЕЗПЛАТНИ ВРЪТКИ!`);
    setLastWin(0);
    setShowWinAnimation(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${prisonBg})`,
      }}
      className="bg-cover bg-center bg-no-repeat w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-700 to-purple-900 overflow-hidden"
    >
      <div>
        {/* Индикатор за безплатни врътки над играта */}
        {freeSpins > 0 && (
          <div className="w-full flex justify-center mb-2 animate-fade-in">
            <div className="flex items-center gap-2 bg-blue-700 text-white px-6 py-2 rounded-lg font-bold text-lg sm:text-xl shadow-lg border-2 border-blue-300">
              <span className="text-yellow-300 text-2xl">🆓</span> Remaining
              Free Spins: <span className="text-yellow-300">{freeSpins}</span>
            </div>
          </div>
        )}
        {/* Модал за приключили free spins */}
        {showFreeSpinsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-8 flex flex-col items-center w-[90vw] max-w-xs sm:max-w-sm animate-fade-in">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-2 text-center">
                🎁 Free Spins Ended!
              </div>
              <div className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">
                Free Spins Winnings:{" "}
                <span className="text-green-600">{freeSpinsWin}</span>
              </div>
              <button
                className="px-6 sm:px-8 py-2 bg-blue-700 text-white rounded-lg font-bold text-base sm:text-lg shadow hover:bg-blue-800 transition"
                onClick={() => {
                  setShowFreeSpinsModal(false);
                  setFreeSpinsWin(0);
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}
        {/* Слот машина и съобщения */}
        <div className="flex flex-row items-center justify-center bg-black/50 backdrop-blur-md rounded-lg shadow-2xl p-2 sm:p-8 relative w-full max-w-[900px] h-[180px] sm:h-[320px] overflow-hidden">
          {/* Анимация с падащи пари */}
          {showWinAnimation && (
            <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-30">
              {[...Array(12)].map((_, i) => {
                // Генерираме случайни параметри за всяка монета
                const startX = 8 + i * 7;
                const endX = startX + (Math.random() * 10 - 5); // малко отклонение
                const rotate = Math.random() * 360;
                const duration = 1.2 + Math.random() * 0.5;
                return (
                  <motion.span
                    key={i}
                    initial={{
                      top: 0,
                      left: `${startX}%`,
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    animate={{
                      top: "90%",
                      left: `${endX}%`,
                      opacity: 0,
                      rotate: rotate,
                      scale: 1.2,
                    }}
                    transition={{
                      duration: duration,
                      ease: "easeIn",
                    }}
                    className="absolute text-3xl sm:text-4xl select-none"
                    style={{ pointerEvents: "none" }}
                  >
                    💰
                  </motion.span>
                );
              })}
            </div>
          )}
          {/* Рилове */}
          {reels.map((r, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center mx-1 sm:mx-4 w-27 sm:w-60 h-full sm:h-64 bg-white rounded-lg shadow-inner transition-all duration-500`}
            >
              <motion.img
                src={symbols[r].img}
                alt="symbol"
                className="w-full h-full sm:w-50 sm:h-50 object-contain drop-shadow-lg"
                draggable={false}
                animate={
                  reelsSpinning[i]
                    ? {
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.08, 1.08, 1],
                      }
                    : {
                        rotate: 0,
                        scale: 1,
                      }
                }
                transition={
                  reelsSpinning[i]
                    ? {
                        duration: 0.7,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }
                    : { duration: 0.3 }
                }
              />
            </div>
          ))}
          {/* Win multiplier (примерен) */}
          {freeSpins > 0 && (
            <div className="absolute right-2 sm:right-4 top-2 sm:top-4 bg-yellow-400 text-black font-extrabold px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-lg sm:text-2xl shadow-lg border border-white sm:border-2">
              x{freeSpinMultiplier}
            </div>
          )}
          {/* Модерно съобщение */}
          {message && (
            <div
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 px-6 py-4 rounded-lg
                 shadow-2xl text-2xl sm:text-3xl font-bold animate-fade-in z-20
              ${
                message.startsWith("Печелиш")
                  ? "bg-gradient-to-r from-yellow-300 to-pink-400 text-white "
                  : message.includes("БЕЗПЛАТНИ")
                  ? "bg-gradient-to-r from-blue-400 to-blue-700 text-white border-4 border-blue-500"
                  : "bg-gradient-to-r from-gray-800 to-gray-600 text-white border-4 border-gray-500"
              }
            `}
              style={{ minWidth: "220px", minHeight: "60px" }}
            >
              {message.startsWith("Печелиш") ? (
                <span className="text-4xl sm:text-5xl">🎉</span>
              ) : message.includes("БЕЗПЛАТНИ") ? (
                <span className="text-4xl sm:text-5xl">🆓</span>
              ) : (
                <span className="text-4xl sm:text-5xl">😅</span>
              )}
              <span>{message}</span>
            </div>
          )}
        </div>
        {/* Контролен панел: мобилен - balance и win на ред, бутоните отдолу; desktop - всичко на един ред */}
        <div className="w-full max-w-[900px] bg-black/50 backdrop-blur-md rounded-lg px-2 sm:px-8 py-4 mt-2 shadow-2xl ">
          {/* Mobile: balance и win на един ред, бутоните отдолу */}
          <div className="flex flex-row w-full justify-between items-center mb-2 sm:hidden">
            <div className="flex flex-col items-center min-w-[120px]">
              <span className="text-xl font-extrabold text-white tracking-wider leading-none">
                {balance.toLocaleString()}
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
            <div className="flex flex-row items-end gap-2 min-w-max px-1">
              {bets.map((b) => (
                <div
                  key={b}
                  className="flex flex-col items-center flex-shrink-0"
                >
                  <button
                    onClick={() => handleBetAndSpin(b)}
                    disabled={
                      freeSpins > 0
                        ? b !== freeSpinsBet
                        : spinning || balance < b
                    }
                    className={`flex flex-col items-center px-3 py-1 rounded-lg  border-2 font-bold shadow-md transition-all duration-150
                    ${
                      bet === b
                        ? "bg-green-500 border-green-600 text-white scale-105"
                        : "bg-[#23272e] border-[#444] text-gray-100 hover:bg-gray-700 hover:border-green-500"
                    }
                    disabled:opacity-60
                  `}
                    style={{ width: 90 }}
                  >
                    <span className="text-base font-extrabold tracking-wider">
                      {b}
                    </span>
                    <span className="text-[10px] text-yellow-300 font-bold leading-none -mt-1">
                      BET
                    </span>
                  </button>
                  <button
                    onClick={() => handleBuyBonus(b)}
                    disabled={spinning || balance < b * 30 || freeSpins > 0}
                    className={`mt-2 px-2 py-1 rounded bg-yellow-500 text-white font-bold text-xs shadow border-2 border-yellow-600 hover:bg-yellow-500 transition disabled:opacity-60`}
                    style={{ width: 90 }}
                  >
                    Buy bonus {b * 30}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Desktop: всичко на един ред */}
          <div className="hidden sm:flex flex-row w-full items-end justify-between gap-4">
            <div className="flex flex-col items-center min-w-[120px]">
              <span className="text-3xl font-extrabold text-white tracking-wider leading-none">
                {balance.toLocaleString()}
              </span>
              <span className="text-sm text-yellow-400 font-bold uppercase mt-1 tracking-widest">
                BALANCE
              </span>
            </div>
            <div className="flex flex-row flex-wrap items-end gap-3 flex-1 justify-center">
              {bets.map((b) => (
                <div key={b} className="flex flex-col items-center">
                  <button
                    onClick={() => handleBetAndSpin(b)}
                    disabled={
                      freeSpins > 0
                        ? b !== freeSpinsBet
                        : spinning || balance < b
                    }
                    className={`flex flex-col items-center px-4 py-2 rounded-lg  border-2 font-bold shadow-md transition-all duration-150
                    ${
                      bet === b
                        ? "bg-green-500 border-green-600 text-white scale-105"
                        : "bg-[#23272e] border-[#444] text-gray-100 hover:bg-gray-700 hover:border-green-500"
                    }
                    disabled:opacity-60
                  `}
                    style={{ width: 90 }}
                  >
                    <span className="text-lg font-extrabold tracking-wider">
                      {b}
                    </span>
                    <span className="text-xs text-yellow-300 font-bold leading-none -mt-1">
                      BET
                    </span>
                  </button>
                  <button
                    onClick={() => handleBuyBonus(b)}
                    disabled={spinning || balance < b * 30 || freeSpins > 0}
                    className={`mt-2 px-2 py-1 rounded bg-yellow-500 text-white font-bold text-sm shadow border-2 border-yellow-600 hover:bg-yellow-500 transition disabled:opacity-60`}
                    style={{ width: 90 }}
                  >
                    Buy bonus {b * 30}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center min-w-[120px]">
              <span className="text-3xl font-extrabold text-white tracking-wider leading-none">
                {lastWin > 0 ? `${lastWin.toLocaleString()}` : "0.00"}
              </span>
              <span className="text-sm text-yellow-400 font-bold uppercase mt-1 tracking-widest">
                WIN
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
