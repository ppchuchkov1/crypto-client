import { Info, VolumeOff, Volume2 } from "lucide-react";

const MobileMuteInfoButtons = ({ setInfoOpen, musicMuted, setMusicMuted }) => {
  return (
    <>
      <button
        className="fixed bottom-4 left-4 z-50 cursor-pointer bg-white rounded-full p-3 shadow-lg sm:hidden"
        aria-label="info"
        onClick={() => setInfoOpen(true)}
      >
        <Info className="w-5 h-5 text-black" />
      </button>
      <button
        onClick={() => setMusicMuted((m) => !m)}
        className="fixed bottom-4 right-4 z-50 cursor-pointer bg-white rounded-full p-3 shadow-lg sm:hidden"
      >
        {musicMuted ? (
          <VolumeOff className="w-5 h-5 text-black" />
        ) : (
          <Volume2 className="w-5 h-5 text-black" />
        )}
      </button>
    </>
  );
};

export default MobileMuteInfoButtons;
