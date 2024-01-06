import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Button as RNButton, Alert, SafeAreaView } from 'react-native';
import { Company, CompanyContext } from '../../context/CompanyContext';
import Spacer from '../../components/Spacer';
import { useAppNavigation } from '../../utils/useAppNavigation';

// Estilos e outras partes do seu código...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  companyItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
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

  const goToPartnerCompany = () => {
    navigation.navigate('Onboarding', {screen: 'PartnerListScreen'})
  }

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

  return (
      <View style={styles.container}>
        {/* Botão para criar e editar */}
        <TouchableOpacity onPress={handleCreate}>
          <Text>Criar Empresa</Text>
        </TouchableOpacity>

        <Spacer size={10}/>

        <TouchableOpacity onPress={goToPartnerCompany}>
          <Text>Ir para Partner</Text>
        </TouchableOpacity>

        <FlatList
          data={companies}
          renderItem={({ item }) => (
            <View style={styles.companyItem}>
              <Text style={styles.companyName}>{item.companyName}</Text>
              <Text>Colaboradores: {item.collaboratorsCount}</Text>

              {/* Botão para editar e excluir */}
              <TouchableOpacity onPress={() => handleEdit(item.id, item.companyName)}>
                <Text>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.container}
          ListFooterComponent={<View style={{paddingVertical: 15}}/>}
        />

        {/* Modal para criar/editar empresa */}
        <Modal visible={isModalVisible} animationType="slide">
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              placeholder="Nome da Empresa"
              value={modalCompanyName}
              onChangeText={setModalCompanyName}
            />
            <RNButton title="Salvar" onPress={handleSave} />
            <RNButton title="Cancelar" onPress={() => setIsModalVisible(false)} />
          </View>
        </Modal>
      </View>
  );
};

export default CompanyListScreen;
