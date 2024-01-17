import { useState, useEffect } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import axios from 'axios';

function App() {
    const [books, setBooks] = useState([]);
    useEffect(() => fetchBooks(), [])

    const fetchBooks = async () => {
        const { data } = await axios.get('http://localhost:3001/books')
        setBooks(data);
    };

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
        <div className='app'>
            <h1>Reading List</h1>
            <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
            <BookCreate onCreate={createBook} />
        </div>
        
    )
}

export default App;