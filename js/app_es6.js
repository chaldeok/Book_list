class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	addBookToList(book) {
		const list = document.getElementById('book-list');
		const rowElem = document.createElement('tr');
		rowElem.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}<td><a 
		href="#" class="delete">X</a></td>`;
		list.appendChild(rowElem);
	}

	showAlert(message, className) {
		const div = document.createElement('div');
		div.className = `alert ${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector('.container');
		const table = document.querySelector('.table');
		container.insertBefore(div, table);
		setTimeout(function () {
			document.querySelector('.alert').remove();
		}, 3000);
	}

	deleteBook(target) {
		if (target.className === 'delete') {
			target.parentElement.parentElement.remove();
		}
	}

	clearInputs() {
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('isbn').value = '';
	}
}

class Store {
	static getbooks() {
		let books;
		if(localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}
	static displayBooks() {
		const books = Store.getbooks();
		books.forEach(function(book) {
			const ui = new UI;
			ui.addBookToList(book);
		})
	}
	static addBook(book) {
		const books = Store.getbooks();
		books.push(book);
		localStorage.setItem('books', JSON.stringify(books));
	}
	static removeBook(isbn) {
		const books = Store.getbooks();
		books.forEach(function(book, index) {
			if(books.isbn === isbn) {
				books.splice(index, 1);
			}
		});
		localStorage.setItem('books', JSON.stringify(books));
	}
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.getElementById('book-form').addEventListener('submit', function(e) {
	const title = document.getElementById('title').value,
				author = document.getElementById('author').value,
				isbn = document.getElementById('isbn').value;

	const book = new Book(title, author, isbn);

	const ui = new UI();
	if (title === '' || author === '' || isbn === '') {
		ui.showAlert('Заполните, пожалуйста, все поля формы', 'error');
	} else {
		ui.addBookToList(book);
		Store.addBook(book);
		ui.showAlert('Книга добавлена', 'success');
		ui.clearInputs();
	}

	e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e) {
	const ui = new UI();
	ui.deleteBook(e.target);
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
	ui.showAlert('Книга удалена', 'success');

	e.preventDefault();
});