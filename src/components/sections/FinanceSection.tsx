
import React from "react";
import FinanceTracker from "../FinanceTracker";
import { CreditCard } from "lucide-react";

const FinanceSection: React.FC = () => {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-travel-secondary mb-2 flex items-center">
          <CreditCard className="h-6 w-6 mr-2 text-travel-primary" />
          Finances Tracker
        </h2>
        <p className="text-gray-600">
          Keep track of your travel expenses
        </p>
      </div>
      
      <FinanceTracker />
    </section>
  );
};

export default FinanceSection;
