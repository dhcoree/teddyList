import { useEffect, useState } from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import { useAppNavigation } from '../../utils/useAppNavigation';
import Button from '../../components/Button';
import MyTextInput from '../../components/TextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '../../components/CheckBox';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUser, setRememberUser] = useState(false);
  const navigation = useAppNavigation();

  const handleSignIn = async () => {
    // Lógica de login fake
    if (email === 'teddy@mail.com' && password === '123456') {
      if (rememberUser) {
        // Armazenar dados do usuário no AsyncStorage
        await AsyncStorage.setItem('userToken', 'fake_token');
        await AsyncStorage.setItem('userEmail', email);
      } else {
        // Limpar dados do usuário no AsyncStorage se não quiser lembrar
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userEmail');
      }
      navigation.navigate('Onboarding', { screen: 'Home' });
    } else {
      // Tratar caso as credenciais estejam incorretas
      Alert.alert('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

   // Verificar se o usuário já está logado
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        // Navegar diretamente para a tela inicial se o usuário estiver logado
        navigation.navigate('Onboarding', { screen: 'Home' });
      }
    };

    checkUserLoggedIn();
  }, []);

  // const goToHome = () => {
  //   // navigation.goBack();
  //   navigation.navigate('Onboarding', {
  //     screen: 'Home'
  //   })
  // }

   return (
    <View style={styles.container}>
      <Text>Login</Text>

      <MyTextInput
        placeholder='e-mail'
        value={email}
        onChangeText={setEmail}
      />

      <MyTextInput
        secureTextEntry
        placeholder='senha'
        value={password}
        onChangeText={setPassword}
        maxLength={12}
      />

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={rememberUser}
          onChange={setRememberUser}
          checked={rememberUser}
          label='Lembrar usuário'
        />
      </View>

      <Button onPress={handleSignIn}>Sign in</Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
});