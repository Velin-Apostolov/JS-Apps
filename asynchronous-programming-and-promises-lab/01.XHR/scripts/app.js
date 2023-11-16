function loadRepos() {

   let textDiv = document.getElementById('res');

   let httpRequest = new XMLHttpRequest();

   httpRequest.addEventListener('readystatechange', displayRepos);
   httpRequest.open('GET', 'https://api.github.com/users/testnakov/repos');
   httpRequest.send();

   function displayRepos() {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
         textDiv.textContent = httpRequest.responseText;
      }
   }

}