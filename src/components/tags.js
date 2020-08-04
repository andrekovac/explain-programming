import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import { Flex, Box, Badge, StarIcon, Image, PseudoBox } from '@chakra-ui/core';

import { rhythm } from '../style/typography';
import { OUTDATED, BASIC, STUB, COPY_PASTE_NOTES } from '../constants/Tag';

const Tags = (props) => (
  <div style={{ verticalAlign: 'text-bottom' }}>
    {props.tags.map((tag, index) => {
      let backgroundColor = '';
      switch (tag) {
        case OUTDATED:
          backgroundColor = '#910707';
          break;
        case BASIC:
          backgroundColor = '#118011';
          break;
        case STUB:
          backgroundColor = '#996000';
          break;
        case COPY_PASTE_NOTES:
          backgroundColor = '#106e79';
          break;
        default:
          backgroundColor = 'rgb(14, 28, 128)';
      }
      return (
        <Tag
          backgroundColor={backgroundColor}
          onClick={() => props.onTagSelect && props.onTagSelect(tag)}
        >
          <small>{tag}</small>
        </Tag>
      );
    })}
  </div>
);

const Tag = styled.span`
  padding: ${rhythm(1 / 6)} ${rhythm(1 / 3)};
  margin-right: ${rhythm(1 / 4)};
  border-radius: 3rem;
  color: black;
  font-size: 0.8rem;
  cursor: pointer;
  background-color: ${(props) => lighten(0.6, props.backgroundColor)};

  &:hover {
    opacity: 0.9;
    color: white;
    background-color: ${(props) => props.backgroundColor};
  }
`;

export default Tags;
