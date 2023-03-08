import React, { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from "../userContext";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BootstrapButton from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2d3436',
        },
    },
});

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);
    const [showError, setShowError] = useState(false);

    const handleCloseError = () => setShowError(false);

    const login = async (e) => {
        e.preventDefault();
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                Cookies.set("jwtoken", userInfo.token);
                setRedirect(true);
            });
        } else {
            setShowError(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <div className="container loginpage">
            <form className="login" onSubmit={login}>
                <ThemeProvider theme={theme}>
                    <h2>LOGIN</h2>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined" value={username}
                        onChange={e => setUsername(e.target.value)} />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <Button variant="contained" type='submit'>Login</Button>
                    <p>Don't have an account? <Link to='/register'>Register</Link></p>
                </ThemeProvider>
            </form>
            <Modal show={showError} onHide={handleCloseError}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Login Failed!</Modal.Body>
                <Modal.Footer>
                    <BootstrapButton variant="danger" onClick={handleCloseError}>
                        Close
                    </BootstrapButton>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default LoginPage