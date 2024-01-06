import React, { useMemo } from 'react';
import { Text, ViewStyle } from 'react-native';

type SpacerPropsType = {
  size: ViewStyle['height'];
};

const Spacer: React.FC<SpacerPropsType> = ({ size }) => {
  const textStyle = useMemo(() => ({
    height: size,
    width: size,
  }), [size]);

  return (
    <Text
      style={textStyle}
    />
  );
};

export default Spacer;