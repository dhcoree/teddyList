import react, { createContext, useEffect, useState } from 'react';
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
};

export const CompanyContext = createContext<CompanyContextType>({
  companies: [],
});

//@ts-ignore
export const CompanyProvider: React.FC = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
      } catch (error) {
        // Tratar erros caso ocorra algum problema na requisição
      }
    };

    getCompanies();
  }, []);

  return (
    <CompanyContext.Provider value={{ companies }}>
      {children}
    </CompanyContext.Provider>
  );
};