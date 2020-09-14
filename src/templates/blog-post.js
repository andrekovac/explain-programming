import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import { Box } from '@chakra-ui/core';

import Footer from '../components/footer';
import Header from '../components/article/header';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { rhythm } from '../style/typography';

const ArticleLink = ({ message, href }) => (
  <a className="normal" href={href} target="_blank" rel="noopener noreferrer">
    {message}
  </a>
);

const BlogPostTemplate = (props) => {
  const post = props.data.markdownRemark;
  const { title: siteTitle, siteUrl } = props.data.site.siteMetadata;
  const slug = post.fields.slug;

  const commentBox = React.createRef();

  const githubSlug =
    slug.split('/').length > 3 ? `${slug.slice(0, -1)}.md` : `${slug}index.md`;

  useEffect(() => {
    const commentScript = document.createElement('script');

    commentScript.src = 'https://utteranc.es/client.js';
    commentScript.async = true;

    commentScript.setAttribute(
      'repo',
      'andrekovac/explain-programming-comments'
    );
    commentScript.setAttribute('issue-term', 'pathname');
    commentScript.setAttribute('theme', 'github-light');
    commentScript.setAttribute('crossorigin', 'anonymous');
    commentScript.setAttribute('id', 'utterances');

    if (commentBox && commentBox.current) {
      commentBox.current.appendChild(commentScript);
    } else {
      console.log(`Error adding utterances comments on: ${commentBox}`);
    }
  }, [commentBox]);

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Box>
        <article>
          <Header
            category={post.frontmatter.category}
            title={post.frontmatter.title}
            tags={post.frontmatter.tags}
          />
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <p>
            <h2>Discussion</h2>
            <div ref={commentBox} />
          </p>
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
              message="Improve this article: Edit on GitHub"
              href={`https://github.com/andrekovac/explain-programming/edit/master/content/blog${githubSlug}`}
            />
          </p>
          <Footer />
        </article>
      </Box>
    </Layout>
  );
};

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
