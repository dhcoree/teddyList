import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Company, CompanyContext } from '../../context/CompanyContext';

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
  const { companies } = useContext(CompanyContext);

  const renderCompanyItem = ({ item }: { item: Company }) => (
    <View style={styles.companyItem}>
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text>Collaborators: {item.collaboratorsCount}</Text>
    </View>
  );

  return (
    <FlatList
      data={companies}
      renderItem={renderCompanyItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
    />
  );
};

export default CompanyListScreen;
