import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const Dummy = () => {
  return (
    <Container rounded>
      <Text>Hello World</Text>
    </Container>
  );
};

type ContainerProps = { rounded: boolean };

const Container = styled.View<ContainerProps>`
  border: 1px solid black;
  border-radius: ${props => (props.rounded ? '10px' : 0)};
`;

export default Dummy;
