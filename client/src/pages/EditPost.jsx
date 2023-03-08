import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";
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

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('/post/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                });
            });
    }, [id]);

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        const response = await fetch('/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }

    return (
        <div className="container editpage">
            <form onSubmit={updatePost}>
                <ThemeProvider theme={theme}>
                    <TextField
                        fullWidth
                        type="title"
                        label="Title"
                        className="mt-1 mb-1"
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}
                    />
                    <TextField
                        fullWidth
                        type="summary"
                        label="Summary"
                        value={summary}
                        className="mt-1 mb-1"
                        onChange={ev => setSummary(ev.target.value)}
                    />
                    <TextField
                        fullWidth
                        className="mt-1 mb-2"
                        type="file"
                        onChange={ev => setFiles(ev.target.files)}
                    />
                    <Editor onChange={setContent} value={content} />
                    <Button className="mt-3 mb-1" type="submit" variant="contained">Update post</Button>
                </ThemeProvider>
            </form>
        </div>
    );
}