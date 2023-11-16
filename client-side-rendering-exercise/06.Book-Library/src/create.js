import { html } from "./utility.js";
import { post } from "./api.js";

const createTemplate = (onSuccess) => html`
<form id="add-form" @submit=${ev => onSubmit(ev, onSuccess)}>
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>
`;

export function showCreate(ctx) {
    return createTemplate(ctx.update);
}

async function onSubmit(event, onSuccess) {
    event.preventDefault();
    let form = event.currentTarget;
    let title = form.querySelector('input[name="title"]').value;
    let author = form.querySelector('input[name="author"]').value;
    
    if (title.trim() != '' && author.trim() != '') {
        let data = {
            author,
            title
        }
        let url = '/jsonstore/collections/books';
        try {
            let response = await post(url, data);

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