import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

class ImprintPage extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Imprint" />
        <h1>Imprint</h1>
        <p>
        Owner of this site and responsible for the content of this website according to paragraph 55 Abs. 2
        RStV:
      </p>
      <p>André Kovac Klenzestr. 52a 80469 München</p>
      <p>Phone: +49 176 98517802 E-Mail: info[at]andrekovac[dot]com</p>

      <h3>Disclaimer</h3>
      <p>
        The contents of these pages were prepared with utmost care. Nonetheless, we cannot assume liability
        for the timeless accuracy and completeness of the information.
      </p>
      <p>
        Our website contains links to external websites. As the contents of these third-party websites are
        beyond our control, we cannot accept liability for them. Responsibility for the contents of the linked
        pages is always held by the provider or operator of the pages.
      </p>
      </Layout>
    );
  }
}

export default ImprintPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
