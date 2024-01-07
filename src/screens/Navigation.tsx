import CompanyListScreen from "./Onboarding/CompanyListScreen";
import LoginScreen from "./Onboarding/LoginScreen";
import PartnerListScreen from "./Onboarding/PartnerCompanyListScreen";

import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
    Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
};

export type OnboardingStackParamList = {
    Login: undefined;
    Main: undefined;
};

export type MainTabParamList = {
    CompanyListScreen: undefined;
    PartnerListScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
    return (
        <MainTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#EB6625', // Cor laranja para a aba selecionada
                tabBarStyle: {
                backgroundColor: 'white', // Cor de fundo da barra de navegação
            },
        }}
    >       
            <MainTab.Screen 
                name="PartnerListScreen" 
                component={PartnerListScreen} 
                options={{
                    headerShown: false, 
                    tabBarLabel: 'Parceiros',
                }} 
            />
            
            <MainTab.Screen 
                name="CompanyListScreen" 
                component={CompanyListScreen}
                options={{
                    headerShown: false, 
                    tabBarLabel: 'Empresas externas'
                }}
            />
            
        </MainTab.Navigator>
    );
};

const OnboardingNavigator = () => {
    return (
        <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
            <OnboardingStack.Screen name="Login" component={LoginScreen} />
            <OnboardingStack.Screen name="Main" component={MainTabNavigator} />
        </OnboardingStack.Navigator>
    );
};

export const RootNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        </RootStack.Navigator>
    );
};
