'use client';
import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import { ChakraProvider, Box, useColorMode } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import theme from './styles/theme';

// Dynamically import NoteEditor to prevent SSR issues
const NoteEditor = dynamic(() => import('./components/NoteEditor'), { ssr: false });

const MainContent = ({ selectedFile, workspaceId, updateFileName }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      flex="1"
      p={4}
      bg={colorMode === 'light' ? 'gray.100' : 'dark.900'}
      color={colorMode === 'light' ? 'black' : 'white'}
      minH="100vh"
    >
      {selectedFile && (
        <NoteEditor
          key={selectedFile} 
          selectedFile={selectedFile}
          workspaceId={workspaceId}
          updateFileName={(oldName, newName) => updateFileName(oldName, newName, workspaceId)}
        />
      )}
    </Box>
  );
};


const Page = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [workspaces, setWorkspaces] = useState<any[]>([]); // Manage workspaces in state

  
  const updateFileName = (oldName: string, newName: string) => {
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          return {
            ...workspace,
            files: workspace.files.map((file) =>
              file.name === oldName ? { ...file, name: newName } : file
            ),
          };
        }
        return workspace;
      })
    );
  };


  return (
    <ChakraProvider theme={theme}>
      <Box display="flex">
        {/* Pass setSelectedFile, setWorkspaceId, and updateFileName to Sidebar and MainContent */}
        <Sidebar
          setSelectedFile={setSelectedFile}
          setWorkspaceId={setWorkspaceId}
          workspaces={workspaces}
          setWorkspaces={setWorkspaces}
        />
        <MainContent
          selectedFile={selectedFile}
          workspaceId={workspaceId}
          updateFileName={updateFileName}
        />
      </Box>
    </ChakraProvider>
  );
};

export default Page;
