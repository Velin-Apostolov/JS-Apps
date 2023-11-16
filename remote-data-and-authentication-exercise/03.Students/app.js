let submitBtn = document.getElementById('submit');
let tbody = document.querySelector('#results > tbody');
let form = document.getElementById('form');
let firstNameField = document.querySelector('input[name="firstName"]');
let lastNameField = document.querySelector('input[name="lastName"]');
let factoryNumField = document.querySelector('input[name="facultyNumber"]');
let gradeField = document.querySelector('input[name="grade"]');
let allFields = [firstNameField, lastNameField, factoryNumField, gradeField];
let url = 'http://localhost:3030/jsonstore/collections/students';
let xhttp = null;

function serverGetRequest() {
    xhttp = new XMLHttpRequest();
    xhttp.addEventListener('readystatechange', loadStudents);
    xhttp.open('GET', url);
    xhttp.send();
}

serverGetRequest();

function loadStudents() {

    if (xhttp.readyState == 4 && xhttp.status == 200) {

        let data = JSON.parse(xhttp.responseText);

        for (let student in data) {

            let tableRow = document.createElement('tr');

            let tdFirstName = document.createElement('td');
            let tdLastName = document.createElement('td');
            let tdFacultyNum = document.createElement('td');
            let tdGrade = document.createElement('td');

            let firstName = data[student].firstName;
            let lastName = data[student].lastName;
            let facultyNum = data[student].facultyNumber;
            let grade = data[student].grade;

            tdFirstName.textContent = firstName;
            tdLastName.textContent = lastName;
            tdFacultyNum.textContent = facultyNum;
            tdGrade.textContent = grade;

            tableRow.appendChild(tdFirstName);
            tableRow.appendChild(tdLastName);
            tableRow.appendChild(tdFacultyNum);
            tableRow.appendChild(tdGrade);
            tbody.appendChild(tableRow);
        }
    }
}

submitBtn.addEventListener('click', (event) => {

    event.preventDefault();
    let formData = new FormData(form);
    let firstName = formData.get('firstName');
    let lastName = formData.get('lastName');
    let facultyNumber = formData.get('facultyNumber');
    let grade = formData.get('grade');
    let allData = [firstName, lastName, facultyNumber, grade];

    let dataCheck = allData.some((x) => x.trim().length == 0);

    if (!dataCheck) {
        let newStudent = JSON.stringify({ firstName, lastName, facultyNumber, grade });
        let postRequest = new XMLHttpRequest();
        postRequest.open('POST', url);
        postRequest.setRequestHeader('Content-Type', 'application.json');
        postRequest.send(newStudent);
        allFields.forEach(field => field.value = '');

        let tableRow = document.createElement('tr');

        let tdFirstName = document.createElement('td');
        let tdLastName = document.createElement('td');
        let tdFacultyNum = document.createElement('td');
        let tdGrade = document.createElement('td');

        tdFirstName.textContent = firstName;
        tdLastName.textContent = lastName;
        tdFacultyNum.textContent = facultyNumber;
        tdGrade.textContent = grade;

        tableRow.appendChild(tdFirstName);
        tableRow.appendChild(tdLastName);
        tableRow.appendChild(tdFacultyNum);
        tableRow.appendChild(tdGrade);
        tbody.appendChild(tableRow);
    }

});