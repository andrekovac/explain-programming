import React from 'react';
import { Flex } from '@chakra-ui/core';

import Tag from './tag';

const Tags = ({ tags, onTagSelect, isClickable }) => (
  <Flex wrap="wrap">
    {tags.map((tag, index) => (
      <Tag tag={tag} isClickable={isClickable} onTagSelect={onTagSelect} />
    ))}
  </Flex>
);

export default Tags;
