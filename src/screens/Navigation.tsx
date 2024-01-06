import CompanyListScreen from "./Onboarding/CompanyListScreen";
import LoginScreen from "./Onboarding/LoginScreen";

import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type RootStackParamList = {
    Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
};

export type OnboardingStackParamList = {
    Login: undefined;
    CompanyListScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = () => {
    return (
        <OnboardingStack.Navigator screenOptions={{
                headerShown: false
        }}>
            <OnboardingStack.Screen 
                name="Login" 
                component={LoginScreen} 
            />
            <OnboardingStack.Screen 
                name="CompanyListScreen" 
                component={CompanyListScreen} 
                // options={{ headerShown: true}}
            />
        </OnboardingStack.Navigator>
    )
};

export const RootNavigator = () => {
    return (
        <RootStack.Navigator
        screenOptions={{
                headerShown: false
        }}>
            <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        </RootStack.Navigator>
    )
}