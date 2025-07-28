import { useEffect, useState, useRef } from "react";
import prisonBg from "../assets/slot/prison-bg.png";
import backgroundMusic from "../assets/sounds/background.mp3";
import useWalletStore from "../zustang/useWalletStore";
import useAuthStore from "../zustang/useAuthStore";
import SlotFreeSpinsIndicator from "../components/SlotGame/SlotFreeSpinsIndicator";
import SlotFreeSpinsEndModal from "../components/SlotGame/SlotFreeSpinsEndModal";
import SlotReels from "../components/SlotGame/SlotReels";
import SlotControls from "../components/SlotGame/SlotControls";
import SlotGameInfoModal from "../components/SlotGame/SlotGameInfoModal";
import MobileMuteInfoButtons from "../components/SlotGame/MobileMuteInfoButtons";
import NoAuthTokenCasino from "../components/SlotGame/NoAuthTokenCasino";

export default function SlotGame() {
  const audioRef = useRef(null);
  const token = useAuthStore((state) => state.token);
  const getUserWallet = useWalletStore((state) => state.getUserWallet);
  const wallet = useWalletStore((state) => state.wallet);

  const [musicMuted, setMusicMuted] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    if (token) {
      getUserWallet(token);
    }
  }, [token, getUserWallet]);

  //init music
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.loop = true;
    if (musicMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [musicMuted]);

  return (
    <div
      style={{ backgroundImage: `url(${prisonBg})` }}
      className="bg-cover bg-center bg-no-repeat w-screen min-h-[93vh] flex flex-col items-center justify-center bg-gradient-to-br from-green-700 to-purple-900 overflow-hidden"
    >
      {wallet.length === 0 ? (
        <NoAuthTokenCasino />
      ) : (
        <>
          <audio ref={audioRef} src={backgroundMusic} loop hidden />
          <MobileMuteInfoButtons
            setInfoOpen={setInfoOpen}
            musicMuted={musicMuted}
            setMusicMuted={setMusicMuted}
          />
          <SlotFreeSpinsEndModal />
          <SlotFreeSpinsIndicator />
          <SlotReels />
          <SlotControls
            musicMuted={musicMuted}
            setMusicMuted={setMusicMuted}
            onInfoClick={() => setInfoOpen(true)}
          />
          <SlotGameInfoModal infoOpen={infoOpen} setInfoOpen={setInfoOpen} />
        </>
      )}
    </div>
  );
}
