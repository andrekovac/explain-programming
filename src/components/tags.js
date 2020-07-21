import React from 'react';
import styled from 'styled-components';

import { rhythm } from '../utils/typography';
import { OUTDATED, BASIC, STUB, COPY_PASTE_NOTES } from '../constants/Tag';

const Tags = (props) => (
  <span style={{ verticalAlign: 'text-bottom' }}>
    {props.tags.map((tag, index) => {
      let backgroundColor = '';
      switch (tag) {
        case OUTDATED:
          backgroundColor = '#bf4040';
          break;
        case BASIC:
          backgroundColor = 'green';
          break;
        case STUB:
          backgroundColor = '#e4b464';
          break;
        case COPY_PASTE_NOTES:
          backgroundColor = '#7f5ae7';
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
  </span>
);

const Tag = styled.span`
  padding: ${rhythm(1 / 6)};
  margin-right: ${rhythm(1 / 4)};
  border-radius: 5px;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  background-color: ${props => props.backgroundColor};

  &:hover {
    opacity: 0.9;
  }
`;

export default Tags;
