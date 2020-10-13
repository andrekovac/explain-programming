import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Flex, Box, PseudoBox, Text } from '@chakra-ui/core';
import * as dayjs from 'dayjs';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Tags from '../components/tags';
import Link from '../components/link';
import Tag from '../components/tag';
import RoundedLinkExternal from '../components/roundedLinkExternal';

import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { mapCategoryToShortHand } from '../constants/Category';
import { NONE, SHOW_ALL } from '../constants/Tag';
import { isTabletOrMobile } from '../utils/device';

// day.js plugins
dayjs.extend(localizedFormat);

const BlogIndex = (props) => {
  const [selectedTag, setSelectedTag] = useState(NONE);
  const { title: siteTitle } = useSiteMetadata();

  const { data } = props;
  const posts = data.allMarkdownRemark.edges;

  const filterBySelectedTag = ({ node }) => {
    const tags = node.frontmatter.tags;
    if (selectedTag === NONE) {
      return true;
    } else {
      return tags.includes(selectedTag);
    }
  };

  const onTagSelect = (tag) =>
    tag !== selectedTag ? setSelectedTag(tag) : setSelectedTag(NONE);

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Explain Programming" />
      <Box>
        {/* <Text
        color="brand.500"
        fontSize="3xl"
        fontWeight="700"
        >Explain Programming</Text> */}
        {/* <Box>
          Commands and coding experience collected over several years by{' '}
          <RoundedLinkExternal
            message={'André Kovac'}
            href={`https://www.andrekovac.com/`}
          />
        </Box> */}
      </Box>
      <Flex
        my="5"
        align="center"
        justify="center"
        direction={{ base: 'column', md: 'row' }}
        display={selectedTag !== NONE ? 'flex' : 'none'}
      >
        <Flex align="center">
          <Box mr="2">These are articles with the</Box>
          <Tag
            tag={selectedTag}
            onClick={() => setSelectedTag(NONE)}
            isClickable
          />
          <Box mr="1">tag.</Box>
        </Flex>
        <Flex align="center">
          <Box mr="2">Or</Box>
          <Tag
            tag={SHOW_ALL}
            onClick={() => setSelectedTag(NONE)}
            isClickable
          />
          <Box>articles.</Box>
        </Flex>
      </Flex>

      <Box my="5">
        {posts.filter(filterBySelectedTag).map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          const defaultDescription = `Concepts, syntax and code snippets for ${node.frontmatter.title}`;

          const datePublishedFormatted = dayjs(
            node.frontmatter.datePublished
          ).format('LL');

          return (
            <Box
              key={node.fields.slug}
              category={node.frontmatter.category}
              marginBottom="2"
              borderColor="brand.500"
              borderRadius="1rem"
              borderStyle="solid"
              borderWidth="3px"
              position="relative"
            >
              <Link to={node.fields.slug}>
                <PseudoBox
                  overflow="hidden"
                  borderRadius="1rem"
                  bg="white"
                  _hover={{
                    bg: 'gray.200',
                  }}
                >
                  <Box paddingX={{ base: '4', md: '5' }} paddingBottom="3" paddingTop="8">
                    <Box display={{ md: 'flex' }}>
                      <Flex direction="row">
                        <Flex
                          align="center"
                          justify="center"
                          px="3"
                          fontSize="2xl"
                        >
                          {mapCategoryToShortHand[node.frontmatter.category]}
                        </Flex>
                        <Flex direction="column">
                          <Box
                            fontWeight="semibold"
                            // as="h4"
                            // lineHeight="tight"
                            // isTruncated
                          >
                            <Text>{title}</Text>
                          </Box>
                          <Box
                            fontSize="xs"
                            color="gray.600"
                            dangerouslySetInnerHTML={{
                              __html:
                                node.frontmatter.description ||
                                defaultDescription,
                            }}
                          />
                        </Flex>
                      </Flex>

                      <Flex
                        flexGrow="1"
                        align="center"
                        justify={{ base: 'left', md: 'right' }}
                        mt={{ base: '2', md: '0' }}
                        ml="3"
                        w={{ base: '100%', md: '30%' }}
                      >
                        <Tags
                          tags={node.frontmatter.tags}
                          onTagSelect={onTagSelect}
                          isClickable
                        />
                      </Flex>
                    </Box>
                  </Box>
                </PseudoBox>
              </Link>
              <Box
                position="absolute"
                borderTopRightRadius="1rem"
                borderBottomLeftRadius="1rem"
                backgroundColor="brand.500"
                top="-3px"
                right="0"
              >
                <Text
                  marginY="1"
                  marginX="3"
                  fontSize="xs"
                  color="white"
                  fontWeight="200"
                >
                  {datePublishedFormatted}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Bio />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true }, published: { eq: true } } }
      sort: { fields: [frontmatter___datePublished], order: DESC }
    ) {
      edges {
        node {
          # excerpt
          fields {
            slug
          }
          frontmatter {
            # date(formatString: "MMMM DD, YYYY")
            title
            description
            author
            category
            tags
            list
            ready
            draft
            datePublished
          }
          timeToRead
        }
      }
    }
  }
`;
