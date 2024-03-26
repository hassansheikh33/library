document.addEventListener('DOMContentLoaded', function () {

    const name = document.getElementById('name');
    const author = document.getElementById('author');
    const genre = document.getElementById('genre');
    const year = document.getElementById('year');
    const quantity = document.getElementById('quantity');
    const addBtn = document.getElementById('submit-btn');
    const clear = document.getElementById('clear-btn');
    const bookList = document.getElementById('book-list');
    const modal = document.getElementById('editmodal');
    let book = {};
    let books = [];

    addBtn.addEventListener('click', addItem);

    function addItem(e) {
        e.preventDefault();
        if (name.value === '' || author.value === '' || genre.value === '' || year.value === '' || quantity.value === '') {
            alert('Please fill in all fields');
        } else {
            book = {
                name: name.value,
                author: author.value,
                genre: genre.value,
                year: year.value,
                quantity: quantity.value
            };
            createItem(book);
            saveLocally(book);
        }
    }

    function saveLocally(_book) {
        books.push(_book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    function createItem(book) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.year}</td>
        <td>${book.quantity}</td>
        <td>
            <button class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#editmodal" id="edit-btn">Edit</button>
            <button id="delete-btn" class="btn btn-danger">Delete</button>
        </td>`
        bookList.appendChild(row);
        // document.getElementById('delete-btn').addEventListener('click', deleteItem);
        document.getElementById('edit-btn').addEventListener('click', editItem);
        reset();
    }

    function editItem() {
        modal.getElementById('name').value = book.name;
        modal.getElementById('author').value = book.author;
        modal.getElementById('genre').value = book.genre;
        modal.getElementById('year').value = book.year;
        modal.getElementById('quantity').value = book.quantity;
    }

    function reset() {
        name.value = '';
        author.value = '';
        genre.value = '';
        year.value = '';
        quantity.value = '';
        book = {};
    }
});