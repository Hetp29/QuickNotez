import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback } from "react";
import 'react-quill/dist/quill.snow.css';

interface NoteEditorProps {
    selectedFile: string | null;
}

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const NoteEditor: React.FC<NoteEditorProps> = ({ selectedFile }) => {
    const [content, setContent] = useState('');

    // Function to save content (simulate saving to a database)
    const saveContent = useCallback(() => {
        if (selectedFile) {
            console.log(`Saving content of ${selectedFile}: ${content}`);
            // Replace with actual save logic here
        }
    }, [selectedFile, content]);

    // Debounce the save function
    useEffect(() => {
        const timer = setTimeout(() => {
            saveContent();
        }, 1000); // Save after 1 second of inactivity

        return () => clearTimeout(timer); // Clear timeout if content changes before the timer ends
    }, [content, saveContent]);

    // Load the content when a new file is selected
    useEffect(() => {
        if (selectedFile) {
            // Simulate fetching content from the server
            setContent(`Content of ${selectedFile}`);
        }
    }, [selectedFile]);

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
    )
}

export default NoteEditor;
