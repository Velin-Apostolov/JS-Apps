import { html, render } from "../node_modules/lit-html/lit-html.js";
import { contacts } from "./contacts.js";

let mainDiv = document.getElementById('contacts');

let template = (contact) => html`
<div class="contact card">
<div>
<i class="far fa-user-circle gravatar"></i>
</div>
<div class="info">
<h2>Name: ${contact.name}</h2>
<button class="detailsBtn" @click=${() => {
    contact.showDetails = !contact.showDetails;
    update();
}}>Details</button>
${
    contact.showDetails ? html`<div class="details" id="${contact.id}">
    <p>Phone number: ${contact.phoneNumber}</p>
    <p>Email: ${contact.email}</p>
</div>
</div>
</div>`: null
}
`;

update();

function update() {
    render(contacts.map(template), mainDiv);
}

// mainDiv.addEventListener('click', (event) => {
//     if (event.target.classList.contains('detailsBtn')) {
//         let targetDiv = event.target.parentElement.querySelector('.details');
//         if (targetDiv.style.display == 'block') {
//             targetDiv.style.display = 'none';
//         } else {
//             targetDiv.style.display = 'block';
//         }
//     }
// });


{/* <div class="contact card">
<div>
<i class="far fa-user-circle gravatar"></i>
</div>
<div class="info">
<h2>Name: John</h2>
<button class="detailsBtn">Details</button>
<div class="details" id="1">
    <p>Phone number: 0847759632</p>
    <p>Email: john@john.com</p>
</div>
</div>
</div> */}