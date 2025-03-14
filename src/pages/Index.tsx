
import React, { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { getTransactions, deleteTransaction } from "../utils/localStorageService";
import { Transaction } from "../types/transaction";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a small delay to show loading animation
    const timer = setTimeout(() => {
      const loadedTransactions = getTransactions();
      setTransactions(loadedTransactions);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleDeleteTransaction = (id: string) => {
    try {
      deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      toast.success("Transaction deleted successfully");
    } catch (error) {
      toast.error("Failed to delete transaction");
      console.error("Error deleting transaction:", error);
    }
  };

  const handleTransactionAdded = () => {
    setTransactions(getTransactions());
  };

  return (
    <div className="budget-container">
      <div className="flex flex-col min-h-screen">
        <header className="budget-header">
          <h1 className="text-shadow">budget</h1>
        </header>
        
        <main className="flex-grow overflow-auto pb-20 pt-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-pulse-soft text-white text-xl">Loading your transactions...</div>
            </div>
          ) : (
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={handleDeleteTransaction} 
            />
          )}
        </main>
        
        <button
          onClick={() => setIsFormOpen(true)}
          className="add-button hover:bg-budget-dark-teal"
          aria-label="Add new transaction"
        >
          <Plus size={32} strokeWidth={3} />
        </button>
      </div>

      {isFormOpen && (
        <TransactionForm
          onClose={() => setIsFormOpen(false)}
          onTransactionAdded={handleTransactionAdded}
        />
      )}
    </div>
  );
};

export default Index;
