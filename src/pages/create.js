import React, { useState } from 'react';
import { useBooksContext } from '../contexts/books';
import { useUsersContext } from '../contexts/users';
import { Navigate, useNavigate } from 'react-router-dom';

const Create = () => {
    const { activeUser } = useUsersContext();
    const { createBook } = useBooksContext();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [newBook, setNewBook] = useState({
        id: '',
        author: '',
        title: '',
        publisher: '',
        date: '',
        user: '',
        reserved: '',
        leased: ''
    });

    const changeHandler = (e) => {
        setNewBook(book => ({
            ...book,
            [e.target.name]: e.target.value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const errorString = createBook(newBook);
        if (errorString === '')
            navigate('admin');
        else
            setError(errorString);
    }

    return activeUser?.user === 'librarian' ? (
        <form className='flex' onSubmit={submitHandler}>
            <label htmlFor='id'>id:</label>
            <input
                type="text"
                name="id"
                onChange={changeHandler}
                value={newBook['id']}
                required
            />
            <label htmlFor='author'>author:</label>
            <input
                type="text"
                name="author"
                onChange={changeHandler}
                value={newBook['author']}
                required
            />
            <label htmlFor='title'>title:</label>
            <input
                type="text"
                name="title"
                onChange={changeHandler}
                value={newBook['title']}
                required
            />
            <label htmlFor='publisher'>publisher:</label>
            <input
                type="text"
                name="publisher"
                onChange={changeHandler}
                value={newBook['publisher']}
                required
            />
            <label htmlFor='date'>date:</label>
            <input
                type="text"
                name="date"
                onChange={changeHandler}
                value={newBook['date']}
                required
            />
            <label htmlFor='reserved'>reserved:</label>
            <input
                type="date"
                name="reserved"
                onChange={changeHandler}
                value={newBook['reserved']}
                required
            />
            <br />
            <button>create</button>
            {error}
        </form>
    ) : <Navigate to='/' />
}

export default Create;
