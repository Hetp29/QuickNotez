import React, { useState, useEffect, useRef } from 'react';
import { 
  HiChevronRight, HiPlus, HiMoon, HiSun, HiUser, HiSettings, HiLogout, 
  HiChat, HiTrash, HiQuestionMarkCircle, HiDocument, HiArrowUp, 
  HiTemplate, HiCalendar, HiChartBar, HiShare, HiUsers, HiChevronDown 
} from 'react-icons/hi';
import { useColorMode, Box, Collapse } from '@chakra-ui/react';
import { auth } from '../../../../../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../../../firebaseConfig';

const Sidebar: React.FC = () => {
  const minWidth = 400;
  const maxWidth = 700;
  const [width, setWidth] = useState<number>(400);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false); 
  const [user, setUser] = useState<firebase.User | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  const { colorMode, toggleColorMode } = useColorMode();
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [workspaceFoldersOpen, setWorkspaceFoldersOpen] = useState<{ [key: string]: boolean }>({});

  const fetchWorkspaces = async () => {
    if (user) {
      try {
        const workspaceCollection = await getDocs(collection(db, 'users', user.uid, 'workspaces'));
        const fetchedWorkspaces = workspaceCollection.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          files: doc.data().files || [],
        }));
        setWorkspaces(fetchedWorkspaces);
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      }
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleAddWorkspace = async () => {
    const workspaceName = prompt('Enter the name of the new workspace:');
    if (workspaceName) {
      try {
        await addDoc(collection(db, 'users', user.uid, 'workspaces'), {
          name: workspaceName,
          files: [{ name: "Type here...", content: 'Your notes go here...' }],
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

  const generateInitials = (name: string) => {
    const initials = name.split(' ').map((word) => word[0]).join('');
    return initials.toUpperCase();
  };

  return (
    <Box
        ref={sidebarRef}
        className="relative transition-all duration-300 h-screen flex flex-col"
        style={{
            width,
            borderRight: colorMode === 'light' ? ' #e2e8f0' : ' #2d3748',
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
            {workspaces.map(workspace => (
              <div key={workspace.id} className="ml-2">
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
                    {workspace.files.map((file, index) => (
                      <button
                        key={index}
                        className={`flex items-center gap-2 p-2 rounded ${buttonHoverBg}`}
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

      <div
        ref={resizerRef}
        className={`absolute top-0 right-0 w-1 h-full cursor-col-resize ${colorMode === 'light' ? 'bg-gray-300' : 'bg-gray-700'}`}
        onMouseDown={handleMouseDown}
      />
    </Box>
  );
};

export default Sidebar;
