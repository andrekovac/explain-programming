import React from 'react';
import { Box, Text } from '@chakra-ui/core';

export default function dateBox({ date }) {
  return (
    <Box
      position="absolute"
      borderTopRightRadius="1rem"
      borderBottomLeftRadius="1rem"
      backgroundColor="brand.500"
      top="-3px"
      right="0"
    >
      <Text
        marginY="1"
        marginX="3"
        fontSize="xs"
        color="white"
        fontWeight="200"
      >
        {date}
      </Text>
    </Box>
  );
}
