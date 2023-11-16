function lockedProfile() {
    let main = document.getElementById('main');
    main.replaceChildren();
    let url = 'http://localhost:3030/jsonstore/advanced/profiles';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let counter = 0;
            for (const key in data) {
                counter++;
                let username = data[key].username;
                let age = data[key].age;
                let email = data[key].email;
                let currUser = `user${counter}Locked`;

                let currProfileDiv = document.createElement('div');
                currProfileDiv.classList.add('profile');

                let img = document.createElement('img');
                img.src = './iconProfile2.png';
                img.classList.add('userIcon');
                currProfileDiv.appendChild(img);

                let lockLabel = document.createElement('label');
                lockLabel.textContent = 'Lock';
                currProfileDiv.appendChild(lockLabel);

                let lockBtn = document.createElement('input');
                lockBtn.type = 'radio';
                lockBtn.name = currUser;
                lockBtn.value = 'lock';
                lockBtn.checked = true;
                currProfileDiv.appendChild(lockBtn);

                let unlockLabel = document.createElement('label');
                unlockLabel.textContent = 'Unlock';
                currProfileDiv.appendChild(unlockLabel);

                let unlockBtn = document.createElement('input');
                unlockBtn.type = 'radio';
                unlockBtn.name = currUser;
                unlockBtn.value = 'unlock';
                currProfileDiv.appendChild(unlockBtn);

                let br = document.createElement('br');
                currProfileDiv.appendChild(br);

                let hr = document.createElement('hr');
                currProfileDiv.appendChild(hr);

                let usernameLabel = document.createElement('label');
                usernameLabel.textContent = 'Username';
                currProfileDiv.appendChild(usernameLabel);

                let usernameInput = document.createElement('input');
                usernameInput.type = 'text';
                usernameInput.name = `user${counter}Username`;
                usernameInput.disabled = true;
                usernameInput.readOnly = true;
                usernameInput.value = username;
                currProfileDiv.appendChild(usernameInput);

                let hiddenDiv = document.createElement('div');
                hiddenDiv.id = `user${counter}HiddenFields`;
                hiddenDiv.style.display = 'none';

                let hr2 = document.createElement('hr');
                hiddenDiv.appendChild(hr2);

                let emailLabel = document.createElement('label');
                emailLabel.textContent = 'Email:'
                hiddenDiv.appendChild(emailLabel);

                let emailInput = document.createElement('input');
                emailInput.type = 'email';
                emailInput.name = `user${counter}Email`;
                emailInput.value = email;
                emailInput.disabled = true;
                emailInput.readOnly = true;
                hiddenDiv.appendChild(emailInput);

                let ageLabel = document.createElement('label');
                ageLabel.textContent = 'Age:';
                hiddenDiv.appendChild(ageLabel);

                let ageInput = document.createElement('input');
                ageInput.type = 'email';
                ageInput.name = `user${counter}Age`;
                ageInput.value = age;
                ageInput.disabled = true;
                ageInput.readOnly = true;
                hiddenDiv.appendChild(ageInput);

                currProfileDiv.appendChild(hiddenDiv);

                let showMoreBtn = document.createElement('button');
                showMoreBtn.textContent = 'Show more';
                currProfileDiv.appendChild(showMoreBtn);

                showMoreBtn.addEventListener('click', (event) => {
                    let parent = event.target.parentElement;
                    let [lockBtn, unlockBtn] = parent.querySelectorAll('input[type="radio"]');
                    if (lockBtn.checked == false) {
                        if (showMoreBtn.textContent == 'Show more') {
                            hiddenDiv.style.display = 'block';
                            showMoreBtn.textContent = 'Hide it';
                        } else {
                            hiddenDiv.style.display = 'none';
                            showMoreBtn.textContent = 'Show more';
                        }
                    }
                })

                main.appendChild(currProfileDiv);
            }
        })
}