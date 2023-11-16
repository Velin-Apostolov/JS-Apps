import { put } from "./api.js";
import { html } from "./utility.js";

let ctxx = null;

const updateTemplate = (book, onSuccess) => html`
<form id="edit-form" @submit=${ev => updateBook(ev, onSuccess)}>
        <input type="hidden" name="id" .value=${book.id}>
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." .value=${book.title}>
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." .value=${book.author}>
        <input type="submit" value="Save">
    </form>
`
// ctxx.update();
export function showUpdate(ctx) {
    if (ctx.book == undefined) {
        return null;
    } else {
        ctxx = ctx;
        return updateTemplate(ctx.book, ctx.update);
    }
}

async function updateBook(event, onSuccess) {
    event.preventDefault();
    let form = event.currentTarget;
    let id = form.querySelector('input[name="id"]').value;
    let title = form.querySelector('input[name="title"]').value;
    let author = form.querySelector('input[name="author"]').value;
    
    if (title.trim() != '' && author.trim() != '') {
        let data = {
            author,
            title
        }
        let url = `/jsonstore/collections/books/${id}`;
        try {
            let response = await put(url, data);

            if (!response.ok) {
                form.reset();
            }

            form.reset();
            onSuccess();
        } catch (error) {
            form.reset();
        }
    }

}