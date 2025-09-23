import { createContext, useState, useEffect } from "react";

export const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState(() => {
    const stored = localStorage.getItem("leads");
    return stored
      ? JSON.parse(stored)
      : { new: [], proposition: [], qualified: [], won: [] };
  });

  useEffect(() => {
    localStorage.setItem("leads", JSON.stringify(leads));
  }, [leads]);

  const addLead = (col, data) => {
    setLeads((prev) => ({
      ...prev,
      [col]: [...prev[col], data],
    }));
  };

  // 👇 add this function
  const deleteLead = (col, index) => {
    setLeads((prev) => ({
      ...prev,
      [col]: prev[col].filter((_, i) => i !== index),
    }));
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, deleteLead }}>
      {children}
    </LeadContext.Provider>
  );
};
