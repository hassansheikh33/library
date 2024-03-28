document.addEventListener('DOMContentLoaded', function () {

    const name = document.getElementById('name');
    const author = document.getElementById('author');
    const genre = document.getElementById('genre');
    const year = document.getElementById('year');
    const quantity = document.getElementById('quantity');
    const addBtn = document.getElementById('submit-btn');
    const clear = document.getElementById('clear-btn');
    const bookList = document.getElementById('book-list');
    const modalBody = document.getElementsByClassName('modal-body')[0];
    const modalFooter = document.getElementsByClassName('modal-footer')[0];
    const login = document.getElementById('login');
    const LogMail = document.getElementById('Logmail');
    const LogPass = document.getElementById('LogPass');
    const signup = document.getElementById('signup');
    const signmail = document.getElementById('signmail');
    const signpass = document.getElementById('signpass');
    const logoutBtn = document.getElementById('logout-btn');
    const status = document.getElementById('logstatus');

    let logFlag = false;
    let editId = null;
    let editElement;
    let sincount = 0;
    let count = 0;

    window.addEventListener('DOMContentLoaded', loadItems);
    addBtn.addEventListener('click', addItem);
    clear.addEventListener('click', delAll);
    login.addEventListener('click', loguser);
    signup.addEventListener('click', signupUser);
    logoutBtn.addEventListener('click', logout);

    function addItem(e) {
        e.preventDefault();
        if (logFlag === false) {
            alert('Please login to Add a Book');
        }
        else {
            if ((name.value.length === 0 || name.value === '' || !isNaN(name.value))
                || (author.value.length === 0 || author.value === '' || !isNaN(author.value))
                || (genre.value.length === 0 || genre.value === '' || !isNaN(genre.value))
                || (year.value > new Date().getFullYear() || year.value === '' || isNaN(year.value))
                || (quantity.value <= 0 || quantity.value > 1000 || quantity.value === '' || isNaN(quantity.value))) {
                alert('Please fill in all fields correctly');
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
    }

    function delAll() {
        if (logFlag === false) {
            alert('Please login to Delete All Books');
        }
        else {
            if (localStorage.getItem('books') === null) {
                alert('There are no items to delete');
            } else {
                if (confirm('Are you sure you want to Delete ALL items?')) {
                    localStorage.removeItem('books');
                    bookList.innerHTML = '';
                    reset();
                }
            }
        }
    }

    function loguser(e) {
        e.preventDefault();
        let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
        if (users.length === 0 || !users) {
            alert('No user registered yet, please sign up to continue');
            LogMail.value = '';
            LogPass.value = '';
        } else {
            if (logFlag === true) {
                alert('You are already logged in');
                LogMail.value = '';
                LogPass.value = '';
            } else if (logFlag === false) {

                if (LogMail.value.length === 0 || LogMail.value === '' || !isNaN(LogMail.value) || LogPass.value.length === 0 || LogPass.value === '' || LogPass.value.toString().length === 0) {
                    alert('Please fill in all fields correctly');
                }
                else if (users.length !== 0 && users) {
                    for (let item of users) {
                        if (item.email === LogMail.value && item.password === LogPass.value) {
                            logFlag = true;
                            status.innerHTML = `Logged In as ${item.email}`;
                            alert('Logged In Successfully');
                            LogMail.value = '';
                            LogPass.value = '';
                            count = 0;
                            break;
                        } else if (item.email !== LogMail.value || item.password !== LogPass.value) {
                            count += 1;
                        }
                    }
                    if (count > 0) {
                        alert('Invalid Credentials');
                        LogMail.value = '';
                        LogPass.value = '';
                        count = 0;
                    }
                }
            }
        }
    }

    function signupUser(e) {
        e.preventDefault();
        let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
        if (signmail.value.length === 0 || signmail.value === '' || !isNaN(signmail.value) || signpass.value.length === 0 || signpass.value === '' || signpass.value.toString().length === 0) {
            alert('Please fill in all fields correctly');
        } else if (users.length !== 0 && users) {
            for (let item of users) {
                if (item.email === signmail.value) {
                    alert('Username is not available');
                    signmail.value = '';
                    signpass.value = '';
                    break;
                } else {
                    sincount += 1;
                }
            }
            if (sincount > 0) {
                let user = {
                    email: signmail.value,
                    password: signpass.value
                }
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
                alert('User Registered Successfully, please sign in to continue');
                signmail.value = '';
                signpass.value = '';
                sincount = 0;
            }
        } else {
            let user = {
                email: signmail.value,
                password: signpass.value
            }
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            alert('User Registered Successfully, please sign in to continue');
            signmail.value = '';
            signpass.value = '';
        }
    }

    function logout() {
        if (logFlag === true) {
            if (confirm('Are you sure you want to logout?')) {
                username = '';
                logFlag = false;
                status.innerHTML = 'Logged Out';
                alert('Logged Out Successfully');
            }
        } else {
            alert('You are already logged out');
        }
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

    function saveEdit() {
        if ((document.getElementsByClassName('name')[0].value.length === 0 || document.getElementsByClassName('name')[0].value === '' || !isNaN(document.getElementsByClassName('name')[0].value))
            || (document.getElementsByClassName('author')[0].value.length === 0 || document.getElementsByClassName('author')[0].value === '' || !isNaN(document.getElementsByClassName('author')[0].value))
            || (document.getElementsByClassName('genre')[0].value.length === 0 || document.getElementsByClassName('genre')[0].value === '' || !isNaN(document.getElementsByClassName('genre')[0].value))
            || (document.getElementsByClassName('year')[0].value > new Date().getFullYear() || document.getElementsByClassName('year')[0].value === '' || isNaN(document.getElementsByClassName('year')[0].value))
            || (document.getElementsByClassName('quantity')[0].value <= 0 || document.getElementsByClassName('quantity')[0].value > 1000 || document.getElementsByClassName('quantity')[0].value === '' || isNaN(document.getElementsByClassName('quantity')[0].value))) {
            alert('Please fill in all fields correctly');
        } else if (editElement.children[0].textContent === document.getElementsByClassName('name')[0].value
            && editElement.children[1].textContent === document.getElementsByClassName('author')[0].value
            && editElement.children[2].textContent === document.getElementsByClassName('genre')[0].value
            && editElement.children[3].textContent === document.getElementsByClassName('year')[0].value
            && editElement.children[4].textContent === document.getElementsByClassName('quantity')[0].value) {
            modalReset();
        } else {
            let book = {
                name: document.getElementsByClassName('name')[0].value,
                author: document.getElementsByClassName('author')[0].value,
                genre: document.getElementsByClassName('genre')[0].value,
                year: document.getElementsByClassName('year')[0].value,
                quantity: document.getElementsByClassName('quantity')[0].value
            }
            editElement.children[0].textContent = book.name;
            editElement.children[1].textContent = book.author;
            editElement.children[2].textContent = book.genre;
            editElement.children[3].textContent = book.year;
            editElement.children[4].textContent = book.quantity;
            editLocally(editId, book);
            modalReset();
        }
    }

    function editLocally(id, _book) {
        let blist = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
        blist = blist.map(item => {
            if (item.id === id) {
                item.book = _book;
            }
            return item;
        });
        localStorage.setItem('books', JSON.stringify(blist));
    }


    function loadItems() {
        logFlag = false;
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
        if (logFlag === false) {
            alert('Please login to Delete a Book');
        } else {
            if (confirm('Are you sure you want to delete this item?')) {
                const element = e.currentTarget.parentElement.parentElement;
                const id = element.dataset.id;
                bookList.removeChild(element);
                removeLocally(id);
                reset();
            }
        }
    }

    function removeLocally(id) {
        let BlistLocal = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
        BlistLocal = BlistLocal.filter(item => item.id !== id);
        localStorage.setItem('books', JSON.stringify(BlistLocal));
        if (BlistLocal.length === 0)
            localStorage.clear();
    }

    function editItem(e) {
        if (logFlag === false) {
            modalBody.innerHTML = `<p>Please login to Edit a Book</p>`;
            modalFooter.innerHTML = `<button class="btn btn-primary" data-bs-dismiss="modal">Close</button>`;
        } else {
            modalBody.innerHTML = `<form id="book-form" autocapitalize="words" autocomplete="off">
        <fieldset class="m-3">
            <label for="name">Book Title:</label>
            <input type="text" id="name" class="form-control name" placeholder="Enter Book Name">
        </fieldset>
        <fieldset class="m-3">
            <label for="author">Author:</label>
            <input type="text" id="author" class="form-control author"
                placeholder="Enter Author's Name">
        </fieldset>
        <fieldset class="m-3">
            <label for="genre">Genre:</label>
            <input type="text" id="genre" class="form-control genre" placeholder="Enter Book Genre">
        </fieldset>
        <fieldset class="m-3">
            <label for="year">Year:</label>
            <input type="text" id="year" class="form-control year" placeholder="Enter Publish Year">
        </fieldset>
        <fieldset class="m-3">
            <label for="quantity">Quantity:</label>
            <input type="text" id="quantity" class="form-control quantity" placeholder="Enter Quantity">
        </fieldset>
    </form>`;
            modalFooter.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="submit" id="modal-save-btn" class="btn btn-primary">Save changes</button>`;
            modalFooter.querySelector('#modal-save-btn').addEventListener('click', saveEdit);
            editElement = e.currentTarget.parentElement.parentElement;
            editId = editElement.dataset.id;
            document.getElementsByClassName('name')[0].value = editElement.children[0].textContent;
            document.getElementsByClassName('author')[0].value = editElement.children[1].textContent;
            document.getElementsByClassName('genre')[0].value = editElement.children[2].textContent;
            document.getElementsByClassName('year')[0].value = editElement.children[3].textContent;
            document.getElementsByClassName('quantity')[0].value = editElement.children[4].textContent;
            reset();
        }
    }

    function modalReset() {
        modalBody.innerHTML = `<p>Your Book has been updated successfully</p>`;
        modalFooter.innerHTML = `<button class="btn btn-primary" data-bs-dismiss="modal">Close</button>`;
    }

    function reset() {
        name.value = '';
        author.value = '';
        genre.value = '';
        year.value = '';
        quantity.value = '';
    }
});