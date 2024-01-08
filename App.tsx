import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RootNavigator } from './src/screens/Navigation';
import { CompanyProvider } from './src/context/CompanyContext';

const App = () => {
  return (
    <CompanyProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer> 
    </CompanyProvider>
  );
}

export default App;