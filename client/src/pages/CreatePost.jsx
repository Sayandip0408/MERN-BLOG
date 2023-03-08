import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2d3436',
        },
    },
});

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    const createNewPost = async (e) => {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        e.preventDefault();

        const response = await fetch('/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <div className="container createpage">
            <form onSubmit={createNewPost}>
                <ThemeProvider theme={theme}>
                    <h2>Create New Blog</h2>
                    <TextField
                        fullWidth
                        label="New Blog Title"
                        variant="outlined"
                        value={title}
                        onChange={ev => setTitle(ev.target.value)} />
                    <TextField
                        fullWidth
                        label="New Blog Summary"
                        variant="outlined"
                        value={summary}
                        onChange={ev => setSummary(ev.target.value)} />
                    <TextField
                        fullWidth
                        type="file"
                        onChange={ev => setFiles(ev.target.files)} />
                    <Editor value={content} onChange={setContent} />
                    <Button variant='contained' type='submit'>Create post</Button>
                </ThemeProvider>
            </form>
        </div>
    )
}

export default CreatePost