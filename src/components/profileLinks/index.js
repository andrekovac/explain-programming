import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Box, Flex } from '@chakra-ui/core';

import * as S from './styles';
import links from './links';

export default () => (
  <>
    <S.IconsWrapper>
      {links.map((link, key) => (
        <S.Link
          data-tip={link.name}
          href={link.url}
          target={'_blank'}
          key={key}
        >
          {link.renderLink()}
        </S.Link>
      ))}
    </S.IconsWrapper>
    <ReactTooltip place="bottom" type="dark" effect="solid" />
  </>
);
