import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const BooksContext = createContext();

function Provider({ children }) {
    const [books, setBooks] = useState([]);
    
    const fetchBooks = useCallback(async () => {
        const { data } = await axios.get('http://localhost:3001/books')
        setBooks(data);
    }, []);

    const createBook = async (title) => {
        const { data } = await axios.post('http://localhost:3001/books', { title })
        setBooks([...books, data])
    };

    const deleteBookById = async (id) => {
        const { data } = await axios.delete(`http://localhost:3001/books/${id}`)
        setBooks(books.filter((book) => book.id !== data.id))
    };

    const editBookById = async (id, title) => {
        const { data } = await axios.put(`http://localhost:3001/books/${id}`, { title })
        setBooks(books.map((book) => {
            if (book.id === id) return { ...data }            
            return book;
        }))
    };

    return (
        <BooksContext.Provider 
            value={{
                books,
                fetchBooks,
                createBook,
                deleteBookById,
                editBookById
            }}
        >
            {children}
        </BooksContext.Provider>
    );
}

export { Provider };
export default BooksContext;