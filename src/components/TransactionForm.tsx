
import React, { useState } from "react";
import { addTransaction } from "../utils/localStorageService";
import { Transaction } from "../types/transaction";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

interface TransactionFormProps {
  onClose: () => void;
  onTransactionAdded: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onClose, onTransactionAdded }) => {
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !location || !recipient) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const numAmount = parseFloat(amount);
      
      if (isNaN(numAmount) || numAmount <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        amount: numAmount,
        location,
        recipient,
        date: new Date().toISOString(),
      };

      addTransaction(newTransaction);
      onTransactionAdded();
      toast.success("Transaction added");
      onClose();
    } catch (error) {
      toast.error("Failed to add transaction");
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="modal-container" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="amount" className="block text-white text-3xl font-bold text-shadow mb-2">
              amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="input-field"
              step="0.01"
              min="0"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="block text-white text-3xl font-bold text-shadow mb-2">
              where?
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where was this spent?"
              className="input-field"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="recipient" className="block text-white text-3xl font-bold text-shadow mb-2">
              to?
            </label>
            <input
              id="recipient"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Who received this payment?"
              className="input-field"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="modal-btn cancel-btn"
            >
              CANCEL
            </button>
            <button 
              type="submit" 
              className="modal-btn add-btn"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
