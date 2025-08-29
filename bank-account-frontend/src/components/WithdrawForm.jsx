import React, { useState } from 'react';

function WithdrawForm() {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8010/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          account_number: accountNumber,
          amount: parseFloat(amount),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`✅ ${result.message || 'Withdrawal successful!'}`);
      } else {
        setMessage(`❌ ${result.message || 'Failed to withdraw.'}`);
      }
    } catch (error) {
      setMessage('❌ Network or server error.');
    }

    setAccountNumber('');
    setAmount('');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="border px-4 py-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border px-4 py-2 mb-2 w-full"
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded w-full"
        >
          Withdraw
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default WithdrawForm;
