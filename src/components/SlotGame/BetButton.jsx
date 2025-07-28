const BetButton = ({ value, selected, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col w-20 items-center px-3 py-1 rounded-lg border-2 font-bold shadow-md transition-all duration-150
        ${
          selected
            ? "bg-green-500 border-green-600 text-white scale-105"
            : "bg-[#23272e] border-[#444] text-gray-100 hover:bg-gray-700 hover:border-green-500"
        }
        disabled:opacity-60`}
    >
      <span className="text-base font-extrabold tracking-wider">{value}</span>
      <span className="text-[10px] text-yellow-300 font-bold leading-none ">
        BET
      </span>
    </button>
  );
};

export default BetButton;
