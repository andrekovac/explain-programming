import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Tags from '../components/tags'
import Author from '../components/author'

import { mapCategoryToShortHand } from '../constants/Category'
import { NONE } from '../constants/Tag'
import { rhythm } from '../utils/typography'

const BlogIndex = props => {
  const [selectedTag, setSelectedTag] = useState(NONE)

  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const filterBySelectedTag = ({ node }) => {
    const tags = node.frontmatter.tags
    if (selectedTag === NONE) {
      return true
    } else {
      return tags.includes(selectedTag)
    }
  }

  const onTagSelect = tag => {
    setSelectedTag(tag)
  }

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
        <span
          style={{
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            cursor: selectedTag === NONE ? 'inherit' : 'pointer',
            color: 'white',
            backgroundColor: '#9C590B',
            opacity: selectedTag === NONE ? 0 : 1,
          }}
          disabled={selectedTag !== NONE}
          onClick={() => setSelectedTag(NONE)}
        >
          Show all
        </span>
      </div>

      {posts.filter(filterBySelectedTag).map(({ node }) => {
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
              <Author name={node.frontmatter.author} />
              <small
                style={{
                  fontSize: rhythm(0.9),
                  marginLeft: rhythm(1 / 2),
                  marginRight: rhythm(1 / 4),
                }}
              >
                {mapCategoryToShortHand[node.frontmatter.category]}
              </small>
              <Tags tags={node.frontmatter.tags} onTagSelect={onTagSelect} />
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
`
