function loadRepos() {

	let unorderedList = document.getElementById('repos');
	let username = document.getElementById('username').value;

	let url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
	.then(response => {
		if (response.ok == false) {
			console.log('Error encountered!', response.status, 'Not Found');
		} else {
			return response.json();
		}
	}).then(data => {
		unorderedList.replaceChildren();
		data.forEach((repo) => {
			let listItem = document.createElement('li');
			let anchor = document.createElement('a');
			anchor.textContent = repo.full_name;
			anchor.href = repo.html_url;
			listItem.appendChild(anchor);
			unorderedList.appendChild(listItem);
		})
	})
}