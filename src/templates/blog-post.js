import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Footer from '../components/footer';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Tags from '../components/tags';

import {
  mapCategoryToColor,
  mapCategoryToShortHand,
  mapCategoryToWord,
} from '../constants/Category';
import { rhythm, scale } from '../style/typography';

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
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: rhythm(1 / 3),
              }}
            >
              {post.frontmatter.title}
            </h1>
            <div style={{ marginBottom: rhythm(1.5) }}>
              <Tags tags={post.frontmatter.tags} />
              <span
                style={{
                  ...scale(-1 / 5),
                  fontSize: rhythm(0.6),
                  marginLeft: rhythm(1),
                  verticalAlign: 'unset',
                }}
              >
                <ColorBar category={post.frontmatter.category} />
                <span>{mapCategoryToShortHand[post.frontmatter.category]}</span>
                <span
                  style={{
                    fontSize: rhythm(0.5),
                    marginLeft: rhythm(1 / 4),
                  }}
                >
                  {mapCategoryToWord[post.frontmatter.category]}
                </span>
              </span>
            </div>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <p
            style={{
              marginTop: rhythm(1),
            }}
          >
            <ArticleLink
              message="Share on Twitter"
              // href={`https://mobile.twitter.com/search?q=${siteUrl}${slug}`}
              href={`http://twitter.com/share?text=${
                post.frontmatter.title
              }&url=${siteUrl}${slug}&via=andrekovac&hashtags=${post.frontmatter.tags.join()}`}
            />
            <span> • </span>
            <ArticleLink
              message="Edit on GitHub"
              href={`https://github.com/andrekovac/explain-programming/edit/master/content/blog${githubSlug}`}
            />
          </p>
          <Footer />
        </article>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

const ColorBar = styled.span`
  border-left: 10px solid ${(props) => mapCategoryToColor[props.category]};
  margin-right: 10px;
`;

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
