import React from "react";
import React, { useState } from "react";
import { getAccount } from "../Services/api";

export default function AccountDetails() {
  const [accountId, setAccountId] = useState("");
  const [account, setAccount] = useState(null);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await getAccount(accountId);
      setAccount(data);
      setMessage("");
    } catch (err) {
      setAccount(null);
      setMessage("❌ Account not found");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Account Details</h2>
      <form onSubmit={handleSearch} className="space-y-2">
        <input
          type="text"
          placeholder="Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button className="bg-purple-500 text-white px-4 py-2 rounded">
          Get Details
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
      {account && (
        <div className="mt-4 border p-2 rounded">
          <p><strong>ID:</strong> {account.id}</p>
          <p><strong>Name:</strong> {account.name}</p>
          <p><strong>Balance:</strong> {account.balance}</p>
        </div>
      )}
    </div>
  );
}
