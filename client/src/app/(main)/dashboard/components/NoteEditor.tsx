import dynamic from 'next/dynamic';
import React, { useState, useEffect, useCallback } from 'react';
import 'react-quill/dist/quill.snow.css';
import { db, doc, setDoc, getDoc } from '../../../../../firebaseConfig';
import { debounce } from 'lodash';
import { Box } from '@chakra-ui/react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface NoteEditorProps {
    selectedFile: string | null;
    workspaceId: string | null;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ selectedFile, workspaceId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    
    const saveNote = useCallback(async () => {
        if (selectedFile && workspaceId) {
            const noteDoc = doc(db, 'notes', `${workspaceId}_${selectedFile}`);
            try {
                await setDoc(noteDoc, { title, content }, { merge: true });
                console.log(`Saved note: {title: ${title}, content: ${content}}`);
            } catch (error) {
                console.error('Error saving document:', error);
            }
        }
    }, [selectedFile, workspaceId, title, content]);

    
    const debouncedSaveNote = useCallback(debounce(saveNote, 300), [saveNote]);


    useEffect(() => {
        const loadNote = async () => {
            if (selectedFile && workspaceId) {
                const noteDoc = doc(db, 'notes', `${workspaceId}_${selectedFile}`);
                try {
                    const docSnap = await getDoc(noteDoc);
                    if (docSnap.exists()) {
                        setTitle(docSnap.data()?.title || '');
                        setContent(docSnap.data()?.content || '');
                        console.log(`Loaded note: {title: ${docSnap.data()?.title}, content: ${docSnap.data()?.content}}`);
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
        saveNote();
        debouncedSaveNote();
        console.log(`Content changed: ${value}`);
    };

    
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        saveNote();
        debouncedSaveNote();
        console.log(`Title changed: ${newTitle}`);
    };

    return (
        <Box
            padding="40px"
            height="100%"
            backgroundColor="gray.100"
            color="black"
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
                    color: '#2e2e2e',
                    border: 'none',
                    outline: 'none',
                    borderBottom: '2px solid #e0e0e0',
                }}
            />
            <ReactQuill
                value={content}
                onChange={handleContentChange}
                style={{
                    height: 'calc(100% - 100px)',
                    color: '#000000',
                    borderRadius: '8px',
                    padding: '20px',
                    border: 'none',
                }}
            />
        </Box>
    );
};

export default NoteEditor;
