import styled from 'styled-components';
import { Link } from 'gatsby';

import { LINK, PRIMARY } from '../constants/Colors';

const StyledLink = styled(Link)`
  color: ${LINK};
  &:hover,
  &:active {
    color: ${PRIMARY};
  }
`;

export default StyledLink;
