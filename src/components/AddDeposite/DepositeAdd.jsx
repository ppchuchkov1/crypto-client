import { useState } from "react";
import useAuthStore from "../../zustang/useAuthStore";

const DepositeAdd = () => {
  const token = useAuthStore((state) => state.token);
  const [amount, setAmount] = useState(0);
  const handleDeposit = async () => {
    const res = await fetch(
      "https://ppchu.com/wallet/create-deposit-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      }
    );

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <>
      <input
        className="border-2"
        type="text"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="cursor-pointer bg-ftx" onClick={handleDeposit}>
        Deposite
      </button>
    </>
  );
};

export default DepositeAdd;
