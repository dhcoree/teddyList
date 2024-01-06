import React, { createContext, useEffect, useState } from 'react';
import { fetchCompanies } from '../services/api';

export type Company = {
  createdAt: string;
  companyName: string;
  collaboratorsCount: number;
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
  addCompany: () => {},
  updateCompany: () => {},
  deleteCompany: () => {},
});

//@ts-ignore
export const CompanyProvider  = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const data: Company[] = await fetchCompanies();
        setCompanies(data);
      } catch (error) {
        // Tratar erros caso ocorra algum problema na requisição
      }
    };

    getCompanies();
  }, []);

  const addCompany = (newCompany: Company) => {
    setCompanies(prevCompanies => [...prevCompanies, newCompany]);
    // Lógica para salvar no backend ou AsyncStorage, se necessário
  };

  const updateCompany = (updatedCompany: Company) => {
    const updatedCompanies = companies.map((item) =>
      item.id === updatedCompany.id ? updatedCompany : item
    );
    setCompanies(updatedCompanies);
    // Lógica para atualizar no backend ou AsyncStorage, se necessário
  };

  const deleteCompany = (companyId: string) => {
    const updatedCompanies = companies.filter((item) => item.id !== companyId);
    setCompanies(updatedCompanies);
    // Lógica para excluir no backend ou AsyncStorage, se necessário
  };

  return (
    <CompanyContext.Provider value={{ companies, addCompany, updateCompany, deleteCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};
