import React from 'react';
import { Box, Flex, Text, Button, PseudoBox } from '@chakra-ui/core';

import LogoWhite from './logoWhite';
import Link from './link';
import ProfileLinks from './profileLinks';
import { ABOUT, BLOG } from '../constants/Page';

const MenuItem = ({ children, to, currentPathname }) => (
  // <Link to={to ? `${__PATH_PREFIX__}/${to}` : `${__PATH_PREFIX__}/`}>
  <Link to={to || `/`}>
    <Button
      w={{ base: '100%', md: 'inherit' }}
      // size="md"
      size={{ base: 'md', md: 'sm', lg: 'md' }}
      padding={{ base: '1', lg: '2' }}
      variant="ghost"
      variantColor="brand"
      color={currentPathname === to ? 'brand.500' : 'white'}
      backgroundColor={currentPathname === to ? 'white' : 'inherit'}
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

  const pathname = props.location.pathname;

  return (
    <Flex justify="center" bg="brand.500">
      <Flex
        as="nav"
        px="1.5rem"
        pt={pathname === '/' ? '1.5rem' : '0.5rem'}
        pb={{ base: show ? '1rem' : '0', md: '0' }}
        maxW="2xl"
        direction="column"
        flexGrow="1"
        {...props}
      >
        <Flex wrap="wrap" flexGrow="1">
          <Flex
            direction="row"
            align="center"
            justify={{ base: 'space-between', md: 'inherit' }}
            flexGrow="1"
            transition="all 300ms"
            borderBottom={{
              base: show ? '0.3rem solid white' : 'inherit',
              md: 'inherit',
            }}
          >
            <Link to="/">
              <PseudoBox
                display="flex"
                align="center"
                mr={5}
                transition="all 300ms"
                _hover={{ transform: 'rotate(-5deg) scale(1.1)' }}
              >
                <LogoWhite width="4em" />
              </PseudoBox>
            </Link>

            <PseudoBox
              display={{ base: 'flex', md: 'none' }}
              transition="all 300ms"
              justify="center"
              height="100%"
              _hover={
                {
                  // transform: 'scale(1.05)',
                }
              }
            >
              <Flex direction="column" justify="end">
                <Text color="white" fontWeight="bold">
                  Explain
                </Text>
                <Text color="white" fontWeight="bold" mb="-9px">
                  Programming
                </Text>
              </Flex>
            </PseudoBox>

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
          </Flex>

          <Box
            display={{ base: show ? 'block' : 'none', md: 'flex' }}
            width={{ base: 'full', md: 'auto' }}
            alignItems="center"
            flexGrow={1}
            transition="all 2s"
          >
            <MenuItem to={BLOG} currentPathname={pathname}>
              Blog
            </MenuItem>
            <MenuItem to={ABOUT} currentPathname={pathname}>
              About
            </MenuItem>
          </Box>

          <Flex
            display={{ base: show ? 'flex' : 'none', md: 'flex' }}
            flexGrow="1"
            align="center"
            justify={{ base: 'center', md: 'end' }}
            mt={{ base: 4, md: 0 }}
          >
            <ProfileLinks />
          </Flex>
        </Flex>

        <Flex justify="end" flexGrow="1" display={{ base: 'none', md: 'flex' }}>
          <PseudoBox
            transition="all 300ms"
            color="white"
            fontWeight="bold"
            mb="-9px"
            _hover={{
              color: 'brand.500',
              transform: 'translateY(0.6rem)',
            }}
          >
            Explain Programming
          </PseudoBox>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
