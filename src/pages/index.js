import React, { useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import {
  Flex,
  Box,
  Badge,
  Image,
  PseudoBox,
  Text,
  Heading,
} from '@chakra-ui/core';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Tags from '../components/tags';
import Author from '../components/author';
import StyledLink from '../components/styledLink';
import Link from '../components/link';
import Tag from '../components/tag';

import { useSiteMetadata } from '../hooks/useSiteMetadata';
import {
  mapCategoryToShortHand,
  mapCategoryToColor,
} from '../constants/Category';
import { NONE, SHOW_ALL } from '../constants/Tag';
import { PRIMARY, PRIMARY_HOVER } from '../constants/Colors';
import { rhythm } from '../style/typography';

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
      <SEO title="Home | Explain Programming" />
      <Box px="1.5rem">
        <Heading color="brand.500">Explain Programming</Heading>
        <Bio />
      </Box>
      <Flex
        my="5"
        align="center"
        justify="center"
        direction={{ base: 'column', md: 'row' }}
        display={selectedTag !== NONE ? 'flex' : 'none'}
      >
        <Flex align="center">
          <Box mr="2">Here are articles with the</Box>
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
        {posts.filter(filterBySelectedTag).map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          const defaultDescription = `Concepts, syntax and code snippets for ${node.frontmatter.title}`;

          return (
            <Article
              key={node.fields.slug}
              category={node.frontmatter.category}
            >
              <Link to={node.fields.slug}>
                <PseudoBox
                  overflow="hidden"
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
            </Article>
          );
        })}
      </Box>
    </Layout>
  );
};

export default BlogIndex;

const Article = styled.article`
  /* background-color: yellow; */
`;

const ArticleElement = styled.article`
  border-left: 10px solid ${(props) => mapCategoryToColor[props.category]};
  padding-left: 10px;
`;

const ShowAllButton = styled.span`
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: ${(props) => (!props.disabled ? 'inherit' : 'pointer')};
  color: white;
  background-color: ${PRIMARY};
  opacity: ${(props) => (!props.disabled ? 0 : 1)};

  &:hover,
  &:active {
    background-color: ${PRIMARY_HOVER};
  }
`;

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
            notReady
            draft
          }
          timeToRead
        }
      }
    }
  }
`;
