"use client";

import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import { ChakraProvider, Box, useColorMode } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import theme from './styles/theme';
import { auth, db, doc, updateDoc } from '../../../../firebaseConfig';

const NoteEditor = dynamic(() => import('./components/NoteEditor'), { ssr: false });

interface Workspace {
  id: string;
  name: string;
  files: { name: string; content: string }[];
}

interface MainContentProps {
  selectedFile: string | null;
  workspaceId: string | null;
  updateFileName: (oldName: string, newName: string) => void;
  onTitleUpdate: (newTitle: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  selectedFile,
  workspaceId,
  updateFileName,
  onTitleUpdate
}) => {
  const { colorMode } = useColorMode();

  console.log('Rendering MainContent with selectedFile:', selectedFile);
  console.log('Rendering MainContent with workspaceId:', workspaceId);

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
          selectedFile={selectedFile}
          workspaceId={workspaceId}
          updateFileName={updateFileName}
          onTitleUpdate={onTitleUpdate}
        />
      )}
    </Box>
  );
};

const Page = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
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
    if (!selectedFile || !workspaceId) {
      console.error('Error: selectedFile or workspaceId is null or undefined');
      return;
    }

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

    setUpdatedTitles(prevTitles => ({
      ...prevTitles,
      [selectedFile]: newTitle,
    }));

    const workspaceRef = doc(db, 'users', auth.currentUser?.uid, 'workspaces', workspaceId);
    updateDoc(workspaceRef, {
      files: workspaces.find(ws => ws.id === workspaceId)?.files.map((file: { name: string; }) =>
        file.name === selectedFile ? { ...file, name: newTitle } : file
      ),
    }).catch((error) => {
      console.error('Error updating Firebase:', error);
    });
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
          onTitleUpdate={handleTitleUpdate}
        />
      </Box>
    </ChakraProvider>
  );
};

export default Page;
