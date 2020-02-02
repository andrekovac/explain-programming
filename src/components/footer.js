/**
 * Footer component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import { rhythm } from '../utils/typography';
import Bio from './bio';

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
    <footer
    >
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
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `#9C590B`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
      <Bio />
    </footer>
  );
};

export default Footer;
