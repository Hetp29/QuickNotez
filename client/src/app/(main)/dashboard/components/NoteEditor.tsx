import dynamic from 'next/dynamic';
import React, { useState, useEffect, useCallback } from 'react';
import 'react-quill/dist/quill.snow.css';
import { db, doc, setDoc, getDoc } from '../../../../../firebaseConfig';
import { debounce } from 'lodash'; 


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface NoteEditorProps {
    selectedFile: string | null;
    workspaceId: string | null;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ selectedFile, workspaceId }) => {
    const [content, setContent] = useState('');


    const saveContent = useCallback(async (plainTextContent: string) => {
        if (selectedFile && workspaceId) {
            const noteDoc = doc(db, 'notes', `${workspaceId}_${selectedFile}`);
            try {
                await setDoc(noteDoc, { content: plainTextContent }, { merge: true }); // merge option to update the content
                console.log(`Saved content of ${selectedFile}: ${plainTextContent}`);
            } catch (error) {
                console.error('Error saving document:', error);
            }
        }
    }, [selectedFile, workspaceId]);


    const debouncedSaveContent = useCallback(debounce((content: string) => {
        const plainTextContent = content.replace(/<\/?[^>]+(>|$)/g, "");
        saveContent(plainTextContent);
    }, 500), [saveContent]);

   
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
                        setContent(''); 
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
        debouncedSaveContent(value); 
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
