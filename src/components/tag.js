import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';

import theme from '../style/theme';
import { rhythm } from '../style/typography';

import {
  OUTDATED,
  BASIC,
  STUB,
  COPY_PASTE_NOTES,
  SHOW_ALL,
} from '../constants/Tag';

const Tag = ({ tag, isClickable, onTagSelect, onClick }) => {
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
    case SHOW_ALL:
      backgroundColor = theme.colors.brand[700];
      break;
    default:
      backgroundColor = 'rgb(14, 28, 128)';
  }
  return (
    <StyledTag
      backgroundColor={backgroundColor}
      isClickable={isClickable}
      onClick={(event) => {
        // Prevent parent event (route to article) from being called.
        event.preventDefault();

        if (onClick) {
          onClick(event);
        } else {
          if (onTagSelect) {
            onTagSelect(tag);
          }
        }
      }}
    >
      <small>{tag}</small>
    </StyledTag>
  );
};

const StyledTag = styled.span`
  padding: ${rhythm(1 / 6)} ${rhythm(1 / 3)};
  margin-right: ${rhythm(1 / 4)};
  border-radius: 3rem;
  color: ${(props) => (props.isClickable ? 'black' : 'white')};
  font-size: 0.8rem;
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'inherit')};
  background-color: ${(props) =>
    props.isClickable
      ? lighten(0.6, props.backgroundColor)
      : props.backgroundColor};
  z-index: ${theme.zIndices.docked};

  &:hover {
    color: white;
    background-color: ${(props) => props.backgroundColor};
  }
`;

export default Tag;
