import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Box } from '@chakra-ui/core';

import Footer from '../components/footer';
import Header from '../components/article/header';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { mapCategoryToColor } from '../constants/Category';
import { rhythm } from '../style/typography';

const ArticleLink = ({ message, href }) => (
  <a className="normal" href={href} target="_blank" rel="noopener noreferrer">
    {message}
  </a>
);

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const { title: siteTitle, siteUrl } = this.props.data.site.siteMetadata;
    const slug = post.fields.slug;

    const githubSlug =
      slug.split('/').length > 3
        ? `${slug.slice(0, -1)}.md`
        : `${slug}index.md`;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <Box px="1.5rem">
          <article>
            <Header
              category={post.frontmatter.category}
              title={post.frontmatter.title}
              tags={post.frontmatter.tags}
            />
            <section dangerouslySetInnerHTML={{ __html: post.html }} />
            <p
              style={{
                marginTop: rhythm(1),
              }}
            >
              <ArticleLink
                message="Discuss on Twitter"
                // href={`https://mobile.twitter.com/search?q=${siteUrl}${slug}`}
                href={`http://twitter.com/share?text=@andrekovac I just read your post about ${
                  post.frontmatter.title
                } and was wondering [...]&url=${siteUrl}${slug}&hashtags=${post.frontmatter.tags.join()}`}
              />
              <span> ● </span>
              <ArticleLink
                message="Edit on GitHub"
                href={`https://github.com/andrekovac/explain-programming/edit/master/content/blog${githubSlug}`}
              />
            </p>
            <Footer />
          </article>
        </Box>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        # date(formatString: "MMMM DD, YYYY")
        description
        category
        tags
      }
      fields {
        slug
      }
    }
  }
`;
