import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchPartnersData } from '../../services/api';
import Spacer from '../../components/Spacer';
import { useAppNavigation } from '../../utils/useAppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Partner, PartnerContext } from '../../context/PartnerCompanyContext';
import Button from '../../components/Button';
import MyTextInput from '../../components/TextInput';
import Container from '../../components/Container';

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
    colorText: { color: "#1A261C" },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    textEdit: { color: "#396E9C" },
    textExclude: { color: "#BF7E6F" },
    modalStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 28
    },
    searchStyle: { paddingHorizontal: 16 },
    listFooterStyle: { paddingVertical: 70 },
    containerDetailsModal: {
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 50,
    },
    text: {
        textAlign: 'justify',
        fontSize: 14,
    },
    textModalDetails: {
        textAlign: 'justify',
        fontSize: 14,
    },
    titleModalDetails: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#1A261C'
    },
});

const PartnerCompanyScreen: React.FC = () => {
    const {
        addPartner,
        updatePartner,
        deletePartner } = useContext(PartnerContext);
    const navigation = useAppNavigation();
    const [partners, setPartners] = useState<Partner[]>([]);
    const [modalMode, setModalMode] = useState<'create' | 'edit' | ''>('');
    const [modalPartnerCompanyName, setModalPartnerCompanyName] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPartnerId, setSelectedPartnerId] = useState('');
    const [modalDescription, setModalDescription] = useState('');

    const [searchText, setSearchText] = useState('');

    const [selectedPartnerDetails, setSelectedPartnerDetails] = useState<Partner | null>(null);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

    const handleShowDetails = (partnerDetails: Partner) => {
        setSelectedPartnerDetails(partnerDetails);
        setIsDetailsModalVisible(true);
    };

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

    const filteredPartners = partners.filter(
        (partner) =>
            partner.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleCreate = useCallback(() => {
        setModalMode('create');
        setModalPartnerCompanyName('');
        setModalDescription('');
        setIsModalVisible(true);
    }, [])

    const handleEdit = useCallback((
        partnerId: string,
        partnerName: string,
        modalDescription: string
    ) => {
        setSelectedPartnerId(partnerId);
        setModalMode('edit');
        setModalPartnerCompanyName(partnerName);
        setModalDescription(modalDescription);
        setIsModalVisible(true);
    }, [])

    const handleSave = useCallback(() => {
        if (modalMode === 'create') {
            addPartner({
                id: String(Date.now()),
                createdAt: new Date().toISOString(),
                name: modalPartnerCompanyName,
                description: modalDescription,
                repositoryGit: '',
                urlDoc: '',
                clients: [],
                projects: []
            })
        } else if (modalMode === 'edit' && selectedPartnerId) {
            updatePartner({
                id: selectedPartnerId,
                createdAt: new Date().toISOString(),
                name: modalPartnerCompanyName,
                description: modalDescription,
                repositoryGit: '',
                urlDoc: '',
                clients: [],
                projects: []
            })
        }
        setIsModalVisible(false)
    }, [])

    const handleDelete = (partnerId: string) => {
        Alert.alert(
            'Remover Parceiro',
            'Tem certeza que deseja excluir esse parceiro?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: () => {
                        deletePartner(partnerId);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleLogOff = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userEmail');
            await AsyncStorage.removeItem('rememberUser');

            navigation.navigate('Onboarding', { screen: 'Login' });
        } catch (error) {
            console.error('Erro ao fazer logoff:', error);
        }
    }

    const renderModalEditOrCreate = () => {
        return (
            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalStyle}>
                    <Text>{modalMode === 'edit' ?
                        'Altere o nome do parceiro abaixo:' :
                        'Digite o nome do parceiro abaixo:'}
                    </Text>

                    <Spacer size={12} />

                    <MyTextInput
                        placeholder="Nome do Parceiro"
                        value={modalPartnerCompanyName}
                        onChangeText={setModalPartnerCompanyName}
                    />

                    <MyTextInput
                        placeholder="Descrição"
                        value={modalDescription}
                        onChangeText={setModalDescription}
                    />

                    <View style={{ flexDirection: 'row' }}>

                        <Button onPress={handleSave}>Salvar</Button>
                        <Button onPress={() => setIsModalVisible(false)}>Cancelar</Button>
                    </View>
                </View>
            </Modal>
        );
    };

    const renderModalDetails = () => {
        return (
            <Modal visible={isDetailsModalVisible} animationType="slide">
                {selectedPartnerDetails && (
                    <Container>
                        <View style={styles.containerDetailsModal}>
                            <Text style={styles.titleModalDetails}>Detalhes do parceiro {selectedPartnerDetails.name}</Text>

                            <Spacer size={12} />

                            <Text style={styles.textModalDetails}>Nome: {selectedPartnerDetails.name} </Text>

                            <Spacer size={12} />

                            <Text style={styles.textModalDetails}>Descrição: {selectedPartnerDetails.description}</Text>

                            <Spacer size={12} />

                            <Text style={styles.textModalDetails}>Data de Criação: {selectedPartnerDetails.createdAt}</Text>

                            <Spacer size={12} />

                            <Button onPress={() => setIsDetailsModalVisible(false)}>Fechar</Button>
                        </View>
                    </Container>
                )}
            </Modal>
        )
    };

    return (
        <Container>
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={handleCreate}>
                    <View style={styles.textHeader}>
                        <Icon name='account-multiple-plus-outline' size={16} />

                        <Spacer size={4} />

                        <Text style={styles.colorText}>Criar Parceiro</Text>
                    </View>
                </TouchableOpacity>

                <Spacer size={10} />

                <TouchableOpacity onPress={handleLogOff}>
                    <View style={styles.textHeader}>
                        <Text style={styles.colorText}>Sair</Text>
                        <Spacer size={4} />
                        <Icon name='exit-to-app' size={16} />
                    </View>
                </TouchableOpacity>

            </View>

            <FlatList
                data={filteredPartners}
                ListHeaderComponent={
                    <View style={styles.searchStyle}>
                        <MyTextInput
                            placeholder="Buscar parceiro por nome"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleShowDetails(item)}>
                        <View style={styles.partnerItem}>
                            <Text style={styles.partnerName}>{item.name}</Text>
                            <Text numberOfLines={3}>Descrição: {item.description}</Text>

                            <View style={styles.actionButtons}>
                                <TouchableOpacity onPress={() =>
                                    handleEdit(item.id, item.name, item.description)}>
                                    <Text style={styles.textEdit}>Editar</Text>
                                </TouchableOpacity>

                                <Spacer size={4} />
                                <Text>|</Text>
                                <Spacer size={4} />

                                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                    <Text style={styles.textExclude}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                style={styles.container}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={styles.listFooterStyle} />}
            />

            {renderModalDetails()}

            {renderModalEditOrCreate()}
        </Container>
    );
};

export default PartnerCompanyScreen;
