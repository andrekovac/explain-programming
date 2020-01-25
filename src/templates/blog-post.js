import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Tags from '../components/tags';

import {
  mapCategoryToWord,
  mapCategoryToShortHand,
} from '../constants/Category';
import { rhythm, scale } from '../utils/typography';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const { title: siteTitle, siteUrl } = this.props.data.site.siteMetadata;
    const slug = post.fields.slug;
    const { previous, next } = this.props.pageContext;

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
            <a
              href={`https://mobile.twitter.com/search?q=${siteUrl}${slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Discuss on Twitter
            </a>
          </p>
          <hr
            style={{
              marginTop: rhythm(1.5),
              marginBottom: rhythm(1 / 2),
              height: 2,
            }}
          />
          <footer>
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
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
