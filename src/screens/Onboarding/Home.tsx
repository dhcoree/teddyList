import { useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useAppNavigation } from '../../utils/useAppNavigation';

const Home = () => {
  const navigation = useAppNavigation();

  const goToLogin = useCallback(() => {
    navigation.navigate("Onboarding", {
      screen: "Login"
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity onPress={goToLogin}>
        <Text>Login page</Text>
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
