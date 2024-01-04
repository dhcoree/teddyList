import * as React from 'react';
import {StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import { useAppNavigation } from '../../utils/useAppNavigation';

const Home = () => {
  const navigation = useAppNavigation();

  const goBack = () => {
    navigation.goBack();  
  }
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity onPress={goBack}>
        <Text>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
