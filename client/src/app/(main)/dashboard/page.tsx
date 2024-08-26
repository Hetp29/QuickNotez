'use client';

import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import { ChakraProvider, Box, useColorMode } from '@chakra-ui/react';
import NoteEditor from './components/NoteEditor';
import theme from './styles/theme';

const MainContent = ({ selectedFile }) => {
  const { colorMode } = useColorMode();
  
  return (
    <Box
      flex="1"
      p={4}
      bg={colorMode === 'light' ? 'gray.100' : 'dark.900'}
      color={colorMode === 'light' ? 'black' : 'white'}
      minH="100vh"
    >
      <NoteEditor selectedFile={selectedFile} />
    </Box>
  );
};

const Page = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <ChakraProvider theme={theme}>
      <Box display="flex">
        <Sidebar setSelectedFile={setSelectedFile} />
        <MainContent selectedFile={selectedFile} />
      </Box>
    </ChakraProvider>
  );
};

export default Page;
