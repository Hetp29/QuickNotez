import dynamic from 'next/dynamic';
import React, { useState, useEffect, useCallback } from "react";
import 'react-quill/dist/quill.snow.css';
import { db, doc, setDoc, getDoc } from "../../../../../firebaseConfig"; // Importing getDoc

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface NoteEditorProps {
    selectedFile: string | null;
    workspaceId: string; // Ensure you have a valid workspace ID
}

const NoteEditor: React.FC<NoteEditorProps> = ({ selectedFile, workspaceId }) => {
    const [content, setContent] = useState('');

    // Function to save content to Firebase
    const saveContent = useCallback(async () => {
        if (selectedFile && workspaceId) {
            const fileDoc = doc(db, 'workspaces', workspaceId, 'files', selectedFile);
            try {
                await setDoc(fileDoc, { content });
                console.log(`Saved content of ${selectedFile}: ${content}`);
            } catch (error) {
                console.error('Error saving document:', error);
            }
        }
    }, [selectedFile, content, workspaceId]);

    // Debounce the save function
    useEffect(() => {
        const timer = setTimeout(() => {
            saveContent();
        }, 1000); // Save after 1 second of inactivity

        return () => clearTimeout(timer); // Clear timeout if content changes before the timer ends
    }, [content, saveContent]);

    // Load content when a new file is selected
    useEffect(() => {
        const loadContent = async () => {
            if (selectedFile && workspaceId) {
                const fileDoc = doc(db, 'workspaces', workspaceId, 'files', selectedFile);
                try {
                    const docSnap = await getDoc(fileDoc);
                    if (docSnap.exists()) {
                        setContent(docSnap.data().content);
                    } else {
                        console.log("No such document!");
                        setContent(''); // Clear the editor if no document is found
                    }
                } catch (error) {
                    console.error('Error loading document:', error);
                }
            }
        };

        loadContent();
    }, [selectedFile, workspaceId]);

    const handleContentChange = (value: string) => {
        setContent(value);
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
