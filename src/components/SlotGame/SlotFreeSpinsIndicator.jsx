import useSlotGame from "../../zustang/useSlotGame";

const SlotFreeSpinsIndicator = () => {
  const { freeSpins } = useSlotGame();
  return (
    <div className="w-full flex justify-center mb-2 animate-fade-in">
      <a
        href=""
        class="border border-white  rounded-lg py-2 px-4 text-white  text-sm mb-5 transition duration-300 ease-in-out hover:text-gray-300"
      >
        {freeSpins <= 0
          ? "Here, your bet won’t vanish overnight"
          : `Remaining Free Spins: ${freeSpins} `}
      </a>
    </div>
  );
};

export default SlotFreeSpinsIndicator;
