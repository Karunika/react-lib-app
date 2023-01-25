import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsersContext } from '../contexts/users';

const Login = () => {
    const { loginUser } = useUsersContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const res = loginUser(username, password);
        if (res) {
            if (username === 'librarian')
                navigate('admin');
            else
                navigate('dashboard');
        }
    }

    return (
        <form onSubmit={submitHandler} className='flex'>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <br />
            <button>Login</button>
            <br />
            <hr style={{width: '100%'}} />
            <br />
            <span>Don't have an account already?</span>
            <Link to='/register'>Register</Link>
        </form>
    )
}

export default Login;