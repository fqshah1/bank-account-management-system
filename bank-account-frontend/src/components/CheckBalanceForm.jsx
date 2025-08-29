import { useState } from "react";
import { checkBalance } from "../Services/api";

export default function CheckBalance() {
  const [accountNumber, setAccountNumber] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await checkBalance(accountNumber);
      setResult(res.data);
    } catch (err) {
      alert("Error: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-xl rounded-2xl">
      <h1 className="text-xl font-bold mb-4">Check Balance</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Account Number"
          className="w-full border rounded p-2"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded-xl">
          Check Balance
        </button>
      </form>

      {result !== null && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <p>Balance: {result.balance}</p>
        </div>
      )}
    </div>
  );
}
