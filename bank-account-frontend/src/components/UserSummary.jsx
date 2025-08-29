import React from "react";
import { useState } from "react";
import { userSummary } from "../Services/api";

export default function UserSummary() {
  const [accountNumber, setAccountNumber] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userSummary(accountNumber);
      setResult(res.data);
    } catch (err) {
      alert("Error: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-xl rounded-2xl">
      <h1 className="text-xl font-bold mb-4">User Summary</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Account Number"
          className="w-full border rounded p-2"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />
        <button className="w-full bg-purple-500 text-white py-2 rounded-xl">
          Get Summary
        </button>
      </form>

      {result && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <p><b>Name:</b> {result.name}</p>
          <p><b>Account Number:</b> {result.account_number}</p>
          <p><b>Balance:</b> {result.balance}</p>
        </div>
      )}
    </div>
  );
}
