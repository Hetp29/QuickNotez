import dynamic from 'next/dynamic';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import { debounce } from 'lodash';
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
    const titleRef = useRef(title);
    const contentRef = useRef(content);

    useEffect(() => {
        titleRef.current = title;
        contentRef.current = content;
    }, [title, content]);

    const saveNote = useCallback(async () => {
        if (selectedFile && workspaceId) {
            const noteDoc = doc(db, 'notes', `${workspaceId}_${selectedFile}`);
            await setDoc(noteDoc, { title: titleRef.current, content: contentRef.current }, { merge: true });
        }
    }, [selectedFile, workspaceId]);

    const debouncedSaveNote = useCallback(debounce(saveNote, 500), [saveNote]);

    const debouncedTitleChange = useCallback(debounce((newTitle) => {
        onTitleChange(newTitle);
    }, 500), [onTitleChange]);

    useEffect(() => {
        const loadNote = async () => {
            if (selectedFile && workspaceId) {
                const noteDoc = doc(db, 'notes', `${workspaceId}_${selectedFile}`);
                const docSnap = await getDoc(noteDoc);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data.title || '');
                    setContent(data.content || '');
                }
            }
        };
        loadNote();
    }, [selectedFile, workspaceId]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        debouncedSaveNote();
        debouncedTitleChange(newTitle);
    };

    const handleContentChange = (value: string) => {
        setContent(value);
        debouncedSaveNote();
    };

    const isDarkMode = colorMode === 'dark';

    return (
        <Box padding="40px" height="100%" color={isDarkMode ? 'white' : 'black'}>
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
