import React from 'react';
import { graphql } from 'gatsby';
import { useCookies } from 'react-cookie';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { Link } from '@chakra-ui/core';

const Confirmed = (props) => {
  const [cookies] = useCookies([
    'explain_programming_email',
    'explain_programming_firstName',
  ]);

  const siteTitle = props.data.site.siteMetadata.title;

  return (
    <Layout hideNewsletter={true} location={props.location} title={siteTitle}>
      <SEO title="Subscription Confirmed | Explain Programming" />
      <h1>Subscription confirmed</h1>
      <p>
        Hi
        {!!cookies['explain_programming_firstName'] &&
          ` ${cookies['explain_programming_firstName']}`}
        !{' '}
        <span role="img" aria-label="Smiling Face Icon">
          😃
        </span>
        <br />
        Thanks again for signing up!!{' '}
        <span role="img" aria-label="Medal Icon">
          🐒
        </span>{' '}
        You'll occasionally receive emails from me about stuff I created or talk
        about.{' '}
        <span role="img" aria-label="Post Box Icon">
          📮
        </span>
      </p>
      <p>
        If you don't want to receive emails anymore at some point, each email
        will contain a link to easily unsubscribe.
      </p>
      <p>
        Take care,
        <br />
        André
      </p>
      <h4>
        <Link href={`/`}>
          Back to the Homepage{' '}
          <span role="img" aria-label="House Icon">
            🏠
          </span>
        </Link>
      </h4>
    </Layout>
  );
};

export default Confirmed;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
