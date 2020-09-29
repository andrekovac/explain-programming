import React, { useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { Flex, Box, PseudoBox, Text, Heading } from '@chakra-ui/core';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Tags from '../components/tags';
import Link from '../components/link';
import Tag from '../components/tag';

import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { mapCategoryToShortHand } from '../constants/Category';
import { NONE, SHOW_ALL } from '../constants/Tag';
import { isTabletOrMobile } from '../utils/device';

const BlogIndex = (props) => {
  const [selectedTag, setSelectedTag] = useState(NONE);
  const { title: siteTitle } = useSiteMetadata();

  const { data } = props;
  const posts = data.allMarkdownRemark.edges;

  const isDevelopment = process.env.NODE_ENV === 'development';

  const getItemBackgroundColor = (node) => {
    const ready = node.frontmatter.ready;
    const published = node.frontmatter.published;

    if (isDevelopment && published) {
      return 'yellow.200';
    }
    if (isDevelopment && ready) {
      return 'green.200';
    }
    if (isTabletOrMobile) {
      return 'gray.200';
    }
    return 'none';
  };

  const filterBySelectedTag = ({ node }) => {
    const tags = node.frontmatter.tags;
    if (selectedTag === NONE) {
      return true;
    } else {
      return tags.includes(selectedTag);
    }
  };

  const filterInDevMode = ({ node }) =>
    node.frontmatter.published || isDevelopment;

  const onTagSelect = (tag) =>
    tag !== selectedTag ? setSelectedTag(tag) : setSelectedTag(NONE);

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Home | Explain Programming" />
      <Box>
        <Heading color="brand.500">All articles</Heading>
      </Box>
      <Flex
        my="5"
        align="center"
        justify="center"
        direction={{ base: 'column', md: 'row' }}
        display={selectedTag !== NONE ? 'flex' : 'none'}
      >
        <Flex align="center">
          <Box mr="2">These are all articles with the</Box>
          <Tag tag={selectedTag} />
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
        {posts
          .filter(filterInDevMode)
          .filter(filterBySelectedTag)
          .map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            const defaultDescription = `Concepts, syntax and code snippets for ${node.frontmatter.title}`;

            return (
              <Box
                key={node.fields.slug}
                category={node.frontmatter.category}
                marginBottom={{ base: '2', md: '0' }}
              >
                <Link to={node.fields.slug}>
                  <PseudoBox
                    overflow="hidden"
                    bg={getItemBackgroundColor(node)}
                    _hover={{
                      bg: 'gray.200',
                    }}
                  >
                    <Box p={{ base: '3', md: '5' }}>
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
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___category], order: ASC }
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
            draft
            ready
            published
          }
          timeToRead
        }
      }
    }
  }
`;
