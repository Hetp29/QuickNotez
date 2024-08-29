import React, { useState, useEffect, useRef } from 'react';
import { 
  HiChevronRight, HiPlus, HiMoon, HiSun, 
  HiChat, HiTrash, HiQuestionMarkCircle, HiDocument, 
  HiChartBar, HiChevronDown, HiTemplate, HiFolder} from 'react-icons/hi';
import { RiMindMap } from 'react-icons/ri';
import { BsChevronExpand } from "react-icons/bs";
import { useColorMode, Box, Collapse, Menu, MenuButton, MenuList, MenuItem, Button, IconButton} from '@chakra-ui/react';
import { FaClipboardCheck } from "react-icons/fa6";
import { auth, getDoc } from '../../../../../firebaseConfig';
import { db, collection, addDoc, setDoc, getDocs, updateDoc, doc } from '../../../../../firebaseConfig';
import { deleteDoc } from 'firebase/firestore';


interface File {
  name: string;
  content: string;
}

interface Workspace {
  id: string;
  name: string;
  files: File[];
  deleted?: boolean;
}

const Sidebar: React.FC<{ 
  setSelectedFile: (file: string) => void;
  setWorkspaceId: (id: string) => void;
  workspaces: Workspace[];
  setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>;
  updatedTitles: { [key: string]: string }
}> = ({ setSelectedFile, setWorkspaceId, workspaces, setWorkspaces, updatedTitles }) => {
  const minWidth = 400;
  const maxWidth = 700;
  const [width, setWidth] = useState<number>(400);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false); 
  const [user, setUser] = useState<firebase.User | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<{ 
    x: number, 
    y: number, 
    workspaceId: string | null, 
    selectedFile: string | null 
  }>({ x: 0, y: 0, workspaceId: null, selectedFile: null });
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const handleWorkspaceSelect = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    setWorkspaceId(workspace.id);
  }


  const { colorMode, toggleColorMode } = useColorMode();
  const [workspaceFoldersOpen, setWorkspaceFoldersOpen] = useState<{ [key: string]: boolean }>({});

  const handleTitleUpdate = (newTitle: string) => {
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


  const handleRightClick = (event: React.MouseEvent, workspaceId: string, fileName?: string) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Right clicked on:", fileName ? `File: ${fileName}` : `Workspace: ${workspaceId}`);
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      workspaceId,
      selectedFile: fileName || null
    });
  };
  
  const handleFileClick = (workspaceId: string, fileName: string) => {
    console.log("File clicked:", workspaceId, fileName);
    setSelectedFile(fileName);
    setWorkspaceId(workspaceId); 
};

  const fetchWorkspaces = async () => {
    const workspaceCollection = await getDocs(collection(db, 'users', auth.currentUser?.uid, 'workspaces'));
    const fetchedWorkspaces = workspaceCollection.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      files: doc.data().files || [],
      deleted: doc.data().deleted || false,
    })).filter(workspace => !workspace.deleted);
    setWorkspaces(fetchedWorkspaces);
  };
  

  const handleDeleteFile = async (workspaceId: string, fileName: string) => {
    try {
      const workspaceRef = doc(db, 'users', auth.currentUser?.uid, 'workspaces', workspaceId);
      const workspaceDoc = await getDoc(workspaceRef);
  
      if (workspaceDoc.exists()) {
        const updatedFiles = workspaceDoc.data().files.filter(file => file.name !== fileName);
  
      
        await updateDoc(workspaceRef, { files: updatedFiles });
        console.log('File reference removed from workspace successfully');
  
        
        const noteDocRef = doc(db, 'notes', `${workspaceId}_${fileName}`);
        await deleteDoc(noteDocRef);
        console.log('File deleted from notes collection successfully');
  
        
        setWorkspaces(prevWorkspaces =>
          prevWorkspaces.map(workspace =>
            workspace.id === workspaceId
              ? { ...workspace, files: updatedFiles }
              : workspace
          )
        );
  
        
        setCurrentWorkspace(prevWorkspace =>
          prevWorkspace?.id === workspaceId
            ? { ...prevWorkspace, files: updatedFiles }
            : prevWorkspace
        );
        
        
        if (updatedFiles.length === 0 || !updatedFiles.some(file => file.name === fileName)) {
          setSelectedFile(null);
        }
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  

  
  
const handleDeleteFolder = async (workspaceId: string) => {
  try {
      const workspaceRef = doc(db, 'users', auth.currentUser?.uid, 'workspaces', workspaceId);
      const workspaceDoc = await getDoc(workspaceRef);

      if (workspaceDoc.exists()) {
          const files = workspaceDoc.data().files || [];

          
          for (const file of files) {
              const noteDocRef = doc(db, 'notes', `${workspaceId}_${file.name}`);
              await deleteDoc(noteDocRef);
          }

          
          await deleteDoc(workspaceRef);
          console.log('Workspace and all associated files deleted successfully');

          fetchWorkspaces(); 
      }
  } catch (error) {
      console.error('Error deleting folder:', error);
  }
};

const handleAddNewFile = async (workspaceId: string) => {
  const fileName = "Untitled";

  try {
    const workspaceRef = doc(db, 'users', auth.currentUser?.uid, 'workspaces', workspaceId);
    const workspaceDoc = await getDoc(workspaceRef);

    if (workspaceDoc.exists()) {
      console.log('Workspace found:', workspaceDoc.data());
      const files = workspaceDoc.data().files || [];

      // Ensure the file name is unique by appending a number if necessary
      const newFileName = files.find(file => file.name.startsWith(fileName))
        ? `Untitled ${files.length + 1}`
        : fileName;

      const newFile = { name: newFileName, content: '' };
      files.push(newFile);

      // Update the Firestore workspace document
      await updateDoc(workspaceRef, { files });
      console.log('File added successfully');


      const noteDocRef = doc(db, 'notes', `${workspaceId}_${newFileName}`);
      await setDoc(noteDocRef, { title: newFileName, content: '' });


      setCurrentWorkspace(prevWorkspace => ({
        ...prevWorkspace,
        files: [...prevWorkspace.files, newFile],
      }));


      setWorkspaces(prevWorkspaces =>
        prevWorkspaces.map(workspace =>
          workspace.id === workspaceId
            ? { ...workspace, files: [...workspace.files, newFile] }
            : workspace
        )
      );


      setSelectedFile(newFileName);
      setWorkspaceId(workspaceId);
    } else {
      console.error('Workspace does not exist');
    }
  } catch (error) {
    console.error('Error adding file:', error);
  }


  setContextMenu({ x: 0, y: 0, workspaceId: null, selectedFile: null });
};





const contextMenuRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
            setContextMenu({ x: 0, y: 0, workspaceId: null, selectedFile: null });
        }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [contextMenuRef]);
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchWorkspaces();
    }
  
  }, [user]);

  const handleAddWorkspace = async () => {
    const workspaceName = prompt('Enter the name of the new workspace:');
    if (workspaceName) {
      try {
        await addDoc(collection(db, 'users', user.uid, 'workspaces'), {
          name: workspaceName,
          files: [{ name: "Untitled", content: 'Your notes go here...' }],
        });
        fetchWorkspaces();
      } catch (error) {
        console.error('Error adding workspace:', error);
      }
    }
  };

  const toggleWorkspaceFolders = (workspaceId: string) => {
    setWorkspaceFoldersOpen(prev => ({
      ...prev,
      [workspaceId]: !prev[workspaceId],
    }));
  };

  const [addWorkspaceContextMenu, setAddWorkspaceContextMenu] = useState<{ x: number, y: number } | null>(null);

  const addWorkspaceContextMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (
            (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) ||
            (addWorkspaceContextMenuRef.current && !addWorkspaceContextMenuRef.current.contains(event.target as Node))
        ) {
            setContextMenu({ x: 0, y: 0, workspaceId: null, selectedFile: null });
            setAddWorkspaceContextMenu(null);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [contextMenuRef, addWorkspaceContextMenuRef]);




  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleWorkspaceDropdown = () => {
    setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.min(Math.max(width + (moveEvent.clientX - startX), minWidth), maxWidth);
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const buttonTextColor = colorMode === 'light' ? 'text-gray-800' : 'text-whiteAlpha-900';
  const buttonHoverBg = colorMode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-600';

  return (
    <Box
      ref={sidebarRef}
      className="relative transition-all duration-300 h-screen flex flex-col"
      style={{
        width,
      }}
      bg={colorMode === 'light' ? 'gray.100' : 'dark.800'}
      color={colorMode === 'light' ? 'black' : 'white'}
    >
      <div className={`flex items-center justify-between p-4 w-full`}>
        <div className="flex items-center gap-2 flex-grow">
          <div
            className={`relative flex items-center justify-center ${colorMode === 'light' ? 'bg-gray-500' : 'bg-gray-700'} w-20 h-20 text-white rounded-full cursor-pointer`}
            onClick={toggleProfileDropdown}
          >
            <span className="text-3xl">{user?.displayName?.[0] || 'A'}</span>
            {isProfileDropdownOpen && (
              <div
                className={`absolute top-full left-0 mt-3 w-96 ${
                  colorMode === 'light' ? 'bg-white' : 'bg-gray-700'
                } border ${colorMode === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-lg shadow-lg z-10`}
              >
                <div
                  className={`px-12 py-8 ${
                    colorMode === 'light' ? 'text-gray-800 border-b border-gray-300' : 'text-white border-b border-gray-600'
                  }`}
                >
                  <p className="font-semibold text-lg">
                    {user?.displayName || 'User Name'}'s Workspace
                  </p>
                  <p className={`text-sm ${colorMode === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
                <ul className="py-6">
                  <li
                    className={`px-12 py-4 ${
                      colorMode === 'light' ? 'text-gray-800 hover:bg-gray-200' : 'text-white hover:bg-gray-600'
                    } text-base`}
                  >
                    Profile
                  </li>
                  <li
                    className={`px-12 py-4 ${
                      colorMode === 'light' ? 'text-gray-800 hover:bg-gray-200' : 'text-white hover:bg-gray-600'
                    } text-base`}
                  >
                    Settings
                  </li>
                  <li
                    className={`px-12 py-4 ${
                      colorMode === 'light' ? 'text-gray-800 hover:bg-gray-200' : 'text-white hover:bg-gray-600'
                    } text-base`}
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex-1 flex items-center justify-center">
            <h1 className={`text-3xl font-semibold truncate ${colorMode === 'light' ? 'text-black' : 'text-white'}`}>
              Your Workspace!
            </h1>
          </div>
        </div>
      </div>
  
      <div className="flex-1 flex flex-col space-y-4 p-4 text-base overflow-y-auto">
        <button className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg}`}>
          <FaClipboardCheck className={`text-2xl ${buttonTextColor}`} />
          <span className={buttonTextColor}>Getting Started</span>
        </button>

      
        {currentWorkspace?.files.map((file: File) => (
          <button
            key={file.name}
            className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg}`}
            onClick={() => handleFileClick(currentWorkspace.id, file.name)}
            onContextMenu={(e) => {
              e.preventDefault();
              handleRightClick(e, currentWorkspace.id, file.name);
            }}
          >
            <HiDocument className={`text-2xl ${buttonTextColor}`} />
            <span className={buttonTextColor}>
              {file.name}
            </span>
          </button>
        ))}

        <button className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg}`}>
          <RiMindMap className={`text-2xl ${buttonTextColor}`} />
          <span className={buttonTextColor}>Mind Map</span>
        </button>
        <button className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg} mt-4`}>
          <HiChat className={`text-2xl ${buttonTextColor}`} />
          <span className={buttonTextColor}>QuickNotez AI</span>
        </button>
        <button className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg}`}>
          <HiTemplate className={`text-2xl ${buttonTextColor}`} />
          <span className={buttonTextColor}>Templates</span>
        </button>
        <button className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg}`}>
          <HiChartBar className={`text-2xl ${buttonTextColor}`} />
          <span className={buttonTextColor}>Productivity Dashboard</span>
        </button>
      </div>
  
      <div className="flex items-center justify-between p-4 border-t text-base">
  <Menu >
    <MenuButton
      as={Button}
      className={`flex-grow ${colorMode === 'dark' ? 'bg-transparent' : ''}`}
      bg="transparent"
      _hover={{ bg: colorMode === 'light' ? 'gray.200' : 'gray.600' }}
    >
      <div className="flex items-center">
        <BsChevronExpand className="mr-2" />  {/* Icon placed before the text with margin to the right */}
        <span>{currentWorkspace ? currentWorkspace.name : 'Select Workspace'}</span>
      </div>
  </MenuButton>


    
    <MenuList>
      {workspaces.map((workspace) => (
        <MenuItem
          key={workspace.id}
          icon={<HiFolder />}
          onClick={() => {
            handleWorkspaceSelect(workspace);
            setWorkspaceId(workspace.id);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            handleRightClick(e, workspace.id);
          }}
        >
          {workspace.name}
        </MenuItem>
      ))}
      <MenuItem
        icon={<HiPlus />}
        onClick={(e) => {
          e.stopPropagation();
          handleAddWorkspace();
        }}
      >
        Create New Workspace
      </MenuItem>
    </MenuList>
  </Menu>

  <div className="flex items-center ">
      <IconButton
        aria-label="Help and Support"
        icon={<HiQuestionMarkCircle />}
        bg="transparent"
        _hover={{ bg: colorMode === 'light' ? 'gray.200' : 'gray.600' }}
        onClick={() => console.log("Help and Support Clicked")}
      />
      <IconButton
        aria-label="Toggle Light Mode"
        icon={colorMode === 'dark' ? <HiSun /> : <HiMoon />}
        bg="transparent"
        _hover={{ bg: colorMode === 'light' ? 'gray.200' : 'gray.600' }}
        onClick={toggleColorMode}
      />
</div>

</div>

      


{contextMenu.workspaceId && (
    <div
        ref={contextMenuRef}
        className="absolute z-50 border shadow-lg"
        style={{
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: colorMode === 'dark' ? '#2D3748' : '#ffffff', 
            borderColor: colorMode === 'dark' ? '#4A5568' : '#CBD5E0',
            color: colorMode === 'dark' ? '#E2E8F0' : '#2D3748', 
        }}
        onClick={() => setContextMenu({ x: 0, y: 0, workspaceId: null, selectedFile: null })}
    >
        {contextMenu.selectedFile ? (
            <button
                className="block w-full px-4 py-2 text-left text-sm"
                style={{
                    backgroundColor: colorMode === 'dark' ? 'var(--chakra-colors-dark-800)' : 'var(--chakra-colors-gray-100)',
                    color: colorMode === 'dark' ? '#E2E8F0' : '#2D3748',
                    transition: 'background-color 0.2s ease'
                }}
                onClick={(e) => {
                    e.stopPropagation(); 
                    handleDeleteFile(contextMenu.workspaceId, contextMenu.selectedFile);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colorMode === 'dark' ? '#4A5568' : '#E2E8F0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colorMode === 'dark' ? 'var(--chakra-colors-dark-800)' : 'var(--chakra-colors-gray-100)';
                }}

            >
                Delete File
            </button>
        ) : (
            <>
                <button
                    className="block w-full px-4 py-2 text-left text-sm"
                    style={{
                        backgroundColor: colorMode === 'dark' ? 'var(--chakra-colors-dark-800)' : 'var(--chakra-colors-gray-100)',
                        color: colorMode === 'dark' ? '#E2E8F0' : '#2D3748', 
                        transition: 'background-color 0.2s ease'
                    }}
                    onClick={() => handleDeleteFolder(contextMenu.workspaceId)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colorMode === 'dark' ? '#4A5568' : '#E2E8F0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colorMode === 'dark' ? 'var(--chakra-colors-dark-800)' : 'var(--chakra-colors-gray-100)';
                    }}
                >
                    Delete Folder
                </button>
                <button
                    className="block w-full px-4 py-2 text-left text-sm"
                    style={{
                        backgroundColor: colorMode === 'dark' ? 'var(--chakra-colors-dark-800)' : '#F7FAFC',
                        color: colorMode === 'dark' ? '#E2E8F0' : '#2D3748', 
                        transition: 'background-color 0.2s ease'
                    }}
                    onClick={() => handleAddNewFile(contextMenu.workspaceId)}
                    
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colorMode === 'dark' ? '#4A5568' : '#E2E8F0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colorMode === 'dark' ? 'var(--chakra-colors-dark-800)' : 'var(--chakra-colors-gray-100)';
                    }}

                >
                    Add New File
                </button>

                
            </>
        )}


    </div>
)}

{addWorkspaceContextMenu && (
        <div
            ref={addWorkspaceContextMenuRef}
            className="absolute z-50 border shadow-lg"
            style={{
                top: addWorkspaceContextMenu.y,
                left: addWorkspaceContextMenu.x,
                backgroundColor: colorMode === 'dark' ? '#2D3748' : '#ffffff',
                borderColor: colorMode === 'dark' ? '#4A5568' : '#CBD5E0',
                color: colorMode === 'dark' ? '#E2E8F0' : '#2D3748',
            }}
            onClick={() => setAddWorkspaceContextMenu(null)}
        >
            <button
                className="block w-full px-4 py-2 text-left text-sm"
                style={{
                  backgroundColor: colorMode === 'dark' ? 'var(--chakra-colors-dark-800)' : 'var(--chakra-colors-gray-100)',
                    color: colorMode === 'dark' ? '#E2E8F0' : '#2D3748',
                    transition: 'background-color 0.2s ease',
                }}  
                onClick={(e) => {
                    e.stopPropagation();
                    handleAddWorkspace();
                    setAddWorkspaceContextMenu(null);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colorMode === 'dark' ? '#4A5568' : '#E2E8F0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colorMode === 'dark' ? 'var(--chakra-colors-dark-800)' : 'var(--chakra-colors-gray-100)';
                }}
            >
                Create New Workspace 
            </button>
        </div>
      )}
<div
  ref={resizerRef}
  className={`absolute top-0 right-0 w-0.5 h-full cursor-col-resize ${colorMode === 'light' ? 'bg-gray-300' : ''}`}
  onMouseDown={handleMouseDown}
/>

  </Box>
);
};
export default Sidebar;