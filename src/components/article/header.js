import React from 'react';
import styled from 'styled-components';
import { Box, Heading, Flex, Text, Button, PseudoBox } from '@chakra-ui/core';

import { rhythm, scale } from '../../style/typography';
import theme from '../../style/theme';

import {
  mapCategoryToColor,
  mapCategoryToShortHand,
  mapCategoryToWord,
} from '../../constants/Category';

import Tags from '../tags';

const Header = ({ category, title, tags }) => {
  return (
    <header>
      <Box mb="5">
        <Title>{title}</Title>
        <Flex>
          <Box mr="5">
            <span>{mapCategoryToShortHand[category]}</span>
            <span
              style={{
                fontSize: rhythm(0.5),
                marginLeft: rhythm(1 / 4),
              }}
            >
              {mapCategoryToWord[category]}
            </span>
          </Box>
          <Tags tags={tags} />
        </Flex>
      </Box>
    </header>
  );
};

const Title = styled.h1`
  margin-bottom: ${theme.sizes[5]};
  margin-top: ${theme.sizes[1]};
`;

const ColorBar = styled.span`
  border-left: 10px solid ${(props) => mapCategoryToColor[props.category]};
  margin-right: 10px;
`;

export default Header;
