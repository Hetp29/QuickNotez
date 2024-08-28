import dynamic from 'next/dynamic';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import { db, doc, setDoc, getDoc } from '../../../../../firebaseConfig';
import { debounce } from 'lodash';
import { Box, useColorMode } from '@chakra-ui/react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface NoteEditorProps {
    selectedFile: string | null;
    workspaceId: string | null;
    updateFileName: (oldName: string, newName: string) => void; // Ensure this is in the props
    onTitleChange: (newTitle: string) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ selectedFile, workspaceId, updateFileName, onTitleChange }) => {
    const { colorMode } = useColorMode();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const titleRef = useRef(title);
    const contentRef = useRef(content);

    const saveNote = useCallback(async () => {
        if (selectedFile && workspaceId) {
            const noteDoc = doc(db, 'notes', `${workspaceId}_${selectedFile}`);
            try {
                await setDoc(noteDoc, { title: titleRef.current, content: contentRef.current }, { merge: true });
                console.log(`Saved note: {title: ${titleRef.current}, content: ${contentRef.current}}`);
            } catch (error) {
                console.error('Error saving document:', error);
            }
        }
    }, [selectedFile, workspaceId]);

    const debouncedSaveNote = useCallback(debounce(() => saveNote(), 300), [saveNote]);

    useEffect(() => {
        const loadNote = async () => {
            if (selectedFile && workspaceId) {
                const noteDoc = doc(db, 'notes', `${workspaceId}_${selectedFile}`);
                try {
                    console.log(`Fetching document for path: notes/${workspaceId}_${selectedFile}`);
                    const docSnap = await getDoc(noteDoc);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setTitle(data?.title || 'Untitled');
                        setContent(data?.content || '');
                        titleRef.current = data?.title || '';
                        contentRef.current = data?.content || '';
                        console.log(`Loaded note: {title: ${data?.title}, content: ${data?.content}}`);
                    } else {
                        console.log('No such document!');
                        setTitle('Untitled');
                        setContent('');
                        titleRef.current = 'Untitled';
                        contentRef.current = '';
                    }
                } catch (error) {
                    console.error('Error loading document:', error);
                }
            } else {
                console.error('Error: selectedFile or workspaceId is null');
            }
        };
        loadNote();
    }, [selectedFile, workspaceId]);

    const handleContentChange = (value: string) => {
        setContent(value);
        contentRef.current = value;
        debouncedSaveNote();
        console.log(`Content changed: ${value}`);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        const oldTitle = titleRef.current;
        setTitle(newTitle);
        titleRef.current = newTitle;
        debouncedSaveNote();
        console.log(`Title changed: ${newTitle}`);

        if (selectedFile && updateFileName) {
            updateFileName(oldTitle, newTitle);  
        }

        if (onTitleChange) {
            onTitleChange(newTitle);
        }
    };

    const isDarkMode = colorMode === 'dark';

    return (
        <Box
            padding="40px"
            height="100%"
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
