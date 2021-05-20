/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Flex, PseudoBox } from '@chakra-ui/core';

import RoundedLinkExternal from '../components/roundedLinkExternal';

import { rhythm } from '../style/typography';
import theme from '../style/theme';

import Link from './link';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `);

  const { author } = data.site.siteMetadata;
  return (
    <Flex
      align="center"
      backgroundColor={theme.colors.gray[50]}
      borderColor={theme.colors.gray[200]}
      borderStyle="solid"
      borderWidth={theme.borders['4px']}
      borderRadius="1rem"
      paddingX="5"
      paddingY={{ base: '2', md: '5' }}
    >
      <Link to={'https://www.andrekovac.com'}>
        <PseudoBox
          transition="all 300ms"
          _hover={{ transform: 'rotate(5deg) scale(1.1)' }}
        >
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt={author}
            style={{
              borderColor: theme.colors.brand[500],
              borderStyle: 'solid',
              borderWidth: 5,
              borderRadius: 15,
              marginRight: rhythm(0.5),
              marginBottom: 0,
              minWidth: 100,
            }}
            imgStyle={{
              borderRadius: '0.25rem',
            }}
          />
        </PseudoBox>
      </Link>

      <p>
        <RoundedLinkExternal
          message={'André Kovac'}
          href={`https://www.andrekovac.com/`}
        />
        {` `}
        builds products, creates software, teaches coding, communicates science
        and speaks at events.
      </p>
    </Flex>
  );
};

export default Bio;
