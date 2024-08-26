import dynamic from 'next/dynamic';
import React, { useState, useEffect, useCallback } from 'react';
import 'react-quill/dist/quill.snow.css';
import { db, doc, setDoc, getDoc } from '../../../../../firebaseConfig';
import { debounce } from 'lodash';
import { useColorMode, Box } from '@chakra-ui/react'; // Import useColorMode and Box from Chakra UI

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface NoteEditorProps {
    selectedFile: string | null;
    workspaceId: string | null;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ selectedFile, workspaceId }) => {
    const { colorMode } = useColorMode(); // Use useColorMode to determine the current theme
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Function to save title and content to Firebase
    const saveNote = useCallback(async (plainTextContent: string, noteTitle: string) => {
        if (selectedFile && workspaceId) {
            const noteDoc = doc(db, 'notes', `${workspaceId}_${selectedFile}`);
            try {
                await setDoc(noteDoc, { title: noteTitle, content: plainTextContent }, { merge: true });
                console.log(`Saved note with title "${noteTitle}" and content: ${plainTextContent}`);
            } catch (error) {
                console.error('Error saving document:', error);
            }
        }
    }, [selectedFile, workspaceId]);

    // Debounce the save function to avoid frequent calls
    const debouncedSaveNote = useCallback(debounce((content: string, title: string) => {
        const plainTextContent = content.replace(/<\/?[^>]+(>|$)/g, "");
        saveNote(plainTextContent, title);
    }, 500), [saveNote]);

    // Load title and content when a new file is selected
    useEffect(() => {
        const loadNote = async () => {
            if (selectedFile && workspaceId) {
                const noteDoc = doc(db, 'notes', `${workspaceId}_${selectedFile}`);
                try {
                    const docSnap = await getDoc(noteDoc);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setTitle(data.title || '');
                        setContent(data.content || '');
                        console.log(`Loaded note with title "${data.title}" and content: ${data.content}`);
                    } else {
                        console.log('No such document!');
                        setTitle('');
                        setContent('');
                    }
                } catch (error) {
                    console.error('Error loading document:', error);
                }
            }
        };

        loadNote();
    }, [selectedFile, workspaceId]);

    const handleContentChange = (value: string) => {
        setContent(value);
        debouncedSaveNote(value, title); // Save both title and content
        console.log(`Content changed: ${value}`);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        debouncedSaveNote(content, e.target.value); // Save both title and content
        console.log(`Title changed: ${e.target.value}`);
    };

    const isDarkMode = colorMode === 'dark';

    return (
        <Box
            padding="40px"
            height="100%"
            backgroundColor={isDarkMode ? 'dark.900' : 'gray.100'}
            color={isDarkMode ? 'white' : 'black'}
        >
            <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Untitled"
                style={{
                    width: '100%',
                    fontSize: '2.5rem',
                    fontWeight: '600',
                    marginBottom: '20px',
                    padding: '10px 0',
                    backgroundColor: 'transparent',
                    color: isDarkMode ? '#e2e8f0' : '#2e2e2e',
                    border: 'none',
                    outline: 'none',
                    
                }}
            />
            <ReactQuill
                value={content}
                onChange={handleContentChange}
                style={{
                    height: 'calc(100% - 100px)',
                    backgroundColor: isDarkMode ? '' : '',
                    color: isDarkMode ? '#e2e8f0' : '#000000',
                    borderRadius: '8px',
                    boxShadow: isDarkMode ? '0 1px 3px rgba(0, 0, 0, 0.5)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    border: 'none'
                }}
            />
        </Box>
    );
};

export default NoteEditor;
