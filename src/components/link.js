import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';
import theme from '../style/theme';

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {
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
        {...other}
      >
        {children}
      </EmptyLink>
    );
  }
  return (
    <DefaultLink href={to} {...other}>
      {children}
    </DefaultLink>
  );
};

const DefaultLink = styled.a`
  color: ${theme.colors.gray[900]};
  background: linear-gradient(transparent 80%, #dbe4ff 0);
`;

const EmptyLink = styled(GatsbyLink)`
  /* background: linear-gradient(transparent 70%, #dbe4ff 0); */
`;

export default Link;
