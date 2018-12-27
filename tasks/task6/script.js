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

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book_form');

        container.insertBefore(div, form);

        // Vanish in  3 seconds

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000)

    }


    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
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

document.querySelector('#book_form').addEventListener('submit', (e) => {

    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;


    // Validate
    if (title === '' || author === '' || isbn === '') {
        //alert('Please fill if all fields')
        UI.showAlert('Please fill if all fields', 'danger');
    } else {
        // instantiate book
        const book = new Book(title, author, isbn);
        // console.log(book);


        // Add Book to UI
        UI.addBookToList(book);

        // Success Massage
        UI.showAlert('Book Added', 'success');

        // clear fields
        UI.clearFields();
    }

});


/**
 * Event: Remove Book
 */

document.querySelector('#book_list').addEventListener('click', (e) => {
    // console.log(e.target)
    UI.deleteBook(e.target);

    // Success Massage
    UI.showAlert('Book Removed', 'success');
});
