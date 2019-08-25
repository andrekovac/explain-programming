import React from 'react'

import { rhythm } from '../utils/typography'
import { OUTDATED } from '../constants/Tag'

const Tags = ({ tags }) => (
  <div>
    {tags.map((tag, index) => (
      <span
        style={{
          padding: rhythm(1 / 6),
          marginRight: rhythm(1 / 4),
          backgroundColor: tag === OUTDATED ? '#bf4040' : 'rgb(14, 28, 128)',
          borderRadius: 5,
          color: 'white',
        }}
      >
        <small>{tag}</small>
      </span>
    ))}
  </div>
)

export default Tags
