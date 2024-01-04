import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RootNavigator } from './src/screens/Navigation';

const App = () => {
  return ( 
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer> 
  );
}
 
export default App;