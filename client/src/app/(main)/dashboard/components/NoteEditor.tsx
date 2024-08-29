import dynamic from 'next/dynamic';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import { db, doc, setDoc, getDoc } from '../../../../../firebaseConfig';
import { Box, useColorMode } from '@chakra-ui/react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface NoteEditorProps {
    selectedFile: string | null;
    workspaceId: string | null;
    onTitleChange: (newTitle: string) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ selectedFile, workspaceId, onTitleChange }) => {
    const { colorMode } = useColorMode();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const titleInputRef = useRef<HTMLInputElement>(null); // Ref for the title input field

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

    useEffect(() => {
        const loadNote = async () => {
            if (!selectedFile || !workspaceId) return;

            try {
                const noteDoc = doc(db, 'notes', `${workspaceId}_${selectedFile}`);
                const docSnap = await getDoc(noteDoc);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data?.title || '');
                    setContent(data?.content || '');
                    titleRef.current = data?.title || '';
                    contentRef.current = data?.content || '';
                    console.log(`Loaded note: {title: ${data?.title}, content: ${data?.content}}`);
                } else {
                    // If the document does not exist, set it up as a new one with default values
                    const defaultTitle = 'Untitled';
                    setTitle(defaultTitle);
                    setContent('');
                    titleRef.current = defaultTitle;
                    contentRef.current = '';
                    await setDoc(noteDoc, { title: defaultTitle, content: '' });
                    console.log('Default note created');
                }
            } catch (error) {
                console.error('Error loading document:', error);
            }
        };
        loadNote();
    }, [selectedFile, workspaceId]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        titleRef.current = newTitle;

        // Update the title in the parent component
        onTitleChange(newTitle);

        // Save without debounce
        saveNote();
    };

    useEffect(() => {
        // Restore focus to the title input field after re-render
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [title]);

    const handleContentChange = (value: string) => {
        setContent(value);
        contentRef.current = value;

        // Save without debounce
        saveNote();
    };

    const isDarkMode = colorMode === 'dark';

    return (
        <Box
            padding="40px"
            height="100%"
            color={isDarkMode ? 'white' : 'black'}
        >
            <input
                ref={titleInputRef} // Attach ref to the input field
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