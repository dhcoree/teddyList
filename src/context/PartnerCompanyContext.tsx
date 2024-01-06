import { useEffect, useState } from 'react';
import { fetchPartnersData } from '../services/api';

const CompanyContext = () => {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        const getPartnersData = async () => {
            try {
                const data = await fetchPartnersData();
                setPartners(data);
            } catch (error) {
                console.error('erro ao solicitar');
            }
        };

        getPartnersData();
    }, []);

  // Restante do seu código para utilizar os dados dos parceiros...

    // return (
    //     // Seu componente e renderização utilizando os dados dos parceiros
    // );
};

export default CompanyContext;
