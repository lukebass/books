import { useState } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
    const [books, setBooks] = useState([]);

    const deleteBookById = (id) => {
        setBooks(books.filter((book) => book.id !== id))
    };

    const editBookById = (id, title) => {
        setBooks(books.map((book) => {
            if (book.id === id) return { ...book, title }            
            return book;
        }))
    };

    const createBook = (title) => {
        setBooks([
            ...books,
            { 
                id: Math.round(Math.random() * 1000), 
                title 
            }
        ])
    };

    return (
        <div className='app'>
            <h1>Reading List</h1>
            <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
            <BookCreate onCreate={createBook} />
        </div>
        
    )
}

export default App;