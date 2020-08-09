import styled from 'styled-components';

import theme from '../../style/theme';

export const Link = styled.a`
  color: ${theme.colors.white};
  background: none;

  opacity: 1;
  transition: all 0.2s;

  &:hover {
    color: ${theme.colors.white};
    opacity: 0.8;
    transform: scale(1.1);
  }

  > svg {
    padding: 0 6px;
  }
`;

export const IconsWrapper = styled.section`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-evenly;
`;
