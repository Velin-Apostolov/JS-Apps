import { get } from "./api.js";
import { html, until } from "./utility.js"
// list module
// display list of books
// control books - edit / delete

const catalogTemplate = (booksPromise) => html`
<table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        ${until(booksPromise, html`<tr><td colSpan="3">Loading&hellip;</td></tr>`)}
        </tbody>
    </table>
`;

const bookRowTemplate = (book) => html`
    <tr>
    <td>${book[1].title}</td>
    <td>${book[1].author}</td>
    <td>
        <button id=${book[0]}>Edit</button>
        <button id=${book[0]}>Delete</button>
    </td>
    </tr>
`

export function showCatalog(ctx) {
    return  catalogTemplate(loadBooks());
}

async function loadBooks() {
    const books = await get('/jsonstore/collections/books');
    return Object.entries(books).map(bookRowTemplate);
}