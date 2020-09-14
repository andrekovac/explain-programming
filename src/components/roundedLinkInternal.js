import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';

import theme from '../style/theme';

const RoundedLinkInternal = ({ children, to }) => (
  <Anchor className="internal" to={to}>
    {children}
  </Anchor>
);

const Anchor = styled(GatsbyLink)`
  padding: 0.25rem;
  border-radius: 0.25rem;
  background: linear-gradient(transparent 100%, #cb8182 0);
  background-color: #edf2f7;
  color: ${theme.colors.brand[500]};

  transition: all 0.2s;

  &:hover {
    background-image: none;
    background: linear-gradient(transparent 80%, white 0);
    background-color: ${theme.colors.brand[500]};
    color: white;
  }
`;

export default RoundedLinkInternal;
