import React, { createContext, useEffect, useState } from 'react';
import { fetchCompanies } from '../services/api';

export type Company = {
  createdAt: string;
  companyName: string;
  collaboratorsCount: string;
  isActive: boolean;
  lastSubmit: string;
  id: string;
}

type CompanyContextType = {
  companies: Company[];
  addCompany: (newCompany: Company) => void;
  updateCompany: (updatedCompany: Company) => void;
  deleteCompany: (companyId: string) => void;
}

export const CompanyContext = createContext<CompanyContextType>({
  companies: [],
  addCompany: () => { },
  updateCompany: () => { },
  deleteCompany: () => { },
});

//@ts-ignore
export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const data: Company[] = await fetchCompanies();
        setCompanies(data);
      } catch (error) {
      }
    };

    getCompanies();
  }, []);

  const addCompany = (newCompany: Company) => {
    setCompanies(prevCompanies => [...prevCompanies, newCompany]);
  };

  const updateCompany = (updatedCompany: Company) => {
    const updatedCompanies = companies.map((item) =>
      item.id === updatedCompany.id ? updatedCompany : item
    );
    setCompanies(updatedCompanies);
  };

  const deleteCompany = (companyId: string) => {
    const updatedCompanies = companies.filter((item) => item.id !== companyId);
    setCompanies(updatedCompanies);
  };

  return (
    <CompanyContext.Provider value={{ companies, addCompany, updateCompany, deleteCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};
