
import { Transaction } from "../types/transaction";

const TRANSACTIONS_KEY = "trip-wallet-transactions";

export const saveTransactions = (transactions: Transaction[]): void => {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const getTransactions = (): Transaction[] => {
  const storedTransactions = localStorage.getItem(TRANSACTIONS_KEY);
  return storedTransactions ? JSON.parse(storedTransactions) : [];
};

export const addTransaction = (transaction: Transaction): void => {
  const transactions = getTransactions();
  transactions.push(transaction);
  saveTransactions(transactions);
};

export const deleteTransaction = (id: string): void => {
  const transactions = getTransactions();
  const updatedTransactions = transactions.filter(t => t.id !== id);
  saveTransactions(updatedTransactions);
};
