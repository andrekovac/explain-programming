import React from 'react'

import { mapNameToInitials } from '../constants/Author'

const Author = ({ name }) => (
  <span style={{ marginLeft: 10, fontStyle: 'italic', fontWeight: 'bold' }}>
    {mapNameToInitials[name]}
  </span>
)

export default Author
