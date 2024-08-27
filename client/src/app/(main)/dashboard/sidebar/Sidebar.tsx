import React, { useState, useEffect, useRef } from 'react';
import { 
  HiChevronRight, HiPlus, HiMoon, HiSun, 
  HiChat, HiTrash, HiQuestionMarkCircle, HiDocument, 
  HiTemplate, HiCalendar, HiChartBar, HiShare, HiChevronDown, HiDotsVertical 
} from 'react-icons/hi';
import { useColorMode, Box, Collapse, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
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
}> = ({ setSelectedFile, setWorkspaceId }) => {
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


  const { colorMode, toggleColorMode } = useColorMode();
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [workspaceFoldersOpen, setWorkspaceFoldersOpen] = useState<{ [key: string]: boolean }>({});

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
    const workspaceRef = doc(db, 'users', auth.currentUser?.uid, 'workspaces', workspaceId);
    const workspaceDoc = await getDoc(workspaceRef);
    if (workspaceDoc.exists()) {
      const updatedFiles = workspaceDoc.data().files.filter(file => file.name !== fileName);
      await updateDoc(workspaceRef, { files: updatedFiles });
      fetchWorkspaces();
      console.log('File deleted successfully');
    }
  };
  
  const handleDeleteFolder = async (workspaceId: string) => {
    const workspaceRef = doc(db, 'users', auth.currentUser?.uid, 'workspaces', workspaceId);
    await deleteDoc(workspaceRef);
    fetchWorkspaces();
    console.log('Folder deleted successfully');
  };
  
  
const [fileName, setFileName] = useState<string>('');

  

const handleAddNewFile = async (workspaceId: string) => {
  const fileName = "Untitled"; // Initial name for the new file
  try {
      const workspaceRef = doc(db, 'users', auth.currentUser?.uid, 'workspaces', workspaceId);
      const workspaceDoc = await getDoc(workspaceRef);

      if (workspaceDoc.exists()) {
          console.log('Workspace found:', workspaceDoc.data());
          const files = workspaceDoc.data().files || [];
          
          // Check if a file with the same name already exists
          const newFileName = files.find(file => file.name === fileName) 
              ? `${fileName}_${files.length + 1}` // Ensure uniqueness
              : fileName;

          const newFile = { name: newFileName, content: '' };
          files.push(newFile);

          await updateDoc(workspaceRef, { files });
          console.log('File added successfully');

          // Create a corresponding document in the notes collection
          const noteDocRef = doc(db, 'notes', `${workspaceId}_${newFileName}`);
          await setDoc(noteDocRef, { title: newFileName, content: '' });

          // Update the selected file and workspace to trigger NoteEditor loading
          setSelectedFile(newFileName);
          setWorkspaceId(workspaceId);

          fetchWorkspaces(); // Refresh the workspace list to include the new file
      }
  } catch (error) {
      console.error('Error adding file:', error);
  }
  setContextMenu({ x: 0, y: 0, workspaceId: null, selectedFile: null }); // Close the context menu
};


  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchWorkspaces();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className={`flex items-center justify-between p-4 border-b ${colorMode === 'light' ? 'border-gray-400' : 'border-gray-600'} w-full`}>
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
        <button className="p-2" onClick={handleAddWorkspace}>
          <HiPlus className={`text-3xl ${colorMode === 'light' ? 'text-gray-800' : 'text-white'}`} />
        </button>
      </div>
  
      <div className="flex-1 flex flex-col space-y-4 p-4 text-base overflow-y-auto">
        <button
          className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg}`}
          onClick={toggleWorkspaceDropdown}
        >
          {isWorkspaceDropdownOpen ? (
            <HiChevronDown className={`text-2xl ${buttonTextColor}`} />
          ) : (
            <HiChevronRight className={`text-2xl ${buttonTextColor}`} />
          )}
          <span className={buttonTextColor}>Add Workspace</span>
        </button>
  
        {isWorkspaceDropdownOpen && (
  <Box pl={8} mt={2}>
    {workspaces.map((workspace: Workspace, index: number) => (
      <div key={workspace.id} className="ml-2" onContextMenu={(e) => handleRightClick(e, workspace.id)}>
        <button
          className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg}`}
          onClick={() => toggleWorkspaceFolders(workspace.id)}
        >
          {workspaceFoldersOpen[workspace.id] ? (
            <HiChevronDown className={`text-2xl ${buttonTextColor}`} />
          ) : (
            <HiChevronRight className={`text-2xl ${buttonTextColor}`} />
          )}
          <span className={buttonTextColor}>{workspace.name}</span>
        </button>
        <Collapse in={workspaceFoldersOpen[workspace.id]} animateOpacity>
          <Box pl={8} mt={2} style={{ transition: 'all 0.3s ease-in-out' }}>
            {workspace.files.map((file: File, fileIndex: number) => (
              <button
                key={fileIndex}
                className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg}`}
                onClick={() => handleFileClick(workspace.id, file.name)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleRightClick(e, workspace.id, file.name);
                }}
              >
                <HiDocument className={`text-2xl ${buttonTextColor}`} />
                <span className={buttonTextColor}>{file.name}</span>
              </button>
            ))}
          </Box>
        </Collapse>
      </div>
    ))}
  </Box>
)}

  
        <button className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg} mt-4`}>
          <HiChat className={`text-2xl ${buttonTextColor}`} />
          <span className={buttonTextColor}>QuickNotez AI</span>
        </button>
        <button className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg}`}>
          <HiShare className={`text-2xl ${buttonTextColor}`} />
          <span className={buttonTextColor}>Collaboration & Sharing</span>
        </button>
        <button className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg}`}>
          <HiTemplate className={`text-2xl ${buttonTextColor}`} />
          <span className={buttonTextColor}>Templates & Automation</span>
        </button>
        <button className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg}`}>
          <HiCalendar className={`text-2xl ${buttonTextColor}`} />
          <span className={buttonTextColor}>Calendar & Reminders</span>
        </button>
        <button className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg}`}>
          <HiChartBar className={`text-2xl ${buttonTextColor}`} />
          <span className={buttonTextColor}>Productivity Dashboard</span>
        </button>
      </div>
  
      <div className="p-4 border-t border-gray-400 text-base">
        <button className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg} mb-2`}>
          <HiTrash className={`text-2xl ${buttonTextColor}`} />
          <span className={buttonTextColor}>Trash</span>
        </button>
        <button className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg} mb-2`}>
          <HiQuestionMarkCircle className={`text-2xl ${buttonTextColor}`} />
          <span className={buttonTextColor}>Help and Support</span>
        </button>
        <button
          className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg}`}
          onClick={toggleColorMode}
        >
          {colorMode === 'dark' ? (
            <>
              <HiSun className={`text-2xl ${buttonTextColor}`} />
              <span className={buttonTextColor}>Light Mode</span>
            </>
          ) : (
            <>
              <HiMoon className={`text-2xl ${buttonTextColor}`} />
              <span className={buttonTextColor}>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {contextMenu.workspaceId && (
    <div
        className="absolute z-50 bg-white border border-gray-300 shadow-lg"
        style={{ top: contextMenu.y, left: contextMenu.x }}
        onClick={() => setContextMenu({ x: 0, y: 0, workspaceId: null, selectedFile: null })}
    >
        {contextMenu.selectedFile ? (
            <button
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleDeleteFile(contextMenu.workspaceId, contextMenu.selectedFile);
              }}
            >
                Delete File
            </button>
        ) : (
            <>
                <button
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-200"
                    onClick={() => handleDeleteFolder(contextMenu.workspaceId)}
                >
                    Delete Folder
                </button>
                <button
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-200"
                    onClick={() => handleAddNewFile(contextMenu.workspaceId)}
                >
                    Add New File
                </button>
            </>
        )}
    </div>
)}

<div
      ref={resizerRef}
      className={`absolute top-0 right-0 w-1 h-full cursor-col-resize ${colorMode === 'light' ? 'bg-gray-300' : 'bg-gray-700'}`}
      onMouseDown={handleMouseDown}
    />
  </Box>
);
};
export default Sidebar;