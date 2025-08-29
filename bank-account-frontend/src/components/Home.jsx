import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">🏦 Bank Account Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link
          to="/create-account"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-lg text-center transition"
        >
          <h2 className="text-xl font-semibold">➕ Create Account</h2>
          <p className="text-gray-600 mt-2">Open a new bank account</p>
        </Link>

        <Link
          to="/deposit"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-lg text-center transition"
        >
          <h2 className="text-xl font-semibold">💰 Deposit</h2>
          <p className="text-gray-600 mt-2">Add funds to your account</p>
        </Link>

        <Link
          to="/withdraw"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-lg text-center transition"
        >
          <h2 className="text-xl font-semibold">💸 Withdraw</h2>
          <p className="text-gray-600 mt-2">Withdraw money safely</p>
        </Link>

        <Link
          to="/summary"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-lg text-center transition"
        >
          <h2 className="text-xl font-semibold">📊 Account Summary</h2>
          <p className="text-gray-600 mt-2">View account details</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
