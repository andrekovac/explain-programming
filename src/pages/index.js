import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Tags from '../components/tags';
import Author from '../components/author';
import StyledLink from '../components/styledLink';

import { useSiteMetadata } from '../hooks/useSiteMetadata';
import {
  mapCategoryToShortHand,
  mapCategoryToColor,
} from '../constants/Category';
import { NONE } from '../constants/Tag';
import { PRIMARY, PRIMARY_HOVER } from '../constants/Colors';
import { rhythm } from '../utils/typography';

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
                <Link className="main" to={node.fields.slug}>{title}</Link>
              </h3>
              <Author name={node.frontmatter.author} />

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
