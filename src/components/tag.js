import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';

import theme from '../style/theme';
import { rhythm } from '../style/typography';

import {
  OUTDATED,
  BASIC,
  STUB,
  LIST,
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
    case LIST:
      backgroundColor = '#fbec1f';
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

  const handleClick = (event) => {
    // Prevent parent event (route to article) from being called.
    event.preventDefault();

    if (onClick) {
      onClick(event);
    } else {
      if (onTagSelect) {
        onTagSelect(tag);
      }
    }
  };

  return (
    <StyledTag
      backgroundColor={backgroundColor}
      isClickable={isClickable}
      onClick={handleClick}
    >
      {tag}
    </StyledTag>
  );
};

const StyledTag = styled.div`
  padding: 1px 10px;
  border-radius: 15px;
  color: ${(props) => (props.isClickable ? 'black' : 'white')};
  font-size: ${theme.fontSizes.xs};
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'inherit')};
  background-color: ${(props) =>
    props.isClickable
      ? lighten(0.6, props.backgroundColor)
      : props.backgroundColor};
  z-index: ${theme.zIndices.docked};

  margin: 3px ${rhythm(1 / 4)} 3px 0;

  &:hover {
    color: white;
    background-color: ${(props) => props.backgroundColor};
  }
`;

export default Tag;
