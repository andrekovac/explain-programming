import React, { useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { Flex, Box, Badge, Image, PseudoBox, Text } from '@chakra-ui/core';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Tags from '../components/tags';
import Author from '../components/author';
import StyledLink from '../components/styledLink';
import Link from '../components/link';

import { useSiteMetadata } from '../hooks/useSiteMetadata';
import {
  mapCategoryToShortHand,
  mapCategoryToColor,
} from '../constants/Category';
import { NONE } from '../constants/Tag';
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

  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  };

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Explain Programming | Home" />
      <Bio />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ShowAllButton
          disabled={selectedTag !== NONE}
          onClick={() => setSelectedTag(NONE)}
        >
          Show all
        </ShowAllButton>
      </div>

      {posts.filter(filterBySelectedTag).map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        const defaultDescription = `Concepts, syntax and code snippets for ${node.frontmatter.title}`;

        return (
          <Article key={node.fields.slug} category={node.frontmatter.category}>
            <Link to={node.fields.slug}>
              <PseudoBox
                borderWidth="4px"
                // rounded="lg"
                overflow="hidden"
                // borderColor="gray.200"
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
                      mt={{ base: '2', md: '0' }}
                      align="center"
                      justify="left"
                      pl="3"
                    >
                      <Tags
                        tags={node.frontmatter.tags}
                        onTagSelect={onTagSelect}
                      />
                    </Flex>
                  </Box>
                </Box>
              </PseudoBox>
            </Link>
          </Article>
        );

        return (
          <Article key={node.fields.slug} category={node.frontmatter.category}>
            <Link to={node.fields.slug}>
              <PseudoBox
                borderWidth="1px"
                rounded="lg"
                overflow="hidden"
                _hover={{
                  borderColor: 'gray.200',
                  bg: 'gray.200',
                }}
              >
                <Box p="6">
                  <Box d="flex" alignItems="baseline">
                    <Badge rounded="full" px="2" variantColor="teal">
                      New
                    </Badge>
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {property.beds} beds &bull; {property.baths} baths
                    </Box>
                  </Box>

                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    <Link>Hello</Link>
                  </Box>

                  <Box>
                    {property.formattedPrice}
                    <Box as="span" color="gray.600" fontSize="sm">
                      / wk
                    </Box>
                  </Box>

                  <Box d="flex" mt="2" alignItems="center">
                    {Array(5)
                      .fill('')
                      .map((_, i) => (
                        <div>Hello</div>
                      ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      {property.reviewCount} reviews
                    </Box>
                  </Box>
                </Box>
              </PseudoBox>
            </Link>
          </Article>
        );

        return (
          <ArticleElement
            key={node.fields.slug}
            category={node.frontmatter.category}
          >
            <header>
              <small
                style={{
                  fontSize: rhythm(0.9),
                  marginRight: rhythm(1 / 4),
                }}
              >
                {mapCategoryToShortHand[node.frontmatter.category]}
              </small>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                  marginTop: rhythm(2 / 3),
                  display: 'inline-block',
                }}
              >
                <Link className="main" to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <Tags tags={node.frontmatter.tags} onTagSelect={onTagSelect} />
            </header>
            <section>
              <p
                style={{
                  fontStyle: `${
                    node.frontmatter.description ? 'normal' : 'italic'
                  }`,
                  fontSize: rhythm(0.6),
                }}
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || defaultDescription,
                }}
              />
            </section>
          </ArticleElement>
        );
      })}
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
            draft
          }
          timeToRead
        }
      }
    }
  }
`;
