import { createContext, useState, useEffect } from "react";

export const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState(() => {
    const stored = localStorage.getItem("leads");
    return stored
      ? JSON.parse(stored)
      : { new: [], proposition: [], qualified: [], won: [], Lost:[] };
  });

  useEffect(() => {
    localStorage.setItem("leads", JSON.stringify(leads));
  }, [leads]);

 const addLead = (targetCol, newLead, sourceCol = null, index = null) => {
  setLeads((prev) => {
    const updated = { ...prev };

    // If moved from another column, remove it from there
    if (sourceCol && index !== null) {
      updated[sourceCol] = updated[sourceCol].filter((_, i) => i !== Number(index));
    }

    // Add to target column
    updated[targetCol] = [...(updated[targetCol] || []), newLead];
    return updated;
  });
};

  const deleteLead = (col, index) => {
    setLeads((prev) => ({
      ...prev,
      [col]: prev[col].filter((_, i) => i !== index),
    }));
  };

  const addStage = (colName) => {
    setLeads((prev) => ({
      ...prev,
      [colName]: prev[colName] || [],  // ✅ initialize empty column
    }));
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, deleteLead, addStage }}>
      {children}
    </LeadContext.Provider>
  );
};
