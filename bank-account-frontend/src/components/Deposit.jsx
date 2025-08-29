import React from "react";
import { useState } from "react";
import { deposit } from "../Services/api";

export default function Deposit() {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await deposit({ account_number: accountNumber, amount: parseFloat(amount) });
      setResult(res.data);
    } catch (err) {
      alert("Error: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-xl rounded-2xl">
      <h1 className="text-xl font-bold mb-4">Deposit</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Account Number"
          className="w-full border rounded p-2"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full border rounded p-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button className="w-full bg-green-500 text-white py-2 rounded-xl">
          Deposit
        </button>
      </form>

      {result && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <p>{result.message}</p>
          <p>New Balance: {result.balance}</p>
        </div>
      )}
    </div>
  );
}
