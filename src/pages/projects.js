import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Heading } from '@chakra-ui/core';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Project from '../components/project';

class Projects extends Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Projects | Explain Programming"
          pathname={this.props.location.pathname}
        />
        <Heading as="h1" color="brand.500" mb="4">
          Projects
        </Heading>
        <Project />
        <Project />
        <Project />
        <Project />
      </Layout>
    );
  }
}

export default Projects;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
