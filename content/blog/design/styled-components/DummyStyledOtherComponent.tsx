import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const OtherComponent = ({ style }) => {
  return (
    <View style={{ backgroundColor: 'blue', ...style }}>
      <Text>Other Component</Text>
    </View>
  );
};

const StyledOtherComponent = styled(OtherComponent)`
  background-color: red;
`;

export default StyledOtherComponent;
