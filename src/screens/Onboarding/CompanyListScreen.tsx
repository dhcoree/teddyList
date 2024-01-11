import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import { CompanyContext } from '../../context/CompanyContext';
import Spacer from '../../components/Spacer';
import { useAppNavigation } from '../../utils/useAppNavigation';
import Button from '../../components/Button';
import MyTextInput from '../../components/TextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../../components/Container';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  companyItem: {
    marginBottom: 8,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EB6625'
  },
  modalStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 28
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    marginHorizontal: 16,
  },
  textEdit: { color: "#396E9C" },
  textExclude: { color: "#BF7E6F" },
  colorText: { color: "#1A261C" },
  textHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchStyle: { paddingHorizontal: 16 },
  listFooterStyle: { paddingVertical: 70 },
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

const CompanyListScreen: React.FC = () => {
  const {
    companies,
    addCompany,
    updateCompany,
    deleteCompany } = useContext(CompanyContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | ''>('');
  const [modalCompanyName, setModalCompanyName] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [modalCollaboratorsCount, setModalCollaboratorsCount] = useState('');
  const navigation = useAppNavigation();

  const [searchText, setSearchText] = useState('');

  const filteredPartners = companies.filter(
    (companies) =>
      companies.companyName.toLowerCase().includes(searchText.toLowerCase())
  );

  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState<any>(null);

  const handleShowDetails = (companyDetails: any) => {
    setSelectedCompanyDetails(companyDetails);
    setIsDetailsModalVisible(true);
  };

  const handleCreate = () => {
    setModalMode('create');
    setModalCompanyName('');
    setModalCollaboratorsCount('');
    setIsModalVisible(true);
  };

  const handleEdit = (
    companyId: string,
    companyName: string,
    collaboratorsCount: string
  ) => {
    setSelectedCompanyId(companyId);
    setModalMode('edit');
    setModalCompanyName(companyName);
    setModalCollaboratorsCount(collaboratorsCount)
    setIsModalVisible(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      addCompany({
        id: String(Date.now()),
        companyName: modalCompanyName,
        collaboratorsCount: modalCollaboratorsCount,
        isActive: true,
        createdAt: new Date().toISOString(),
        lastSubmit: new Date().toISOString(),
      });
    } else if (modalMode === 'edit' && selectedCompanyId) {
      updateCompany({
        id: selectedCompanyId,
        companyName: modalCompanyName,
        collaboratorsCount: modalCollaboratorsCount,
        isActive: true,
        createdAt: '',
        lastSubmit: new Date().toISOString(),
      });
    }
    setIsModalVisible(false);
  };

  const handleDelete = (companyId: string) => {
    Alert.alert(
      'Remover empresa',
      'Tem certeza que deseja excluir esta empresa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            deleteCompany(companyId);
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

  const renderModalDetails = () => {
    return (
      <Modal visible={isDetailsModalVisible} animationType="slide">
        <View style={styles.modalStyle}>
          {selectedCompanyDetails && (
            <>
              <Text style={styles.titleModalDetails}>Detalhes da empresa {selectedCompanyDetails.companyName}</Text>

              <Spacer size={12} />

              <Text style={styles.textModalDetails}>Nome: {selectedCompanyDetails.companyName}</Text>

              <Spacer size={12} />

              <Text style={styles.textModalDetails}>Colaboradores: {selectedCompanyDetails.collaboratorsCount}</Text>

              <Spacer size={12} />

              <Text style={styles.textModalDetails}>Data de Criação: {selectedCompanyDetails.createdAt}</Text>

              <Spacer size={12} />

              <Button onPress={() => setIsDetailsModalVisible(false)}>Fechar</Button>
            </>
          )}
        </View>
      </Modal>
    );
  };

  const renderModalEditOrCreate = () => {

    return (
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalStyle}>
          <Text>{modalMode === 'edit' ?
            'Altere o nome da empresa abaixo:' :
            'Digite o nome da empresa abaixo:'}
          </Text>
          <Spacer size={12} />
          <MyTextInput
            placeholder="Nome da Empresa"
            value={modalCompanyName}
            onChangeText={setModalCompanyName}
          />
          <MyTextInput
            placeholder="Quantidade colaboradores"
            keyboardType="numeric"
            value={String(modalCollaboratorsCount)}
            onChangeText={setModalCollaboratorsCount}
          />
          <View style={{ flexDirection: 'row' }}>
            <Button onPress={handleSave}>Salvar</Button>
            <Button onPress={() => setIsModalVisible(false)}>Cancelar</Button>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <Container>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={handleCreate}>
          <View style={styles.textHeader}>
            <Icon name='office-building-cog-outline' size={16} />
            <Spacer size={4} />
            <Text style={styles.colorText}>Criar Empresa</Text>
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
              placeholder="Buscar empresa externa"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleShowDetails(item)}>
            <View style={styles.companyItem}>
              <Text style={styles.companyName}>{item.companyName}</Text>
              <Text>Colaboradores: {item.collaboratorsCount}</Text>

              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() =>
                  handleEdit(item.id, item.companyName, item.collaboratorsCount)}>
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

      {renderModalEditOrCreate()}

      {renderModalDetails()}
    </Container>
  );
};

export default CompanyListScreen;
