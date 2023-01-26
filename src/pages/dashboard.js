import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUsersContext } from '../contexts/users';
import { useBooksContext } from '../contexts/books';

const Dashboard = () => {
    const { activeUser, logOut, deleteUser } = useUsersContext();
    const { getUserBooks, getBooks, borrowBook, unborrowBook, getBookInfo, removeUser, leaseBook } = useBooksContext();
    const [selectedBook, setSelectedBook] = useState(null);
    const navigate = useNavigate();

    const leaseButtonHandler = () => {
        leaseBook(selectedBook, activeUser?.user);
    }

    const borrowButtonHandler = () => {
        borrowBook(selectedBook, activeUser?.user);
    }

    const removeButtonHandler = () => {
        unborrowBook(selectedBook, activeUser?.user);
    }

    const deleteAccountButtonHandler = () => {
        removeUser(activeUser.user);
        deleteUser(activeUser.user);
        navigate('/');
    }

    return activeUser ? (
        <div className='flex'>
            <div>
                username:
                {activeUser?.user}
                <button onClick={logOut}>logout</button>
                <button onClick={deleteAccountButtonHandler}>delete</button>
            </div>
            <div className='flex border'>
                {getBooks().map(book => (
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
                <button onClick={leaseButtonHandler}>lease</button>
                <button onClick={borrowButtonHandler}>borrow</button>
                <button onClick={removeButtonHandler}>remove</button>
            </div>
            <div className='flex border'>
                {getUserBooks(activeUser.user).map(book => (
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
            </div>
        </div>
    ) : <Navigate to='/' />;
}

export default Dashboard;
