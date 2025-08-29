import React from "react";
import { useState } from "react";
import { createAccount } from "../Services/api";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createAccount({ name, balance: parseFloat(balance) });
      setResult(res.data);
    } catch (err) {
      alert("Error creating account: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-xl rounded-2xl">
      <h1 className="text-xl font-bold mb-4">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Initial Balance"
          className="w-full border rounded p-2"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          required
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded-xl">
          Create
        </button>
      </form>

      {result && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <p><b>Account Created:</b></p>
          <p>Account Number: {result.account_number}</p>
          <p>Name: {result.name}</p>
          <p>Balance: {result.balance}</p>
        </div>
      )}
    </div>
  );
}
