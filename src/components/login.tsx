import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        phoneNumber: '',
        email: '',
    });

    const saveToLocal = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateFormData()) {
            return;
        }
        localStorage.setItem('formData', JSON.stringify(formData));
        navigate('/data')
    };

    const validateFormData = () => {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        const phoneNumberRegex = /^[0-9]{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern

        if (!usernameRegex.test(formData.username)) {
            alert('Please enter a valid username (alphanumeric and underscores only, 3-20 characters)');
            return false;
        }

        if (!phoneNumberRegex.test(formData.phoneNumber)) {
            alert('Please enter a valid 10-digit phone number');
            return false;
        }

        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    return (
        <form onSubmit={saveToLocal}>
            <Stack sx={{ m: 5 }} direction="column" justifyContent="center">
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    sx={{ m: 2 }}
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    id="phoneNumber"
                    label="Phone number"
                    variant="outlined"
                    sx={{ m: 2 }}
                    inputProps={{ type: 'number' }}
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    sx={{ m: 2 }}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <Button type='submit' variant='contained' color='primary'>
                    Sign in
                </Button>
            </Stack>
        </form>
    );
};

export default Login;
