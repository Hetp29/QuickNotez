'use client';
import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import { ChakraProvider, Box, useColorMode } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import theme from './styles/theme';

// Dynamically import NoteEditor to prevent SSR issues
const NoteEditor = dynamic(() => import('./components/NoteEditor'), { ssr: false });

const MainContent = ({ selectedFile, workspaceId }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      flex="1"
      p={4}
      bg={colorMode === 'light' ? 'gray.100' : 'dark.900'}
      color={colorMode === 'light' ? 'black' : 'white'}
      minH="100vh"
    >
      {selectedFile && <NoteEditor selectedFile={selectedFile} workspaceId={workspaceId} />}
    </Box>
  );
};

const Page = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null); // State to hold the workspace ID

  return (
    <ChakraProvider theme={theme}>
      <Box display="flex">
        {/* Pass setSelectedFile and setWorkspaceId to Sidebar */}
        <Sidebar setSelectedFile={setSelectedFile} setWorkspaceId={setWorkspaceId} />
        <MainContent selectedFile={selectedFile} workspaceId={workspaceId} />
      </Box>
    </ChakraProvider>
  );
};

export default Page;
