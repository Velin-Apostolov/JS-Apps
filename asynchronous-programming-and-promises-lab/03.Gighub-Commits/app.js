async function loadCommits() {
    // Try it with Fetch API
    let username = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;
    let commits = document.getElementById('commits');

    let url = `https://api.github.com/repos/${username}/${repo}/commits`;

    // fetch(url)
    // .then(response => {
    //     if (response.ok == false) {
    //         throw response.status;
    //     } else {
    //         return response.json();
    //     }
    // }).then(data => {
    //     commits.replaceChildren();
    //     data.forEach(line => {
    //         let li = document.createElement('li');
    //         li.textContent = `${line.commit.author.name}: ${line.commit.message}`;
    //         commits.appendChild(li);
    //     });
    // }).catch(error => {
    //     commits.replaceChildren();
    //     let li = document.createElement('li');
    //     li.textContent = `Error: ${error} (Not Found)`;
    //     commits.appendChild(li);
    // });

    try {

        const response = await fetch(url);

        if (response.ok == false) {
            throw response.status;
        }

        const data = await response.json();

        commits.replaceChildren();
        
        data.forEach(line => {
            let li = document.createElement('li');
            li.textContent = `${line.commit.author.name}: ${line.commit.message}`;
            commits.appendChild(li);
        });

    } catch(error) {
        commits.replaceChildren();
        let li = document.createElement('li');
        li.textContent = `Error: ${error} (Not Found)`;
        commits.appendChild(li);
    }

}