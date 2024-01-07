import { useEffect, useState } from 'react';
import {Alert, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import { useAppNavigation } from '../../utils/useAppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyTextInput from '../../components/TextInput';
import CheckBox from '../../components/CheckBox';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
//@ts-ignore
import teddylogo from '../../assets/teddylogo.png'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
  inputContainer: {
    width: 300,
    marginHorizontal: 32
  },
  logo: {
    width: 120,
    height: 120
  }
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUser, setRememberUser] = useState(false);
  const navigation = useAppNavigation();

  //TODO: login fake com uso de asyncStorage para lembrar usuário logado
  const handleSignIn = async () => {
  // Lógica de login fake
  if (email === 'teddy@mail.com' && password === '1234') {
    if (rememberUser) {
      // Armazenar dados do usuário no AsyncStorage
      await AsyncStorage.setItem('userToken', 'fake_token');
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('rememberUser', 'true');
    } else {
      // Limpar dados do usuário no AsyncStorage se não quiser lembrar
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('rememberUser');
    }
    navigation.navigate('Onboarding', { screen: 'Main' });
  } else {
    Alert.alert('Credenciais inválidas. Por favor, tente novamente.');
  }
};

   // Verifica se o usuário já está logado
  useEffect(() => {
  const checkUserLoggedIn = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const userEmail = await AsyncStorage.getItem('userEmail');
    const rememberUser = await AsyncStorage.getItem('rememberUser');

    if (userToken && userEmail && rememberUser === 'true') {
      // Navegar para a tela inicial se o usuário estiver logado e 'rememberUser' estiver marcado
      navigation.navigate('Onboarding', { screen: 'Main' });
    }
  };

  checkUserLoggedIn();
}, [navigation])

  return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode='contain'
          source={teddylogo}
        />

        <Spacer size={12}/>

        <View style={styles.inputContainer}>
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

          <View style={styles.checkbox}>
            <CheckBox
              value={rememberUser}
              onChange={setRememberUser}
              checked={rememberUser}
              label='Lembrar usuário'
            />
          </View>
        </View>

        <Spacer size={18}/>

        <Button onPress={handleSignIn}>Entrar</Button>
      </View>
  );
};

export default LoginScreen;