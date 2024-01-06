import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { fetchPartnersData } from '../../services/api';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    partnerItem: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
    },
    partnerName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

const CompanyContext = () => {
    const [partners, setPartners] = useState<any[]>([]);

    useEffect(() => {
        const getPartnersData = async () => {
            try {
                const data = await fetchPartnersData();
                setPartners(data);
            } catch (error) {
                console.error('Erro ao solicitar os parceiros:', error);
            }
        };

        getPartnersData();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={partners}
                renderItem={({ item }) => (
                    <View style={styles.partnerItem}>
                        <Text style={styles.partnerName}>{item.name}</Text>
                        <Text>Description: {item.description}</Text>
                        {/* Adicione mais campos conforme necessário */}
                    </View>
                )}
                keyExtractor={(item) => item.id}
                style={styles.container}
                ListFooterComponent={<View style={{ paddingVertical: 15 }} />}
            />
        </View>
    );
};

export default CompanyContext;
