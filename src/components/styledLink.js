import styled from 'styled-components';
import { Link } from 'gatsby';

import { PRIMARY_HOVER } from '../constants/Colors';

const StyledLink = styled(Link)`
  &:hover,
  &:active {
    color: ${PRIMARY_HOVER};
    background-color: white;
  }
`;

export default StyledLink;
