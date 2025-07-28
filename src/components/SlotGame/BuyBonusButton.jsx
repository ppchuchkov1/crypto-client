const BuyBonusButton = ({ value, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-2 px-2 py-1 w-20 rounded bg-yellow-500 text-white font-bold text-xs shadow border-2 border-yellow-600 hover:bg-yellow-500 transition disabled:opacity-60"
    >
      Buy bonus {value * 10}
    </button>
  );
};

export default BuyBonusButton;
