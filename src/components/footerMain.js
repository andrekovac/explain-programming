import React from 'react';
import { Box, Heading, Flex, Text, Button } from '@chakra-ui/core';
import Link from './link';
import Newsletter from './newsletter';
import ProfileLinks from './profileLinks';

import LogoWhite from './logoWhite';

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block" color="white">
    {children}
  </Text>
);

/**
 * Footer on main pages
 */
const FooterMain = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      direction="column"
      padding="1rem"
      bg="brand.500"
      minHeight={{ base: 0, md: '300px' }}
      align={{ base: 'center', md: 'end' }}
      justify="center"
      align="center"
    >
      <Flex direction={{ base: 'column', md: 'row' }} maxW="2xl">
        {props.hideNewsletter ? null : <Newsletter />}
        <Box my={{ base: '5', md: '0' }} ml={{ base: 0, md: '10' }}>
          <ProfileLinks />
        </Box>
      </Flex>

      <Flex
        as="nav"
        wrap="wrap"
        maxW="2xl"
        justify="center"
        align="center"
        {...props}
      >
        <Flex align="center" mr={5}>
          <LogoWhite width="2rem" />
        </Flex>

        <Flex color="white" display="inline">
          <Text display={{ base: 'block', md: 'inline' }} color="white">
            {`${new Date().getFullYear()}, Built by `}
            <Link to={'https://www.andrekovac.com'} isText>
              André Kovac
            </Link>
          </Text>
          <Text display={{ base: 'none', md: 'inline' }} color="white" px="2">
            ●
          </Text>
          <Link to={'/about'} isText>
            About
          </Link>
          <Text color="white" display="inline" px="2">
            ●
          </Text>
          <Link to={'/imprint'} isText>
            Imprint
          </Link>
          <Text color="white" display="inline" px="2">
            ●
          </Text>
          <Link to={'/privacy-policy'} isText>
            Privacy Policy
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FooterMain;
