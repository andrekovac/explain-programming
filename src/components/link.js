import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Text, Link as ChakraLink } from '@chakra-ui/core';
import styled from 'styled-components';

import theme from '../style/theme';

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = ({
  children,
  to,
  activeClassName,
  partiallyActive,
  isText,
  ...other
}) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to);
  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <EmptyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        isText={isText}
        {...other}
      >
        {children}
      </EmptyLink>
    );
  }
  return isText ? (
    <TextLink href={to} target="_blank" rel="noopener noreferrer" {...other}>
      {children}
    </TextLink>
  ) : (
    <DefaultLink href={to} target="_blank" rel="noopener noreferrer" {...other}>
      {children}
    </DefaultLink>
  );
};

const DefaultLink = styled(ChakraLink)`
  background: none;
`;

const TextLink = styled(ChakraLink)`
  color: ${theme.colors.white};
  background: linear-gradient(transparent 80%, white 0);
  text-decoration: none;

  &:hover {
    color: ${theme.colors.brand[500]};
    background: linear-gradient(transparent 0, white 5%);
  }
`;

const EmptyLink = styled(GatsbyLink)`
  color: ${theme.colors.white};
  background: ${(props) =>
    props.isText ? 'linear-gradient(transparent 80%, white 0)' : 'none'};
  text-decoration: none;

  &:hover {
    background: ${(props) =>
      props.isText ? 'linear-gradient(transparent 0, white 5%)' : 'none'};
    color: ${(props) => (props.isText ? theme.colors.brand[500] : 'inherit')};
  }
`;

export default Link;
