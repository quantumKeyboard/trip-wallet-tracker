
import React from "react";
import { Transaction } from "../types/transaction";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-white text-lg font-semibold">No transactions yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 px-4 py-3">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDelete={onDeleteTransaction}
        />
      ))}
    </div>
  );
};

export default TransactionList;
