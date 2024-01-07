import React, { useCallback, useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import { CompanyContext } from '../../context/CompanyContext';
import Spacer from '../../components/Spacer';
import { useAppNavigation } from '../../utils/useAppNavigation';
import Button from '../../components/Button';
import MyTextInput from '../../components/TextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  },
  textStyle: {
    color: '#1A261C'
  },
  textEdit: {color: "#396E9C"},
  textExclude: {color: "#BF7E6F"}
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
  const navigation = useAppNavigation();

  const handleCreate = () => {
    setModalMode('create');
    setModalCompanyName('');
    setIsModalVisible(true);
  };

  const handleEdit = (companyId: string, companyName: string) => {
    setSelectedCompanyId(companyId);
    setModalMode('edit');
    setModalCompanyName(companyName);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      addCompany({
        id: String(Date.now()), // Você pode usar um ID único aqui, dependendo do seu backend
        companyName: modalCompanyName,
        collaboratorsCount: 0, // Defina o valor padrão
        isActive: true, // Defina o valor padrão
        createdAt: new Date().toISOString(), // Defina a data atual
        lastSubmit: new Date().toISOString(),
      });
    } else if (modalMode === 'edit' && selectedCompanyId) {
      updateCompany({
        id: selectedCompanyId,
        companyName: modalCompanyName,
        collaboratorsCount: 0, // Você pode atualizar este valor se necessário
        isActive: true, // Você pode atualizar este valor se necessário
        createdAt: '', // Você pode atualizar este valor se necessário
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
    // Remove os dados de autenticação do AsyncStorage
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('rememberUser');

    // Navega para a tela de login
    navigation.navigate('Onboarding', {screen: 'Login'});
  } catch (error) {
    console.error('Erro ao fazer logoff:', error);
  }
}

  return (
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleCreate}>
          <Text style={styles.textStyle}>Criar Empresa</Text>
        </TouchableOpacity>

        <Spacer size={10}/>

        <TouchableOpacity onPress={handleLogOff}>
          <Text style={styles.textStyle}>Sair</Text>
        </TouchableOpacity>
        </View>
        

        <FlatList
          data={companies}
          renderItem={({ item }) => (
            <View style={styles.companyItem}>
              <Text style={styles.companyName}>{item.companyName}</Text>
              <Text>Colaboradores: {item.collaboratorsCount}</Text>

              {/* Botão para editar e excluir */}
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleEdit(item.id, item.companyName)}>
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
          )}
          keyExtractor={(item) => item.id}
          style={styles.container}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{paddingVertical: 15}}/>}
        />

        {/* Modal para criar/editar empresa */}
        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalStyle}>
            {/* Condição para exibir texto diferente com base no modalMode */}
            <Text>{modalMode === 'edit' ? 
              'Altere o nome da empresa abaixo:' : 
              'Digite o nome da empresa abaixo:'}
            </Text>
            <Spacer size={12}/>
            <MyTextInput
              placeholder="Nome da Empresa"
              value={modalCompanyName}
              onChangeText={setModalCompanyName}
            />
            <View style={{flexDirection: 'row'}}>
              <Button onPress={handleSave}>Salvar</Button>
              <Button onPress={() => setIsModalVisible(false)}>Cancelar</Button>
            </View>
          </View>
        </Modal>
      </View>
  );
};

export default CompanyListScreen;
