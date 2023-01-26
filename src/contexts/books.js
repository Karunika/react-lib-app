import { createContext, useContext, useEffect, useState } from 'react';

const BooksContext = createContext([]);

const BooksContextProvider = ({ children }) => {
    const [books, setBooks] = useState(null);

    const checkTimeout = () => {
        setBooks(books => (
            books.map(book => {
                if (Date.now() > +book.reserved) {
                    book.leased = '';
                    book.reserved = '';
                }
                return book;
            })
        ));
    }

    const getUserBooks = (user) => {
        return books.filter(book => book.user === user);
    }

    const getBooks = () => {
        return books.filter(book => book.user === '' && book.leased === '');
    }

    const leaseBook = (id, user) => {
        setBooks(books => books.map(book => {
            if (book.id === id) {
                book.leased = user;
                book.reserved = Date.now() + 40*1000;
            }

            return book;
        }));
    }

    const assignBook = (id) => {
        setBooks(books => books.map(book => {
            if (book.id === id && Date.now() < +book.reserved) {
                book.user = book.leased;
                book.leased = '';
                book.reserved = '';
            }

            return book;
        }));
    }

    const borrowBook = (id, user) => {
        setBooks(books => books.map(book => {
            book.user = book.id === id ? user : book.user;
            return book;
        }));
    }

    const unborrowBook = (id, user = '') => {
        setBooks(books => books.map(book => {
            if (book.id === id && book.user === user)
                book.user = '';
            return book;
        }));
    }

    const getBookInfo = (id) => {
        return books.find(book => book.id === id);
    }

    const editBookUser = (id, user) => {
        setBooks(books => books.map(book => {
            if (book.id === id)
                book.user = user;
            return book;
        }));
    }

    const createBook = (newBook) => {
        if (books.some(book => book.id === +newBook.id)) {
            return 'book with the given id already exists';
        }
        if (!/^[0-9]+$/.test(newBook.id)) {
            return 'book id can only be number';
        }
        if (+newBook.date < 0 || +newBook.date > 2023) {
            return 'date is invalid';
        }
        newBook.id = +newBook.id;
        newBook.date = +newBook.date;

        setBooks(books => [...books, newBook]);
    }

    const deleteBook = (id) => {
        setBooks(books => books.filter(book => book.id !== id));
    }

    const removeUser = (user) => {
        setBooks(books => (
            books.map(book => {
                if (book.user === user) {
                    return {
                        ...book,
                        user: '',
                    }
                } else if (book.leased === user) {
                    return {
                        ...book,
                        leased: '',
                        reserved: ''
                    }
                } else 
                    return book
            })
        ))
    }

    useEffect(() => {
        const lsBooks = localStorage.getItem('books');

        if (lsBooks === null) {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            fetch('books.json', { headers })
                .then(response => response.json())
                .then(setBooks);
        } else {
            setBooks(JSON.parse(lsBooks));
            checkTimeout();
        }

    }, []);

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books));
    }, [books]);

    return (
        <BooksContext.Provider value={{
            getUserBooks,
            getBooks,
            borrowBook,
            unborrowBook,
            books,
            getBookInfo,
            editBookUser,
            createBook,
            deleteBook,
            removeUser,
            leaseBook,
            assignBook
        }}>
            {children}
        </BooksContext.Provider>
    )
}

export default BooksContextProvider;
export const useBooksContext = () => useContext(BooksContext);
