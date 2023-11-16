let tbody = document.querySelector('body > table > tbody');
let titleField = document.querySelector('input[name="title"]');
let authorField = document.querySelector('input[name="author"]');
let formTitle = document.querySelector('form > h3');

let url = 'http://localhost:3030/jsonstore/collections/books';

let loadBtn = document.getElementById('loadBooks');
loadBtn.addEventListener('click', loadBooks);

let formSubmitBtn = document.querySelector('form > button');
formSubmitBtn.addEventListener('click', createUpdateBook);

async function loadBooks() {

    tbody.replaceChildren();

    titleField.value = '';
    authorField.value = '';

    let response = await fetch(url);

    let data = await response.json();

    for (const book in data) {

        let id = book;

        let author = data[book].author;
        let title = data[book].title;

        let tr = document.createElement('tr');

        let tdTitle = document.createElement('td');
        tdTitle.textContent = title;

        let tdAuthor = document.createElement('td');
        tdAuthor.textContent = author;

        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);

        tbody.appendChild(tr);

        let buttonsCell = document.createElement('td');
        buttonsCell.id = id;

        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', editBookData);
        buttonsCell.appendChild(editBtn);

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteBook);
        buttonsCell.appendChild(deleteBtn);

        tr.appendChild(buttonsCell);

    }

}

async function editBookData(event) {

    let id = event.target.parentElement.id;
    let title = event.target.parentElement.previousSibling.previousSibling.textContent;
    let author = event.target.parentElement.previousSibling.textContent;

    titleField.value = title;
    authorField.value = author;

    formTitle.textContent = 'Edit FORM';
    formSubmitBtn.textContent = 'Save';
    formSubmitBtn.setAttribute('id', id);

}

async function deleteBook(event) {

    let id = event.target.parentElement.id;
    let url = `http://localhost:3030/jsonstore/collections/books/${id}`;

    let options = {
        method: 'DELETE'
    }

    await fetch(url, options);

    event.target.parentElement.parentElement.remove();
}

async function createUpdateBook(event) {

    event.preventDefault();

    if (event.target.textContent == 'Submit') {

        if (authorField.value.trim() == '' || titleField.value.trim() == '') {
            return;
        }

        let author = authorField.value;
        let title = titleField.value;

        let newBook = {
            author,
            title
        }

        let options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newBook)
        }

        await fetch(url, options);

        authorField.value = '';
        titleField.value = '';

    } else {

        if (authorField.value.trim() == '' || titleField.value.trim() == '') {
            return;
        }

        let id = formSubmitBtn.id;

        let url = `http://localhost:3030/jsonstore/collections/books/${id}`;

        let bookInfo = {
            "author": authorField.value,
            "title": titleField.value,
        }

        let options = {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(bookInfo)
        }

        await fetch(url, options);

        formTitle.textContent = 'FORM';
        formSubmitBtn.textContent = 'Submit';
        formSubmitBtn.removeAttribute('id');
        titleField.value = '';
        authorField.value = '';
    }

}