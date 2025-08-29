import React, { useState } from 'react';

function CreateAccountForm() {
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState('');
  const [message, setMessage] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8010/create-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        account_number: accountNumber,
        balance: parseFloat(balance),
      }),
    });

    const result = await response.json();
    console.log('Fetch result:', result); // 👈 ADD THIS

    if (response.ok) {
      setMessage(`✅ ${result.message}`);
    } else {
      setMessage(`❌ ${result.detail || 'Failed to create account.'}`);
    }
  } catch (error) {
    console.error('Network error:', error); // 👈 AND THIS
    setMessage('❌ Network or server error.');
  }

  setName('');
  setAccountNumber('');
  setBalance('');
};


  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create New Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 mb-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="border px-4 py-2 mb-2 w-full rounded"
          required
        />
        <input
          type="number"
          placeholder="Initial Balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          className="border px-4 py-2 mb-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Create Account
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm font-semibold">{message}</p>
      )}
    </div>
  );
}

export default CreateAccountForm;
