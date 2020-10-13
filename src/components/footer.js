/**
 * Footer component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import { rhythm } from '../style/typography';
import theme from '../style/theme';
import Bio from './bio';

/**
 * Footer on blog pages
 */
const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author
          title
        }
      }
    }
  `);

  const { title } = data.site.siteMetadata;
  return (
    <footer>
      <hr
        style={{
          marginTop: rhythm(1.5),
          marginBottom: rhythm(1 / 2),
          height: 2,
        }}
      />
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          fontStyle: 'normal',
          marginTop: 0,
          marginBottom: rhythm(0.8),
        }}
      >
          {title}
      </h3>
      <Bio />
    </footer>
  );
};

export default Footer;
