import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsersContext } from '../contexts/users';

const Register = () => {
    const { registerUser } = useUsersContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        const errorString = registerUser(username, password, confirmPassword);
        if (errorString) {
            setError(errorString);
        } else {
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        }
    }

    return (
        <form onSubmit={submitHandler} className='flex'>
            <label>Username:</label>
            <input
                type="text"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <label>Password:</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <label>Confirm Password:</label>
            <input
                type="password"
                name="confirm_password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
            />
            <br />
            <button>Create</button>
            <span>{error}</span>
            <br />
            <hr style={{width: '100%'}} />
            <br />
            <span>Already have an account?</span>
            <Link to='/'>Login</Link>
        </form>
    );
}

export default Register;