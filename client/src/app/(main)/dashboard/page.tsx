'use client';

import React from 'react';
import Sidebar from './sidebar/Sidebar';
import { ChakraProvider, Box, useColorMode } from '@chakra-ui/react';
import theme from './styles/theme';

const MainContent = () => {
  const { colorMode } = useColorMode();
  
  return (
    <Box
      flex="1"
      p={4}
      bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
      color={colorMode === 'light' ? 'black' : 'white'}
      minH="100vh"
    >
      
      Your main content
    </Box>
  );
};

const Page = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box display="flex">
        <Sidebar />
        <MainContent />
      </Box>
    </ChakraProvider>
  );
};

export default Page;
