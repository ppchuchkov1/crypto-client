import { create } from "zustand";
import { apiURl } from "../configuration/apiconfig";
import useAuthStore from "./useAuthStore";
import useWalletStore from "./useWalletStore";

import fttBonusImg from "../assets/slot/ftt-bonus.png";
import sbfImg from "../assets/slot/sbf.png";
import czImg from "../assets/slot/cz.png";
import carolineImg from "../assets/slot/caroline.png";

const symbols = [
  { img: fttBonusImg, color: "", multiplier: 0 },
  { img: sbfImg, color: "", multiplier: 5 },
  { img: czImg, color: "", multiplier: 4 },
  { img: carolineImg, color: "", multiplier: 3 },
];

const bets = [100, 500, 1000, 5000];
const FREE_SPINS_COUNT = 7;

const useSlotGame = create((set, get) => ({
  reels: [0, 0, 0],
  bet: bets[0],
  spinning: false,
  balance: 10000,
  message: "",
  freeSpins: 0,
  freeSpinMultiplier: 1,
  freeSpinsWin: 0,
  showFreeSpinsModal: false,
  lastWin: 0,
  showWinAnimation: false,
  reelsSpinning: [false, false, false],
  freeSpinsBet: null,
  inFreeSpinsSession: false,
  showFreeSpinsMessage: false,
  pendingFreeSpinsEndModal: false,

  setShowFreeSpinsModal: (val) => {
    set({ showFreeSpinsModal: val });
    if (!val) {
      set({ pendingFreeSpinsEndModal: false, inFreeSpinsSession: false });
    }
  },

  setShowFreeSpinsMessage: (val) => set({ showFreeSpinsMessage: val }),

  handleBetAndSpin: (betValue) => {
    const { spinning, freeSpins, freeSpinsBet, balance } = get();
    if (spinning) return;
    if (freeSpins > 0) {
      if (betValue !== freeSpinsBet) return;
      get().spin(betValue);
      return;
    }
    if (balance < betValue) return;
    set({ bet: betValue });
    get().spin(betValue);
  },

  spin: async (customBet) => {
    const state = get();
    const usedBet = customBet !== undefined ? customBet : state.bet;

    // Вземаме реалния баланс от wallet store
    const walletStore = useWalletStore.getState();
    const realBalance = walletStore.wallet?.wallet?.usdBalance || 0;

    if (state.spinning || (!state.freeSpins && realBalance < usedBet)) return;

    set({
      spinning: true,
      reelsSpinning: [true, true, true],
      message: "",
      showFreeSpinsMessage: false,
    });

    // При free spins не правим залог
    if (!state.freeSpins) {
      // Обновяваме баланса в сървъра при залог
      const token = useAuthStore.getState().token;
      try {
        await walletStore.updateSlotBalance(token, usedBet, 0, false);
        // Зареждаме най-новия wallet след залог
        await walletStore.getUserWallet(token);
      } catch (error) {
        console.error("Failed to update balance:", error);
        set({ spinning: false, reelsSpinning: [false, false, false] });
        return;
      }
    }

    let currentReels = [...state.reels];
    let stopped = [false, false, false];
    let intervals = [null, null, null];
    let finalSymbols = [0, 0, 0];
    const wasFreeSpins = state.freeSpins > 0;

    const startReelSpin = (reelIdx, stopAfterMs) => {
      intervals[reelIdx] = setInterval(() => {
        currentReels[reelIdx] = Math.floor(Math.random() * symbols.length);
        set({ reels: [...currentReels] });
      }, 50);
      setTimeout(() => {
        clearInterval(intervals[reelIdx]);
        finalSymbols[reelIdx] = Math.floor(Math.random() * symbols.length);
        currentReels[reelIdx] = finalSymbols[reelIdx];
        set({ reels: [...currentReels] });
        stopped[reelIdx] = true;
        set((prev) => {
          const next = [...prev.reelsSpinning];
          next[reelIdx] = false;
          return { reelsSpinning: next };
        });
        if (stopped.every(Boolean)) {
          (async () => {
            const counts = {};
            finalSymbols.forEach((idx) => {
              counts[idx] = (counts[idx] || 0) + 1;
            });
            const count7 = counts[0] || 0;
            let winSymbolIdx = null;
            let isWin = false;
            let isTripleSeven = false;
            if (count7 === 3) {
              isTripleSeven = true;
            } else {
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
              for (let i = 1; i < symbols.length; i++) {
                if (counts[i] === 3) {
                  winSymbolIdx = i;
                  isWin = true;
                  break;
                }
              }
            }
            if (isTripleSeven) {
              set({ inFreeSpinsSession: true });
              set({
                message: `${FREE_SPINS_COUNT} FREE SPINS!`,
                freeSpins: state.freeSpins + FREE_SPINS_COUNT,
                lastWin: 0,
                showWinAnimation: false,
                showFreeSpinsMessage: true,
              });
              if (!wasFreeSpins) {
                set({
                  freeSpinMultiplier: 1,
                  freeSpinsWin: 0,
                  freeSpinsBet: usedBet,
                });
              }
              set({ spinning: false });
              return;
            } else if (isWin && winSymbolIdx !== null) {
              let win = usedBet * symbols[winSymbolIdx].multiplier;
              let totalMultiplier = 1;
              if (state.freeSpins > 0) {
                totalMultiplier = state.freeSpinMultiplier;
                win = win * totalMultiplier;
                set({ freeSpinsWin: state.freeSpinsWin + win });
              }

              // Обновяваме баланса в сървъра при печалба
              const token = useAuthStore.getState().token;
              try {
                await walletStore.updateSlotBalance(token, 0, win, true);
                // Зареждаме най-новия wallet след печалба
                await walletStore.getUserWallet(token);
              } catch (error) {
                console.error("Failed to update balance on win:", error);
              }

              set({
                lastWin: win,
                showWinAnimation: true,
              });
              setTimeout(() => set({ showWinAnimation: false }), 1800);
            } else {
              set({ lastWin: 0, showWinAnimation: false });
            }
            if (state.freeSpins > 0 && !isTripleSeven) {
              set({
                freeSpins: state.freeSpins > 0 ? state.freeSpins - 1 : 0,
                freeSpinMultiplier: state.freeSpinMultiplier + 1,
              });
            }
            if (state.freeSpins === 1 && !isTripleSeven) {
              set({ pendingFreeSpinsEndModal: true });
              setTimeout(() => {
                set({
                  freeSpinMultiplier: 1,
                  showFreeSpinsModal: true,
                  freeSpinsBet: null,
                });
              }, 500);
            }
            set({ spinning: false });
          })();
        }
      }, stopAfterMs);
    };
    startReelSpin(0, 900);
    startReelSpin(1, 1200);
    startReelSpin(2, 1500);
  },

  handleBuyBonus: async (betValue) => {
    const {
      spinning,
      freeSpins,
      showFreeSpinsModal,
      reelsSpinning,
      inFreeSpinsSession,
    } = get();

    // Вземаме реалния баланс от wallet store
    const walletStore = useWalletStore.getState();
    const realBalance = walletStore.wallet?.wallet?.usdBalance || 0;

    const bonusPrice = betValue * 10;
    // Забраняваме ако:
    // - върти се
    // - има freeSpins
    // - модалът е отворен
    // - freeSpins == 1 и някой рил още се върти (т.е. точно преди да се отвори модала)
    // - или ако сме в сесия на free spins (inFreeSpinsSession)
    if (
      spinning ||
      freeSpins > 0 ||
      showFreeSpinsModal ||
      (freeSpins === 1 && reelsSpinning.some(Boolean)) ||
      inFreeSpinsSession
    )
      return;
    if (realBalance < bonusPrice) return;

    // Обновяваме баланса в сървъра
    const token = useAuthStore.getState().token;
    try {
      await walletStore.updateSlotBalance(token, bonusPrice, 0, false);
      // Зареждаме най-новия wallet след купуване на bonus
      await walletStore.getUserWallet(token);
    } catch (error) {
      console.error("Failed to update balance for bonus:", error);
      return;
    }

    set({
      freeSpins: FREE_SPINS_COUNT,
      freeSpinMultiplier: 1,
      freeSpinsWin: 0,
      freeSpinsBet: betValue,
      bet: betValue,
      message: `${FREE_SPINS_COUNT} Free spins`,
      lastWin: 0,
      showWinAnimation: false,
      inFreeSpinsSession: true,
      showFreeSpinsMessage: true,
    });
  },

  symbols,
  bets,
  FREE_SPINS_COUNT,
}));

export default useSlotGame;
