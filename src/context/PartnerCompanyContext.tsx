import React, { createContext, useEffect, useState } from 'react';
import { fetchPartnersData } from '../services/api';

export type Partner = {
    id: string;
    createdAt: string;
    name: string;
    description: string;
    repositoryGit: string;
    urlDoc: string;
    clients: string[];
    projects: (string | number)[];
};

type PartnerContextType = {
    partners: Partner[];
    addPartner: (newPartner: Partner) => void;
    updatePartner: (updatedPartner: Partner) => void;
    deletePartner: (partnerId: string) => void;
};

export const PartnerContext = createContext<PartnerContextType>({
    partners: [],
    addPartner: () => {},
    updatePartner: () => {},
    deletePartner: () => {},
})

//@ts-ignore
export const PartnerProvider = ({ children }) => {
    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        const getPartnerCompanies = async () => {
            try {
                const data: Partner[] = await fetchPartnersData();
                setPartners(data);
            } catch (error) {
                // Tratar erros caso ocorra algum problema na requisição
            }
        }

        getPartnerCompanies();
    }, []);

    const addPartner = (newPartner: Partner) => {
        setPartners(prevPartners => [...prevPartners, newPartner]);
        // Lógica para salvar no backend ou AsyncStorage, se necessário
    };

    const updatePartner = (updatedPartner: Partner) => {
        const updatedPartners = partners.map((item) =>
            item.id === updatedPartner.id ? updatedPartner : item
        );
        setPartners(updatedPartners);
        // Lógica para atualizar no backend ou AsyncStorage, se necessário
    };

    const deletePartner = (partnerId: string) => {
        const updatedPartners = partners.filter((item) => item.id !== partnerId);
        setPartners(updatedPartners);
        // Lógica para excluir no backend ou AsyncStorage, se necessário
    };

    return (
        <PartnerContext.Provider value={{ partners, addPartner, updatePartner, deletePartner }}>
            {children}
        </PartnerContext.Provider>
    );
};
