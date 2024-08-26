import React, { useState, useEffect, useRef } from 'react';
import { HiPlus, HiChevronRight, HiChevronDown, HiMoon, HiSun, HiDocument } from 'react-icons/hi';
import { Box, Collapse, useColorMode, Button } from '@chakra-ui/react';
import { auth } from '../../../../../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../../../firebaseConfig';

const Sidebar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState<firebase.User | null>(null);
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState<{ [key: string]: boolean }>({});

  // Fetch workspaces
  const fetchWorkspaces = async () => {
    if (user) {
      const workspaceCollection = await getDocs(collection(db, 'users', user.uid, 'workspaces'));
      const fetchedWorkspaces = workspaceCollection.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        files: doc.data().files || [],
      }));
      setWorkspaces(fetchedWorkspaces);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchWorkspaces();
    }
  }, [user]);

  // Add a new workspace
  const handleAddWorkspace = async () => {
    const workspaceName = prompt('Enter the name of the new workspace:');
    if (workspaceName) {
      try {
        await addDoc(collection(db, 'users', user.uid, 'workspaces'), {
          name: workspaceName,
          files: [{ name: 'notes.txt', content: 'Your notes go here...' }],
        });
        fetchWorkspaces(); // Refresh the list
      } catch (error) {
        console.error('Error adding workspace:', error);
      }
    }
  };

  // Toggle workspace dropdown
  const toggleWorkspaceDropdown = (workspaceId: string) => {
    setIsWorkspaceDropdownOpen(prev => ({
      ...prev,
      [workspaceId]: !prev[workspaceId],
    }));
  };

  const buttonTextColor = colorMode === 'light' ? 'gray.800' : 'whiteAlpha.900';
  const buttonHoverBg = colorMode === 'light' ? 'gray.200' : 'gray.600';

  return (
    <Box
      className="relative transition-all duration-300 h-screen flex flex-col"
      style={{
        width: 250,
        borderRight: `4px solid ${colorMode === 'light' ? '#e2e8f0' : '#2d3748'}`,
      }}
      bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
      color={colorMode === 'light' ? 'black' : 'white'}
    >
      <div className="p-4">
        <Button className="w-full text-left mb-4" onClick={handleAddWorkspace} leftIcon={<HiPlus />}>
          Add Workspace
        </Button>

        {workspaces.map(workspace => (
          <div key={workspace.id} className="mb-2">
            <Button
              className="w-full text-left"
              onClick={() => toggleWorkspaceDropdown(workspace.id)}
              leftIcon={isWorkspaceDropdownOpen[workspace.id] ? <HiChevronDown /> : <HiChevronRight />}
            >
              {workspace.name}
            </Button>
            <Collapse in={isWorkspaceDropdownOpen[workspace.id]}>
              <Box pl={8} mt={2}>
                {workspace.files.map((file, index) => (
                  <Button key={index} className="w-full text-left" leftIcon={<HiDocument />}>
                    {file.name}
                  </Button>
                ))}
              </Box>
            </Collapse>
          </div>
        ))}

        <Button onClick={() => alert('QuickNotez AI clicked!')} className="w-full text-left mt-4">
          QuickNotez AI
        </Button>
      </div>

      <div className="mt-auto p-4">
        <Button onClick={toggleColorMode} className="w-full">
          {colorMode === 'dark' ? <HiSun className="mr-2" /> : <HiMoon className="mr-2" />}
          {colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
    </Box>
  );
};

export default Sidebar;
