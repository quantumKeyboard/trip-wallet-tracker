
import React from "react";
import { Transaction } from "../types/transaction";

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onDelete }) => {
  return (
    <div className="transaction-item animate-slide-up">
      <div className="w-1/3 p-5 truncate border-r border-budget-teal">
        <p className="font-bold truncate">₹{transaction.amount.toFixed(2)}</p>
      </div>
      <div className="w-1/3 p-5 truncate border-r border-budget-teal">
        <p className="truncate">{transaction.location}</p>
      </div>
      <div className="w-1/3 p-5 truncate">
        <p className="truncate">{transaction.recipient}</p>
      </div>
    </div>
  );
};

export default TransactionItem;
