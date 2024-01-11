import React, { useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkedSymbol: {
    fontSize: 14,
    color: '#EB6625',
  },
});

type CheckBoxPropsType = {
  label: string;
  value?: boolean;
  checked: boolean;
  onChange?: (value: boolean) => void;
}

const CheckBox = ({
  label,
  checked,
  onChange = undefined,
  value }: CheckBoxPropsType) => {

  const handleCheck = useCallback(() => {
    onChange?.(!value);
  }, [onChange, value])

  return (
    <TouchableOpacity style={styles.container} onPress={handleCheck}>
      <View style={styles.checkbox}>
        {checked && <Text style={styles.checkedSymbol}>✓</Text>}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default CheckBox;