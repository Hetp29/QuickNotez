import React, { useState, useEffect, useRef } from 'react';
import { HiChevronRight, HiPlus, HiChartBar, HiCalendar, HiTemplate, HiShare, HiChat, HiTrash, HiQuestionMarkCircle, HiArrowUp, HiMoon } from 'react-icons/hi';
import { useColorMode, Box } from '@chakra-ui/react';
import { auth } from '../../../../../firebaseConfig';

const Sidebar: React.FC = () => {
    const minWidth = 400;
    const maxWidth = 700;
    const [width, setWidth] = useState<number>(400);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState<firebase.User | null>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const resizerRef = useRef<HTMLDivElement>(null);

    // Dark mode functionality
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
        const savedWidth = localStorage.getItem('sidebarWidth');
        if (savedWidth) {
            setWidth(parseInt(savedWidth, 10));
        }
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        localStorage.setItem('sidebarWidth', width.toString());
    }, [width]);

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

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCreateNewPage = () => {
        console.log('Create new page');
    };

    const buttonTextColor = colorMode === 'light' ? 'gray.800' : 'whiteAlpha.900';
    const buttonHoverBg = colorMode === 'light' ? 'gray.200' : 'gray.600';

    return (
        <Box
            ref={sidebarRef}
            className="relative transition-all duration-300 h-screen flex flex-col"
            style={{ width }}
            bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
            color={colorMode === 'light' ? 'black' : 'white'}
        >
            <div className="flex items-center justify-between p-4 border-b border-gray-400 w-full">
                <div className="flex items-center gap-2 flex-grow">
                    <div
                        className="relative flex items-center justify-center bg-gray-500 w-20 h-20 text-white rounded-full cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <span className="text-3xl">{user?.displayName?.[0] || 'A'}</span>
                        {isDropdownOpen && (
                            <div className={`absolute top-full left-0 mt-3 w-96 bg-${colorMode === 'light' ? 'white' : 'gray.700'} border border-gray-300 rounded-lg shadow-lg z-10`}>
                                <div className="px-12 py-8 text-gray-800 border-b border-gray-300">
                                    <p className="font-semibold text-lg">{user?.displayName || 'User Name'}'s Workspace</p>
                                    <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                                </div>
                                <ul className="py-6">
                                    <li className={`px-12 py-4 text-${buttonTextColor} hover:bg-${buttonHoverBg} text-base`}>Profile</li>
                                    <li className={`px-12 py-4 text-${buttonTextColor} hover:bg-${buttonHoverBg} text-base`}>Settings</li>
                                    <li className={`px-12 py-4 text-${buttonTextColor} hover:bg-${buttonHoverBg} text-base`}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <h1 className="text-3xl font-semibold truncate">
                            Your Workspace!
                        </h1>
                    </div>
                </div>
                <button
                    className="p-2"
                    onClick={handleCreateNewPage}
                >
                    <HiPlus className={`text-${buttonTextColor} text-3xl`} />
                </button>
            </div>

            <div className="flex-1 flex flex-col space-y-4 p-4 text-base">
                <button className={`flex items-center gap-2 p-2 rounded hover:bg-${buttonHoverBg}`}>
                    <HiChat className={`text-${buttonTextColor} text-2xl`} />
                    <span className={`text-${buttonTextColor}`}>QuickNotez AI</span>
                </button>
                <button className={`flex items-center gap-2 p-2 rounded hover:bg-${buttonHoverBg}`}>
                    <HiChevronRight className={`text-${buttonTextColor} text-2xl`} />
                    <span className={`text-${buttonTextColor}`}>Your Workspaces</span>
                </button>
                <button className={`flex items-center gap-2 p-2 rounded hover:bg-${buttonHoverBg}`}>
                    <HiShare className={`text-${buttonTextColor} text-2xl`} />
                    <span className={`text-${buttonTextColor}`}>Collaboration & Sharing</span>
                </button>
                <button className={`flex items-center gap-2 p-2 rounded hover:bg-${buttonHoverBg}`}>
                    <HiTemplate className={`text-${buttonTextColor} text-2xl`} />
                    <span className={`text-${buttonTextColor}`}>Templates & Automation</span>
                </button>
                <button className={`flex items-center gap-2 p-2 rounded hover:bg-${buttonHoverBg}`}>
                    <HiCalendar className={`text-${buttonTextColor} text-2xl`} />
                    <span className={`text-${buttonTextColor}`}>Calendar & Reminders</span>
                </button>
                <button className={`flex items-center gap-2 p-2 rounded hover:bg-${buttonHoverBg}`}>
                    <HiChartBar className={`text-${buttonTextColor} text-2xl`} />
                    <span className={`text-${buttonTextColor}`}>Productivity Dashboard</span>
                </button>

                {/* Light/Dark Mode Toggle Button */}
                <button className={`flex items-center gap-2 p-2 rounded hover:bg-${buttonHoverBg}`} onClick={toggleColorMode}>
                    <HiMoon className={`text-${buttonTextColor} text-2xl`} />
                    <span className={`text-${buttonTextColor}`}>{colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </div>

            <div className="p-4 border-t border-gray-400 text-base">
                <button className={`flex items-center gap-2 p-2 rounded hover:bg-${buttonHoverBg} mb-2`}>
                    <HiTrash className={`text-${buttonTextColor} text-2xl`} />
                    <span className={`text-${buttonTextColor}`}>Trash</span>
                </button>
                <button className={`flex items-center gap-2 p-2 rounded hover:bg-${buttonHoverBg} mb-2`}>
                    <HiQuestionMarkCircle className={`text-${buttonTextColor} text-2xl`} />
                    <span className={`text-${buttonTextColor}`}>Help and Support</span>
                </button>
                <button className={`flex items-center gap-2 p-2 rounded hover:bg-${buttonHoverBg}`}>
                    <HiArrowUp className={`text-${buttonTextColor} text-2xl`} />
                    <span className={`text-${buttonTextColor}`}>Upgrade Plan</span>
                </button>
            </div>

            <div
                ref={resizerRef}
                onMouseDown={handleMouseDown}
                className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-gray-300 border-r border-gray-400"
                style={{ zIndex: 1000 }}
            />
        </Box>
    );
};

export default Sidebar;
