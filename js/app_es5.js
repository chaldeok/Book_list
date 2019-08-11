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
	rowElem.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}<td><a href="#" class="delete">X</a></td>`
	list.appendChild(rowElem);
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
	ui.addBookToList(book);
	ui.clearInputs();

	e.preventDefault();
});