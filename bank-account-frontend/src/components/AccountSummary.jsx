import React from "react";
import React, { useState } from "react";
import { getAccountSummary } from "../Services/api";

function AccountSummary() {
  const [accountNumber, setAccountNumber] = useState('');
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  const handleFetchSummary = async () => {
    try {
      const response = await fetch(`http://localhost:8002/account-summary?account_number=${accountNumber}`);

      const data = await response.json();

      if (response.ok) {
        setSummary(data);
        setError('');
      } else {
        setError(data.message || 'Failed to retrieve summary.');
        setSummary(null);
      }
    } catch (err) {
      console.error(err);
      setError('❌ Network or server error.');
      setSummary(null);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Account Summary</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="border px-4 py-2 mr-2 rounded"
        />
        <button
          onClick={handleFetchSummary}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Get Summary
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {summary && (
        <div className="border p-4 rounded shadow bg-gray-100">
          <p><strong>Account Holder:</strong> {summary.name}</p>
          <p><strong>Account Number:</strong> {summary.account_number}</p>
          <p><strong>Balance:</strong> ${summary.balance}</p>
        </div>
      )}
    </div>
  );
}

export default AccountSummary;
