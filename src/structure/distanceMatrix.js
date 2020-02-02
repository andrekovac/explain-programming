/**
 * Categories form a different dimension of categorization.
 *
 * The main ways are tags - organized in a folder-style manner.
 *
 *  Future: Use corpora analysis (with word2vec) or information on web about similarity of words!
 *
 * TODO: Create this in an automated manner from result.data.allMarkdownRemark.edges as in gatsby-node.js
 */

const relations = {
  tags: [
    // categories
    {
      'programming-languages': [
        {
          // folder-level tags
          javascript: ['definitions', 'event-loop', 'functional', 'generators'],
        },
        {
          typescript: [],
        },
        {
          haskel: [],
        },
      ],
    },
    {
      theory: [
        {
          theory: ['definitions', 'imperative-declerative'],
        },
      ],
    },
  ],
};

export default relations;
