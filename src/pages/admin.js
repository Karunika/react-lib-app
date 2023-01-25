import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useUsersContext } from '../contexts/users';
import { useBooksContext } from '../contexts/books';

const Admin = () => {
    const { activeUser, logOut, users } = useUsersContext();
    const { books, getBookInfo, editBookUser, deleteBook } = useBooksContext();
    const [selectedBook, setSelectedBook] = useState(null);

    const changeUser = (user = '') => {
        editBookUser(selectedBook, user);
    }

    const deleteBookButtonHandler = () => {
        setSelectedBook(null);
        deleteBook(selectedBook);
    }

    return activeUser ? (
        <div className='flex'>
            <div>
                Librarian
                <button onClick={logOut}>logout</button>
                <Link to='/create'>add book</Link>
            </div>
            <div className='flex border'>
                {books.map(book => (
                    <div
                        key={book.id}
                        className={book.id === selectedBook ? 'selected' : ''}
                        onClick={() => setSelectedBook(book.id)}
                    >
                        {book.title}
                    </div>
                ))}
            </div>
            <div>
                {JSON.stringify(getBookInfo(selectedBook))}
                {selectedBook && (
                    <div>
                        change user:
                        <ul>
                            <li className={getBookInfo(selectedBook).user === '' ? 'selected' : ''}
                                onClick={() => changeUser()}>none</li>
                            {users.map(user => {
                                return user.user !== 'librarian' &&
                                    <li
                                        key={user.user}
                                        className={getBookInfo(selectedBook).user === user.user ? 'selected' : ''}
                                        onClick={() => changeUser(user.user)}
                                    >
                                        {user.user}
                                    </li>
                            })}
                        </ul>
                        <button onClick={deleteBookButtonHandler}>delete book</button>
                    </div>
                )}
            </div>
        </div>
    ) : <Navigate to='/' />;
}

export default Admin;
