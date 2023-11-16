function attachEvents() {
    
    let url = 'http://localhost:3030/jsonstore/messenger';
    let messageArea = document.getElementById('messages');
    let nameField = document.querySelector('input[name="author"]');
    let messageField = document.querySelector('input[name="content"]');
    let sendBtn = document.getElementById('submit');
    let refreshBtn = document.getElementById('refresh');

    sendBtn.addEventListener('click', sendMessage);
    refreshBtn.addEventListener('click', getAllMessages);

    async function sendMessage() {

        let name = nameField.value;
        let message = messageField.value;

        let data = {
            author: name,
            content: message
        }

        let options = {
            method: "POST",
            "Content-Type": "application/json",
            body: JSON.stringify(data),
        }

        await fetch(url, options);

        nameField.value = '';
        messageField.value = '';

    }

    async function getAllMessages() {

        messageArea.textContent = '';

        let response = await fetch(url);

        let data = await response.json();

        for (const message in data) {
            messageArea.textContent += `${data[message].author}: ${data[message].content}\n`;
        }

        messageArea.textContent = messageArea.textContent.trim();

    }

}

attachEvents();