import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Tags from '../components/tags'

import { mapCategoryToShortHand } from '../constants/Category'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        {/* <Bio /> */}
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const defaultDescription = `Concepts, syntax and code snippets for ${node.frontmatter.title}`

          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                    marginTop: rhythm(2 / 3),
                    display: 'inline-block',
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small
                  style={{
                    fontSize: rhythm(0.9),
                    marginLeft: rhythm(1 / 2),
                    marginRight: rhythm(1 / 4),
                  }}
                >
                  {mapCategoryToShortHand[node.frontmatter.category]}
                </small>
                <Tags tags={node.frontmatter.tags} />
              </header>
              <section>
                <p
                  style={{
                    fontStyle: `${
                      node.frontmatter.description ? 'normal' : 'italic'
                    }`,
                    fontSize: rhythm(0.5),
                  }}
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || defaultDescription,
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___title], order: ASC }
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
            category
            tags
            draft
          }
          timeToRead
        }
      }
    }
  }
`
