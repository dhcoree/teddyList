import Home from "./Onboarding/Home";
import Login from "./Onboarding/Login";

import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type RootStackParamList = {
    Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
};

export type OnboardingStackParamList = {
    Home: undefined;
    Login: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = () => {
    return (
        <OnboardingStack.Navigator
        screenOptions={{
                headerShown: false
        }}>
            <OnboardingStack.Screen name="Login" component={Login} />
            <OnboardingStack.Screen name="Home" component={Home} />
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