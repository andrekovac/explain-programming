import React from 'react'
import { Link } from 'gatsby'

import Logo from './logo';
import { rhythm, scale } from '../utils/typography'
import './layout.css'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.2),
            marginBottom: rhythm(1),
            marginTop: rhythm(1 / 4),
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
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
              <div style={{ marginLeft: 10 }}>{title}</div>
            </div>
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
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
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          {/* TODO: Add impressum and privacy policy */}©{' '}
          {new Date().getFullYear()}, Built by
          {` `}
          <a href="https://www.andrekovac.com">André Kovac</a>
        </footer>
      </div>
    )
  }
}

export default Layout
