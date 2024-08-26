import dynamic from 'next/dynamic';
import React, { useState, useEffect, useCallback } from 'react';
import 'react-quill/dist/quill.snow.css';
import { db, doc, setDoc, getDoc } from '../../../../../firebaseConfig'; // Importing getDoc

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface NoteEditorProps {
    selectedFile: string | null;
    workspaceId: string | null; // Ensure you have a valid workspace ID
}

const NoteEditor: React.FC<NoteEditorProps> = ({ selectedFile, workspaceId }) => {
    const [content, setContent] = useState('');

    // Function to save content to Firebase
    const saveContent = useCallback(async () => {
        if (selectedFile && workspaceId) {
            const noteDoc = doc(db, 'notes', `${workspaceId}_${selectedFile}`);
            try {
                await setDoc(noteDoc, { content });
                console.log(`Saved content of ${selectedFile}: ${content}`);
            } catch (error) {
                console.error('Error saving document:', error);
            }
        }
    }, [selectedFile, content, workspaceId]);

    // Load content when a new file is selected
    useEffect(() => {
        const loadContent = async () => {
            if (selectedFile && workspaceId) {
                const noteDoc = doc(db, 'notes', `${workspaceId}_${selectedFile}`);
                try {
                    const docSnap = await getDoc(noteDoc);
                    if (docSnap.exists()) {
                        setContent(docSnap.data().content);
                        console.log(`Loaded content: ${docSnap.data().content}`);
                    } else {
                        console.log('No such document!');
                        setContent(''); // Clear the editor if no document is found
                    }
                } catch (error) {
                    console.error('Error loading document:', error);
                }
            }
        };

        loadContent();
    }, [selectedFile, workspaceId]);

    // Save content when the component unmounts or when the selectedFile changes
    useEffect(() => {
        return () => {
            saveContent();
        };
    }, [saveContent]);

    const handleContentChange = (value: string) => {
        setContent(value);
        console.log(`Content changed: ${value}`);
    };

    return (
        <div style={{ padding: '20px', height: '100%' }}>
            <ReactQuill
                value={content}
                onChange={handleContentChange}
                style={{ height: 'calc(100% - 50px)' }}
            />
        </div>
    );
};

export default NoteEditor;
