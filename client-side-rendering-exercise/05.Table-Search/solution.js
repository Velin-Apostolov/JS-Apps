import { html, render } from "../node_modules/lit-html/lit-html.js";

let url = 'http://localhost:3030/jsonstore/advanced/table';
let tableBody = document.querySelector('.container > tbody');

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);


   function onClick() {
      let searchValue = document.getElementById('searchField').value.toLowerCase();
      update(searchValue);
   }
}
solve();

async function getData() {
   try {
      let response = await fetch(url);

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

let data = await getData();
let allStudents = Object.values(data);

let trTemplate = (students, match) => html`
${students.map(student => html`
   <tr class = ${match && Object.values(student).some((x) => x.toLowerCase().includes(match)) ? 'select' : ''}>
      <td>${student.firstName} ${student.lastName}</td>
      <td>${student.email}</td>
      <td>${student.course}</td>
   </tr>
`)}
`

update();

function update(match) {
   let result = trTemplate(allStudents, match)
   render(result, tableBody);
}