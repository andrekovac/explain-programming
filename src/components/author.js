import React from 'react';

import { rhythm } from '../utils/typography';
import { mapNameToInitials } from '../constants/Author';

const Author = ({ name }) => (
  <span
    style={{
      marginLeft: 10,
      fontStyle: 'italic',
      fontWeight: 'bold',
      marginRight: rhythm(1 / 2),
    }}
  >
    {mapNameToInitials[name]}
  </span>
);

export default Author;
