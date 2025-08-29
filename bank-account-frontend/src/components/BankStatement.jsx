import React from "react";
import React, { useState } from 'react';

function BankStatement() {
  const [accountNumber, setAccountNumber] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  const fetchStatement = async () => {
    try {
      const res = await fetch(`http://localhost:8000/bank-statement?account_number=${accountNumber}`);
      const data = await res.json();

      if (res.ok) {
        setTransactions(data.transactions);
        setError('');
      } else {
        setError(data.detail || 'Error retrieving statement');
        setTransactions([]);
      }
    } catch (err) {
      setError('❌ Network error');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bank Statement</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="border px-4 py-2 mr-2 rounded"
        />
        <button
          onClick={fetchStatement}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Get Statement
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {transactions.length > 0 && (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{new Date(tx.timestamp).toLocaleString()}</td>
                <td className="border px-4 py-2 capitalize">{tx.type}</td>
                <td className="border px-4 py-2">${tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BankStatement;
