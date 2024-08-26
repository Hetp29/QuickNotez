import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NoteEditor: React.FC = () => {
    const [content, setContent] = useState('');

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    return (
        <div style={{ padding: '20px', height: '100%' }}>
            <ReactQuill 
                value={content}
                onChange={handleContentChange}
                style={{ height: 'calc(100% - 50px' }}
            />
        </div>
    )
}

export default NoteEditor;
