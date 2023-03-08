import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import BootstrapButton from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2d3436',
        },
    },
});

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleCloseSuccess = () => setShowSuccess(false);
    const handleCloseError = () => setShowError(false);

    const register = async (e) => {
        e.preventDefault();
        const response = await fetch('/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
            setUsername('');
            setPassword('');
            setShowSuccess(true);
        } else {
            setShowError(true);
        }
    }
    return (
        <div className="container registerpage">
            <form className="register" onSubmit={register}>
                <ThemeProvider theme={theme}>
                    <h2>REGISTER</h2>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={e => setUsername(e.target.value)} />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <Button variant="contained" type='submit'>Register</Button>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </ThemeProvider>
            </form>
            <Modal show={showSuccess} onHide={handleCloseSuccess}>
                <Modal.Header closeButton>
                    <Modal.Title>Done</Modal.Title>
                </Modal.Header>
                <Modal.Body>Registration Successfull!</Modal.Body>
                <Modal.Footer>
                    <BootstrapButton variant="secondary" onClick={handleCloseSuccess}>
                        Close
                    </BootstrapButton>
                </Modal.Footer>
            </Modal>
            <Modal show={showError} onHide={handleCloseError}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Registration Failed!</Modal.Body>
                <Modal.Footer>
                    <BootstrapButton variant="danger" onClick={handleCloseError}>
                        Close
                    </BootstrapButton>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RegisterPage