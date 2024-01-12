import CompanyListScreen from "./Onboarding/CompanyListScreen";
import LoginScreen from "./Onboarding/LoginScreen";
import PartnerListScreen from "./Onboarding/PartnerCompanyListScreen";

import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AboutScreen from "./Onboarding/AboutScreen";

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
    AboutScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
    return (
        <MainTab.Navigator
            initialRouteName="PartnerListScreen"
            screenOptions={{
                tabBarActiveTintColor: '#EB6625',
                tabBarStyle: {
                    backgroundColor: 'white',
                    margin: 45,
                    position: 'absolute',
                    justifyContent: 'space-between',
                    paddingVertical: 4,
                    borderRadius: 18,
                    paddingBottom: 4,
                    paddingRight: 6,
                },
            }}
        >
            <MainTab.Screen
                name="PartnerListScreen"
                component={PartnerListScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Parceiros',
                    tabBarIcon: ({ color, focused }) => (
                        <Icon
                            name="account-group-outline"
                            size={24}
                            color={focused ? '#EB6625' : color}
                        />
                    ),
                }}
            />

            <MainTab.Screen
                name="CompanyListScreen"
                component={CompanyListScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Empresas externas',
                    tabBarIcon: ({ color, focused }) => (
                        <Icon
                            name="office-building-outline"
                            size={24}
                            color={focused ? '#EB6625' : color}
                        />
                    ),
                }}
            />

            <MainTab.Screen
                name="AboutScreen"
                component={AboutScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Sobre o Projeto',
                    tabBarIcon: ({ color, focused }) => (
                        <Icon
                            name="information-outline"
                            size={24}
                            color={focused ? '#EB6625' : color}
                        />
                    ),
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
