import React from 'react'

import { rhythm } from '../utils/typography'
import { OUTDATED, BASIC } from '../constants/Tag'

const Tags = props => (
  <span style={{ verticalAlign: 'text-bottom' }}>
    {props.tags.map((tag, index) => {
      let backgroundColor = ''
      switch (tag) {
        case OUTDATED:
          backgroundColor = '#bf4040'
          break
        case BASIC:
          backgroundColor = 'green'
          break
        default:
          backgroundColor = 'rgb(14, 28, 128)'
      }
      return (
        <span
          style={{
            padding: rhythm(1 / 6),
            marginRight: rhythm(1 / 4),
            backgroundColor,
            borderRadius: 5,
            color: 'white',
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
          onClick={() => props.onTagSelect && props.onTagSelect(tag)}
        >
          <small>{tag}</small>
        </span>
      )
    })}
  </span>
)

export default Tags
