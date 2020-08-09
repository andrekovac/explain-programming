import React from 'react';
import { Box, Flex, Text, Button, PseudoBox } from '@chakra-ui/core';

import LogoWhite from './logoWhite';
import Link from './link';
import ProfileLinks from './profileLinks';
import { PROJECTS, BLOG } from '../constants/Page';

const MenuItems = ({ children, to }) => (
  // <Link to={to ? `${__PATH_PREFIX__}/${to}` : `${__PATH_PREFIX__}/`}>
  <Link to={to || `/`}>
    <Button
      w={{ base: '100%', md: 'inherit' }}
      size="md"
      // size={{ base: 'sm', md: 'md' }}
      variant="ghost"
      variantColor="brand"
      // bg="transparent"
      color="white"
      mt={{ base: 2, md: 0 }}
      mr={3}
      border="none"
      transition="all 200ms"
      _hover={{ color: 'brand.500', backgroundColor: 'white' }}
      cursor="pointer"
    >
      {children}
    </Button>
  </Link>
);

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex justify="center" bg="brand.500">
      <Flex
        as="nav"
        justify="space-between"
        wrap="wrap"
        p="1.5rem"
        maxW="2xl"
        flexGrow="1"
        {...props}
      >
        <Flex direction="row" align="center">
          <Link to="/">
            <PseudoBox
              display="flex"
              align="center"
              mr={5}
              transition="all 300ms"
              _hover={{ transform: 'rotate(-5deg) scale(1.1)' }}
            >
              <LogoWhite />
            </PseudoBox>
          </Link>

          <PseudoBox
            display={{ base: 'flex', md: 'none' }}
            transition="all 300ms"
            justify="center"
            _hover={{
              transform: 'rotate(5deg) scale(1.05)',
            }}
          >
            <Flex direction="column">
              <Text color="white" fontWeight="bold">
                Explain
              </Text>
              <Text color="white" fontWeight="bold">
                Programming
              </Text>
            </Flex>
          </PseudoBox>
        </Flex>

        <PseudoBox
          display={{ base: 'flex', md: 'none' }}
          onClick={handleToggle}
          transition="all 300ms"
          justify="center"
          transform={{
            base: show ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
          _hover={{
            transform: show
              ? 'scale(1.4) rotate(85deg)'
              : 'scale(1.4) rotate(5deg)',
          }}
          cursor="pointer"
        >
          <svg
            fill="white"
            width="30px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </PseudoBox>

        <Box
          display={{ base: show ? 'block' : 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          transition="all 2s"
        >
          <MenuItems to={BLOG}>Blog</MenuItems>
          <MenuItems>Talks</MenuItems>
          <MenuItems to={PROJECTS}>Projects</MenuItems>
        </Box>

        {/* <Box
          display={{ base: show ? 'block' : 'none', md: 'block' }}
          mt={{ base: 4, md: 0 }}
        >
          Hello
        </Box> */}
        <Flex
          display={{ base: show ? 'flex' : 'none', md: 'flex' }}
          flexGrow="1"
          align="center"
          justify="center"
          mt={{ base: 4, md: 0 }}
        >
          <ProfileLinks />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
