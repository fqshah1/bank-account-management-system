import axios from "axios";

const API_BASE = "http://127.0.0.1:8002";  // FastAPI backend

// Create account
export const createAccount = async (accountData) => {
  const response = await axios.post(`${API_BASE}/create-account/`, accountData);
  return response.data;
};

// Deposit money
export const deposit = async (depositData) => {
  const response = await axios.post(`${API_BASE}/deposit/`, depositData);
  return response.data;
};

// Withdraw money
export const withdraw = async (withdrawData) => {
  const response = await axios.post(`${API_BASE}/withdraw/`, withdrawData);
  return response.data;
};

// Check balance
export const checkBalance = async (accountNumber) => {
  const response = await axios.get(`${API_BASE}/balance/${accountNumber}`);
  return response.data;
};

// User summary
export const userSummary = async (accountNumber) => {
  const response = await axios.get(`${API_BASE}/summary/${accountNumber}`);
  return response.data;
};
