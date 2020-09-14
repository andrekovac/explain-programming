import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import RoundedLinkExternal from '../components/roundedLinkExternal';

class AboutPage extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="About | Explain Programming" />
        <h1>About</h1>

        <h3>Why does this exist? 🐒</h3>
        <ul>
          <li>
            While writing code over the last few years, I made notes about
            syntax and topics I find difficult and about commands I found useful
            or suspected that I will need them again at some point.
          </li>
        </ul>
        <h3>Is this all done? 🐳</h3>
        <ul>
          <li>
            No. This is a living project. Since I learn more, I'm gradually
            adding new articles or even update existing ones. I hope it might be
            helpful for other people besides myself.
          </li>
        </ul>
        <h3>Why did I put this online? 🐈</h3>
        <ul>
          <li>
            I had all my notes in <b>Markdown</b> files anyway and I sometimes
            had a hard time finding them because they are all in some folder
            scattered somewhere on my computer.
          </li>
          <li>
            I used a global search (<b>Spotlight</b> on my Macbook 💻) as my
            search tool, but having them all in one place will make it easier to
            find things.
          </li>
          <li>
            It is an extension of my personal notes which help me understand
            concepts. Before I publish my notes on this blog I go through them
            again which is a nice ( and sometimes emberrassing 🙈) exercise.
          </li>
        </ul>
        <h3>Information about the content 🐫</h3>
        <ul>
          <li>
            I'm gradually adding more of the files I have on my computer,
            cleaning, checking and revising them beforehand (sometimes more,
            sometimes less).
          </li>
          <li>Main future features will be a search and a better look.</li>
          <li>
            Some pages only contain very basic information for the simple tasks
            I mostly used it for or just wanted to remember whereas some pages
            are more elaborate. Other pages contain more in depth discussions
            and theory.
          </li>
        </ul>
        <h3>Who's behind this? 🌱</h3>
        <ul>
          <li>
            I'm André. I do various things and shares stuff related to
            programming here. The links at the bottom of this page will lead you
            to sources of my online footprint. You can also check out my{' '}
            <RoundedLinkExternal
              message={'homepage'}
              href={`https://www.andrekovac.com/`}
            />
            .
          </li>
        </ul>
      </Layout>
    );
  }
}

export default AboutPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
