'use client'
import React, { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
      <h4 className="font-semibold text-lg">{question}</h4>
      {isOpen && <p className="mt-2 text-gray-700">{answer}</p>}
    </div>
  );
};

export default FAQItem;