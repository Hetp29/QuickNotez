"use client";  // This needs to be exactly like this, without quotes or extra characters

import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import { ChakraProvider, Box, useColorMode } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import theme from './styles/theme';
import { auth, db, doc, updateDoc } from '../../../../firebaseConfig';

// Dynamically import NoteEditor to prevent SSR issues
const NoteEditor = dynamic(() => import('./components/NoteEditor'), { ssr: false });

const Page = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [workspaces, setWorkspaces] = useState<any[]>([]); // Manage workspaces in state
  const [updatedTitles, setUpdatedTitles] = useState<{ [key: string]: string }>({});

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

  const handleTitleUpdate = (newTitle: string) => {
    console.log("Updating title:", newTitle);
    if (selectedFile && workspaceId) {
      setWorkspaces(prevWorkspaces =>
        prevWorkspaces.map(workspace => {
          if (workspace.id === workspaceId) {
            return {
              ...workspace,
              files: workspace.files.map(file =>
                file.name === selectedFile ? { ...file, name: newTitle } : file
              ),
            };
          }
          return workspace;
        })
      );

      
      const workspaceRef = doc(db, 'users', auth.currentUser?.uid, 'workspaces', workspaceId);
      updateDoc(workspaceRef, {
        files: workspaces.find(ws => ws.id === workspaceId)?.files.map(file =>
          file.name === selectedFile ? { ...file, name: newTitle } : file
        ),
      });
    }
  };

  const MainContent = ({ selectedFile, workspaceId, updateFileName, onTitleUpdate }) => {
    const { colorMode } = useColorMode();

    return (
      <Box flex="1" p={4} bg={colorMode === 'light' ? 'gray.100' : 'dark.900'} color={colorMode === 'light' ? 'black' : 'white'} minH="100vh">
        {selectedFile && (
          <NoteEditor
            selectedFile={selectedFile}
            workspaceId={workspaceId}
            updateFileName={updateFileName}
            onTitleUpdate={handleTitleUpdate}
          />
        )}
      </Box>
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <Box display="flex">
        <Sidebar
          setSelectedFile={setSelectedFile}
          setWorkspaceId={setWorkspaceId}
          workspaces={workspaces}
          setWorkspaces={setWorkspaces}
          updatedTitles={updatedTitles} 
        />
        <MainContent
          selectedFile={selectedFile}
          workspaceId={workspaceId}
          updateFileName={updateFileName}
          onTitleUpdate={handleTitleUpdate}  // Pass the function here
        />
      </Box>
    </ChakraProvider>
  );
};

export default Page;