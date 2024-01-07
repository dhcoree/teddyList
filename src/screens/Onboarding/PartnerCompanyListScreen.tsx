import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchPartnersData } from '../../services/api';
import Spacer from '../../components/Spacer';
import { useAppNavigation } from '../../utils/useAppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    partnerItem: {
        marginBottom: 8,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    partnerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#EB6625'
    },
    headerContent: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingBottom: 8,
        marginHorizontal: 16
    },
    textHeader: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    colorText: {color: "#1A261C"},
});

const PartnerCompanyScreen: React.FC = () => {
    const [partners, setPartners] = useState<any[]>([]);
    const navigation = useAppNavigation();
    const [modalMode, setModalMode] = useState<'create' | 'edit' | ''>('');
    const [modalPartnerCompanyName, setModalPartnerCompanyName] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    const handleCreate = () => {
        setModalMode('create');
        setModalPartnerCompanyName('');
        setIsModalVisible(true);
    };

    const handleLogOff = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('rememberUser');

        navigation.navigate('Onboarding', {screen: 'Login'});
    } catch (error) {
        console.error('Erro ao fazer logoff:', error);
    }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={handleCreate}>
                    
                    <View style={styles.textHeader}>
                        <Icon name='account-multiple-plus-outline' size={16}/>
                        <Spacer size={4} />
                        <Text style={styles.colorText}>Criar Parceiro</Text>
                    </View>
                </TouchableOpacity>

                <Spacer size={10}/>

                <TouchableOpacity onPress={handleLogOff}>
                    <View style={styles.textHeader}>
                        <Text style={styles.colorText}>Sair</Text>
                        <Spacer size={4} />
                        <Icon name='exit-to-app' size={16}/>
                    </View>
                </TouchableOpacity>
                
            </View>

            <FlatList
                data={partners}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.partnerItem}>
                        <Text style={styles.partnerName}>{item.name}</Text>
                        <Text numberOfLines={3}>Descrição: {item.description}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                style={styles.container}
                ListFooterComponent={<View style={{ paddingVertical: 70 }} />}
            />
            
        </View>
    );
};

export default PartnerCompanyScreen;
