import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import Newsletter from './newsletter';
import ProfileLinks from './profileLinks';
import RoundedLinkInternal from './roundedLinkInternal';
import RoundedLinkExternal from './roundedLinkExternal';

import LogoWhite from './logoWhite';

/**
 * Footer on main pages
 */
const FooterMain = (props) => {
  return (
    <Flex
      direction="column"
      padding="1rem"
      bg="brand.500"
      minHeight={{ base: 0, md: '300px' }}
      align="center"
      justify="center"
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
            <RoundedLinkExternal
              message={'André Kovac'}
              href={'https://www.andrekovac.com'}
              hasBorder
            />
          </Text>
          <Text display={{ base: 'none', md: 'inline' }} color="white" px="2">
            ●
          </Text>
          <RoundedLinkInternal to={'/about'}>About</RoundedLinkInternal>
          <Text color="white" display="inline" px="2">
            ●
          </Text>
          <RoundedLinkInternal to={'/imprint'}>Imprint</RoundedLinkInternal>
          <Text color="white" display="inline" px="2">
            ●
          </Text>
          <RoundedLinkInternal to={'/privacy-policy'}>
            Privacy Policy
          </RoundedLinkInternal>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FooterMain;
