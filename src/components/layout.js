import React from 'react';
import { Flex, Box } from '@chakra-ui/core';
import CookieConsent from 'react-cookie-consent';

import GlobalStyles from '../style/globalStyles';
import Header from './header';
import Footer from './footerMain';

const Layout = (props) => {
  const { location, title, children, hideNewsletter } = props;
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  // if (location.pathname === rootPath) {
  //   //
  // }
  return (
    <Flex direction="column" minHeight="100vh">
      <GlobalStyles />
      <Header location={location} />
      <Flex justify="center" flexGrow="1" mb="5">
        <Box maxW="2xl" py="1rem" px={props.noPadding ? '0' : '1.5rem'}>
          {children}
        </Box>
      </Flex>
      <Footer hideNewsletter={hideNewsletter} />
      <CookieConsent
        location="bottom"
        buttonText="Accept 👍"
        enableDeclineButton={true}
        declineButtonText="Reject 😕"
        cookieName="gatsby-gdpr-google-analytics"
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '0.9rem' }}
        declineButtonStyle={{
          color: '#f77',
          backgroundColor: 'inherit',
          fontSize: '0.8rem',
          // '&:hover': {
          //   color: 'white',
          //   backgroundColor: '#f77',
          // },
        }}
      >
        To know which blog posts are the most popular I added Google Analytics
        to the site. Is that alright with you?
      </CookieConsent>
    </Flex>
  );
};

export default Layout;
