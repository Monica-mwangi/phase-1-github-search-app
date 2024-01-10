document.getElementById('github-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const getSearch = document.getElementById('search').value;
    const searchUrl = `https://api.github.com/search/users?q=${getSearch}`;

    const headers = new Headers();
    headers.append("Accept", "application/vnd.github.v3+json");

    const requestOptions = {
        method: "GET",
        headers: headers,
    };

    fetch(searchUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            const users = data.items;

            document.getElementById("user-list").innerHTML = "";
            document.getElementById("repos-list").innerHTML = "";

            users.forEach(user => {
                const userName = user.login;
                const avatarUrl = user.avatar_url;
                const profileUrl = user.html_url;

                const usernameElement = document.createElement("h3");
                const avatarElement = document.createElement("img");
                const profileElement = document.createElement("a");

                usernameElement.textContent = userName;
                avatarElement.src = avatarUrl;
                profileElement.href = profileUrl;
                profileElement.textContent = "View Profile";

                usernameElement.addEventListener("click", function () {
                    getUsersRepos(userName);
                });

                document.getElementById("user-list").appendChild(usernameElement);
                document.getElementById("user-list").appendChild(avatarElement);
                document.getElementById("user-list").appendChild(profileElement);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

function getUsersRepos(username) {
    const reposUrl = `https://api.github.com/users/${username}/repos`;
    const headers = new Headers();
    headers.append("Accept", "application/vnd.github.v3+json");

    const requestOptions = {
        method: "GET",
        headers: headers,
    };

    fetch(reposUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            const repositories = data;

            document.getElementById("repos-list").innerHTML = "";

            repositories.forEach(repo => {
                const repoName = repo.name;
                const repoElement = document.createElement("li");
                repoElement.textContent = repoName;
                document.getElementById("repos-list").appendChild(repoElement);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

        
    


