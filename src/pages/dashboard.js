import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUsersContext } from '../contexts/users';
import { useBooksContext } from '../contexts/books';

const Dashboard = () => {
    const { activeUser, logOut } = useUsersContext();
    const { getUserBooks, getBooks, borrowBook, unborrowBook, getBookInfo } = useBooksContext();
    const [selectedBook, setSelectedBook] = useState(null);

    const borrowButtonHandler = () => {
        borrowBook(selectedBook, activeUser?.user);
    }

    const removeButtonHandler = () => {
        unborrowBook(selectedBook, activeUser?.user);
    }

    return activeUser ? (
        <div className='flex'>
            <div>
                username:
                {activeUser?.user}
                <button onClick={logOut}>logout</button>
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
