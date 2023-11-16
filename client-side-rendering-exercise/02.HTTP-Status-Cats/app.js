import { cats } from "./catSeeder.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";

let root = document.getElementById('allCats');

let catTemplate = (data) => html`
<ul>${
    data.map(cat => html`
    <li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn" @click=${(event) => {
                        let currentText = event.target.textContent;
                        let statusDiv = event.target.parentElement.querySelector('.status');
                        if (currentText == 'Show status code'){
                            statusDiv.style.display = 'block';
                            event.target.textContent = 'Hide status code';
                        } else {
                            statusDiv.style.display = 'none';
                            event.target.textContent = 'Show status code';
                        }
                    }}>Show status code</button>
                    <div class="status" style="display: none" id="${cat.id}">
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
            </li>
    `)
}</ul>
`

update();

function update() {
    let result = catTemplate(cats);
    render(result, root);
}


{/* <li>
                <img src="./images/cat100.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn">Show status code</button>
                    <div class="status" style="display: none" id="100">
                        <h4>Status Code: 100</h4>
                        <p>Continue</p>
                    </div>
                </div>
            </li> */}