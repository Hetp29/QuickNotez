import dynamic from 'next/dynamic';
import React, { useState, useEffect, useCallback } from 'react';
import 'react-quill/dist/quill.snow.css';
import { db, doc, setDoc, getDoc, updateDoc } from '../../../../../firebaseConfig';
import { debounce } from 'lodash';
import { useColorMode, Box } from '@chakra-ui/react';
import { auth } from '../../../../../firebaseConfig';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface NoteEditorProps {
    selectedFile: string | null;
    workspaceId: string | null;
    updateFileName: (oldName: string, newName: string) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ selectedFile, workspaceId, updateFileName }) => {
    const { colorMode } = useColorMode();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const saveNote = useCallback(
        async (plainTextContent: string, noteTitle: string) => {
            if (selectedFile && workspaceId) {
                const noteDoc = doc(db, 'notes', `${workspaceId}_${selectedFile}`);
                try {
                    await setDoc(noteDoc, { title: noteTitle, content: plainTextContent }, { merge: true });

                    // Update the file name if it has changed
                    if (noteTitle !== selectedFile) {
                        const workspaceDocRef = doc(db, 'users', auth.currentUser?.uid, 'workspaces', workspaceId);
                        const workspaceDocSnap = await getDoc(workspaceDocRef);

                        if (workspaceDocSnap.exists()) {
                            const workspaceData = workspaceDocSnap.data();
                            const updatedFiles = workspaceData.files.map((file: any) =>
                                file.name === selectedFile ? { ...file, name: noteTitle } : file
                            );

                            await updateDoc(workspaceDocRef, { files: updatedFiles });
                            updateFileName(selectedFile, noteTitle);
                        }
                    }
                    console.log(`Saved note with title "${noteTitle}" and content: ${plainTextContent}`);
                } catch (error) {
                    console.error('Error saving document:', error);
                }
            }
        },
        [selectedFile, workspaceId, updateFileName]
    );

    const debouncedSaveNote = useCallback(
        debounce((content: string, title: string) => {
            const plainTextContent = content.replace(/<\/?[^>]+(>|$)/g, '');
            saveNote(plainTextContent, title);
        }, 500),
        [saveNote]
    );

    useEffect(() => {
        const loadNote = async () => {
          if (selectedFile && workspaceId) {
            const noteDoc = doc(db, 'notes', `${workspaceId}_${selectedFile}`);
            try {
              const docSnap = await getDoc(noteDoc);
              if (docSnap.exists()) {
                const data = docSnap.data();
                setTitle(data.title || 'Untitled');
                setContent(data.content || '');
                console.log(`Loaded note with title "${data.title}" and content: ${data.content}`);
              } else {
                setTitle('Untitled'); // Default title for new notes
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
        debouncedSaveNote(value, title);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        debouncedSaveNote(content, newTitle); // Save the note with the new title
        updateFileName(selectedFile || '', newTitle); // Update file name in Sidebar and Firebase
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
                placeholder="Title"
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
                    borderBottom: `2px solid ${isDarkMode ? '#2d3748' : '#e0e0e0'}`,
                }}
            />
            <ReactQuill
                value={content}
                onChange={handleContentChange}
                style={{
                    height: 'calc(100% - 100px)',
                    color: isDarkMode ? '#e2e8f0' : '#000000',
                    borderRadius: '8px',
                    padding: '20px',
                    border: 'none',
                }}
            />
        </Box>
    );
};

export default NoteEditor;
