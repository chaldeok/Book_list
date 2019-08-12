//Book Constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

//UI Constructor
function UI() {}
UI.prototype.addBookToList = function(book) {
	const list = document.getElementById('book-list');
	const rowElem = document.createElement('tr');
	rowElem.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}<td><a 
	href="#" class="delete">X</a></td>`;
	list.appendChild(rowElem);
};
UI.prototype.showAlert = function(message, className) {
	const div = document.createElement('div');
	div.className = `alert ${className}`;
	div.appendChild(document.createTextNode(message));
	const container = document.querySelector('.container');
	const table = document.querySelector('.table');
	container.insertBefore(div, table);
	setTimeout(function() {
		document.querySelector('.alert').remove();
	}, 3000);
};
UI.prototype.clearInputs = function() {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
};

document.getElementById('book-form').addEventListener('submit', function(e) {
	const title = document.getElementById('title').value,
				author = document.getElementById('author').value,
				isbn = document.getElementById('isbn').value;

	const book = new Book(title, author, isbn);

	const ui = new UI();
	if(title === '' || author === '' || isbn === '') {
		ui.showAlert('Заполните, пожалуйста, все поля формы', 'error');
	} else {
		ui.addBookToList(book);
		ui.showAlert('Книга добавлена', 'success');
		ui.clearInputs();
	}

	e.preventDefault();
});