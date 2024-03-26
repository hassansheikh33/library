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
    let editId = null;
    let editElement;

    window.addEventListener('DOMContentLoaded', loadItems);
    addBtn.addEventListener('click', addItem);
    clear.addEventListener('click', delAll);

    function addItem(e) {
        e.preventDefault();
        if (name.value === '' || author.value === '' || genre.value === '' || year.value === '' || quantity.value === '') {
            alert('Please fill in all fields');
        } else {
            const id = new Date().getTime().toString();
            let book = {
                name: name.value,
                author: author.value,
                genre: genre.value,
                year: year.value,
                quantity: quantity.value
            };
            createItem(id, book);
            saveLocally(id, book);
        }
    }

    function delAll() {
        localStorage.removeItem('books');
        bookList.innerHTML = '';
        reset();
    }

    function saveLocally(id, _book) {
        let item = {
            id,
            book: _book
        }
        let blist = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
        blist.push(item);
        localStorage.setItem('books', JSON.stringify(blist));
    }

    function loadItems() {
        let blist = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
        if (blist.length > 0) {
            blist.forEach(item => {
                createItem(item.id, item.book);
            });
        }
    }

    function createItem(id, book) {
        const row = document.createElement('tr');
        row.setAttribute('data-id', id);
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
        row.querySelector('#delete-btn').addEventListener('click', deleteItem);
        row.querySelector('#edit-btn').addEventListener('click', editItem);
        reset();
    }

    function deleteItem(e) {
        if (confirm('Are you sure you want to delete this item?')) {
            const element = e.currentTarget.parentElement.parentElement;
            const id = element.dataset.id;
            bookList.removeChild(element);
            removeLocally(id);
            reset();
        }
    }

    function removeLocally(id) {
        let blist = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
        blist = blist.filter(item => item.id !== id);
        localStorage.setItem('books', JSON.stringify(blist));
        if (blist.length === 0)
            localStorage.clear();
    }

    function editItem(e) {
        editElement = e.currentTarget.parentElement.parentElement;
        editId = editElement.dataset.id;
        document.getElementsByClassName('name')[0].value = editElement.children[0].textContent;
        document.getElementsByClassName('author')[0].value = editElement.children[1].textContent;
        document.getElementsByClassName('genre')[0].value = editElement.children[2].textContent;
        document.getElementsByClassName('year')[0].value = editElement.children[3].textContent;
        document.getElementsByClassName('quantity')[0].value = editElement.children[4].textContent;
    }

    function reset() {
        name.value = '';
        author.value = '';
        genre.value = '';
        year.value = '';
        quantity.value = '';
    }
});