import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../screens/Navigation";

export const useAppNavigation = () => {
    return useNavigation<NavigationProp<RootStackParamList>>();
};