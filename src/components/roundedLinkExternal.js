import React from 'react';
import styled from 'styled-components';

import theme from '../style/theme';

const RoundedLinkExternal = ({ message, href, hasBorder }) => (
  <Anchor
    className="external"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    hasBorder={hasBorder}
  >
    {message}
  </Anchor>
);

const Anchor = styled.a`
  background-color: #edf2f7;
  padding: 0.25rem;
  border-radius: 0.25rem;
  background: ${(props) =>
    props.hasBorder
      ? 'linear-gradient(transparent 80%, white 0)'
      : 'linear-gradient(transparent 80%, #cb8182 0)'};
  color: ${(props) => (props.hasBorder ? theme.colors.white : 'inherit')};

  transition: all 0.2s;
`;

export default RoundedLinkExternal;
