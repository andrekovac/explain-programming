import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import { Flex, Box, Badge, Image, PseudoBox, Text } from '@chakra-ui/core';

import GlobalStyle from '../style/globalStyles';
import Logo from './logo';
import Header from './header';
import Footer from './footerMain';

import { rhythm, scale } from '../style/typography';

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
          <Link className="main" to={`/`}>
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
          </Link>
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
          <Link className="main" to={`/`}>
            {title}
          </Link>
        </h3>
      );
    }
    return (
      <Fragment>
        <GlobalStyle />
        <Box>
          <Header />
          <Flex justify="center">
            <Box
              maxW="2xl"
              py="1.5rem"
              // style={{
              //   marginLeft: `auto`,
              //   marginRight: `auto`,
              //   maxWidth: rhythm(28),
              //   padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
              // }}
            >
              {/* <header>{header}</header> */}
              {children}
            </Box>
          </Flex>
          <Footer />
        </Box>
      </Fragment>
    );
  }
}

export default Layout;
