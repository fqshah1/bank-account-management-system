import api from "../api";

export const createAccount = async (data) => {
  const res = await api.post("/accounts", data);
  return res.data;
};

export const getAccount = async (account_number) => {
  const res = await api.get(`/account-summary`, {
    params: { account_number },
  });
  return res.data;
};

export const deposit = async (account_number, amount) => {
  const res = await api.post(`/deposit`, { account_number, amount });
  return res.data;
};

export const withdraw = async (account_number, amount) => {
  const res = await api.post(`/withdraw`, { account_number, amount });
  return res.data;
};
