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
      //
    }
    return (
      <Flex direction="column" minHeight="100vh">
        <GlobalStyle />
        <Header location={location} />
        <Flex justify="center" flexGrow="1">
          <Box maxW="2xl" py="1rem">
            {children}
          </Box>
        </Flex>
        <Footer />
      </Flex>
    );
  }
}

export default Layout;
