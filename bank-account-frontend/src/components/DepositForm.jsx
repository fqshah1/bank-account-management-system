import React, { useState } from 'react';

function DepositForm() {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8010/deposit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        account_number: accountNumber,
        amount: parseFloat(amount),
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert(`✅ ${result.message}`);
    } else {
      alert(`❌ ${result.detail || result.message}`);
    }
  } catch (error) {
    alert('❌ Network or server error.');
  }

  setAccountNumber('');
  setAmount('');
};


  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Deposit Funds</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="border px-4 py-2 mb-3 w-full rounded"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border px-4 py-2 mb-3 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Deposit
        </button>
      </form>
    </div>
  );
}

export default DepositForm;
