// import { useCallback} from 'react';
// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import { useAppNavigation } from '../../utils/useAppNavigation';

// const Home = () => {
//   const navigation = useAppNavigation();

//   const goToLogin = useCallback(() => {
//     navigation.navigate("Onboarding", {
//       screen: "Login"
//     })
//   }, [])

//   return (
//     <View style={styles.container}>
//       <Text>Home</Text>
//       <TouchableOpacity onPress={goToLogin}>
//         <Text>Login page</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   }
// })


// Seu componente onde você quer exibir a lista usando FlatList

import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Company, CompanyContext } from '../../context/CompanyContext';

const CompanyListScreen: React.FC = () => {
  const { companies } = useContext(CompanyContext);

  const renderCompanyItem = ({ item }: { item: Company }) => (
    <View style={styles.companyItem}>
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text>Collaborators: {item.collaboratorsCount}</Text>
      {/* Outros dados que você deseja exibir */}
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
  // Adicione estilos adicionais conforme necessário
});

export default CompanyListScreen;
