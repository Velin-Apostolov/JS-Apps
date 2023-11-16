function attachEvents() {

    let phoneList = document.getElementById('phonebook');
    let loadBtn = document.getElementById('btnLoad');
    let personField = document.getElementById('person');
    let phoneNumberField = document.getElementById('phone');
    let createBtn = document.getElementById('btnCreate');
    let url = 'http://localhost:3030/jsonstore/phonebook';

    loadBtn.addEventListener('click', loadContacts);
    createBtn.addEventListener('click', createContact);

    async function loadContacts() {

        phoneList.replaceChildren();

        let response = await fetch(url);

        let data = await response.json();

        for (const contact in data) {
            
            let person = data[contact].person;
            let id = data[contact]._id;
            let phone = data[contact].phone;

            let li = document.createElement('li');
            li.id = id;
            li.textContent = `${person}: ${phone}`;

            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';

            deleteBtn.addEventListener('click', async () => {
                
                let url = `http://localhost:3030/jsonstore/phonebook/${id}`;

                let options = {
                    method: "DELETE"
                }

                await fetch(url, options);

            })

            li.appendChild(deleteBtn);

            phoneList.appendChild(li);


        }

    }

    async function createContact() {
        
        let data = {
            person: `${personField.value}`,
            phone: `${phoneNumberField.value}`
        }

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        await fetch(url, options);

        personField.value = '';
        phoneNumberField.value = '';

        loadContacts();

    }

}

attachEvents();