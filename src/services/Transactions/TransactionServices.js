import axios from "axios";
import { base_url } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const token = getUserFromStorage();

//! Add transaction
export const addTransactionAPI = async ({
  type,
  amount,
  category,
  date,
  description,
}) => {
  const response = await axios.post(
    `${base_url}/transactions/create`,
    {
      type,
      category,
      amount,
      date,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//! List of transactions
export const listTransactionsAPI = async ({
  startDate,
  endDate,
  type,
  category,
}) => {
  const response = await axios.get(`${base_url}/transactions/lists`, {
    params: {
      startDate,
      endDate,
      type,
      category,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
