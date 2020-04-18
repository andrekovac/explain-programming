import React from 'react';
import { Link } from 'gatsby';

import Logo from './logo';
import StyledLink from './styledLink';
import { rhythm, scale } from '../utils/typography';
import './layout.css';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.2),
            marginBottom: rhythm(1),
            marginTop: rhythm(1 / 4),
          }}
        >
          <StyledLink
            to={`/`}
          >
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Logo width={'2.5em'} height={'2.5em'} />
              <div style={{ marginLeft: 10, marginBottom: 20 }}>{title}</div>
            </div>
          </StyledLink>
        </h1>
      );
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <StyledLink
            to={`/`}
          >
            {title}
          </StyledLink>
        </h3>
      );
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(28),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          {new Date().getFullYear()}, Built by
          {` `}
          <a
            href="https://www.andrekovac.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            André Kovac
          </a>
          <span> • </span>
          <Link to={'/about'}>
            About
          </Link>
          <span> • </span>
          <Link to={'/imprint'}>
            Imprint
          </Link>
          <span> • </span>
          <Link to={'/privacy-policy'}>
            Privacy Policy
          </Link>
        </footer>
      </div>
    );
  }
}

export default Layout;
