import React from 'react';
import Tag from './tag';

const Tags = ({ tags, onTagSelect, isClickable }) => (
  <div style={{ verticalAlign: 'text-bottom' }}>
    {tags.map((tag, index) => (
      <Tag tag={tag} isClickable={isClickable} onTagSelect={onTagSelect} />
    ))}
  </div>
);

export default Tags;
