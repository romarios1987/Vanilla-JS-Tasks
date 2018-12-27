'use strict';

/**
 * Book Class: Represents a Book
 */

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


/**
 * UI Class: Handle UI Task
 */

class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book 1',
                author: 'John Doe',
                isbn: '2344'
            },
            {
                title: 'Book 2',
                author: 'John Doe',
                isbn: '233344'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    };

    static addBookToList(book) {
        const list = document.querySelector('#book_list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        list.appendChild(row);
    }
}

// Store Class: Handles Storage

/**
 * Event: Display books
 */
document.addEventListener('DOMContentLoaded', UI.displayBooks);

/**
 * Event: Add a Book
 */

document.querySelector('#book_form').addEventListener('submit', (e)=>{

    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;


    // instantiate book
    const book = new Book(title, author, isbn);
    // console.log(book);


    // Add Book to UI
    UI.addBookToList(book);


});


/**
 * Event: Remove Book
 */
