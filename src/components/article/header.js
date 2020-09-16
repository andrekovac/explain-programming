import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@chakra-ui/core';

import { rhythm } from '../../style/typography';
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
        <Flex align="center">
          <Flex
            align="center"
            backgroundColor={theme.colors.gray[100]}
            mr="5"
            p="1"
            borderRadius={theme.radii.md}
          >
            <span>{mapCategoryToShortHand[category]}</span>
            <span
              style={{
                fontSize: rhythm(0.5),
                marginLeft: rhythm(1 / 4),
              }}
            >
              {mapCategoryToWord[category]}
            </span>
          </Flex>
          <Tags tags={tags} />
        </Flex>
      </Box>
    </header>
  );
};

const Title = styled.h1`
  margin-bottom: ${theme.space[6]};
  margin-top: ${theme.space[8]};
`;

export default Header;
