import { html, render } from "../node_modules/lit-html/lit-html.js";
let url = 'http://localhost:3030/jsonstore/advanced/dropdown'
let form = document.querySelector('form');
let menu = document.getElementById('menu');
form.addEventListener('submit', addItem);

async function getItems() {
    let response = await fetch(url);
    try {

        if (!response.ok) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let data = await response.json();

        return data;

    } catch (error) {
        alert(error);
    }
}

let data = await getItems();
let allItems = Object.values(data);

async function addItem(event) {
    event.preventDefault();
    let currValue = document.getElementById('itemText').value;
    if (currValue) {
        let currObj = {
            text: currValue
        }
        try {

            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currObj)
            }

            let response = await fetch(url, options);

            if (!response.ok) {
                let error = await response.json();
                throw new Error(error.message);
            }

            let currData = await response.json();
            console.log(currData)

            data = await getItems();
            allItems = Object.values(data);
            form.reset();

            update(allItems);


        } catch (error) {
            form.reset();
            alert(error);
        }
    }
};

let itemTemplate = (item) => html`
<option value=${item._id}>${item.text}</option>
`

update(allItems);

function update(items) {
    render(items.map(itemTemplate), menu);
}