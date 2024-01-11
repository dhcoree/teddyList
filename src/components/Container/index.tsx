import { ReactNode } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

type ContainerPropsType = {
    children: ReactNode;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
})

const Container = ({ children }: ContainerPropsType) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

export default Container;