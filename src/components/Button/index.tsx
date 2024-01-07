import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EB6625',
        paddingHorizontal: 46,
        marginHorizontal: 16,
        borderRadius: 8,
        height: 40,
    }
});

interface ButtonProps extends TouchableOpacityProps {
    children: ReactNode;
    onPress: TouchableOpacityProps['onPress'];
}

const Button = ({
    children, 
    onPress, 
    ...rest
}: ButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button} {...rest}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
}

export default Button;