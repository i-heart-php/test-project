var form = document.getElementById("login-form");
var card = document.getElementById("demo-output");
var nav = document.getElementById("nav");
form.onsubmit = function (e) {
    e.preventDefault();
    window.localStorage.clear();
    fetch("/api/auth/login", {
        method: "POST",
        body: new FormData(form),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                halfmoon.initStickyAlert({
                    // normally I would deconstruct errors from the api
                    content: JSON.stringify(data.error, null, 2),
                    title: "Login Error",
                    alertType: "alert-danger",
                    fillType: "filled",
                });
            } else if (data.token) {
                // save JWT in localstorage for peristance
                window.localStorage.setItem("token", data.token);
                loadServers();
            }
        });
};

if (window.localStorage.getItem("token")) {
    loadServers();
}

function loadServers() {
    card.innerHTML = "";
    var table = document.createElement("table");
    table.classList.add("table");
    table.innerHTML = `
    <thead>
        <tr>
            <th>#</th>
            <th>Domain Name</th>
            <th>Description</th>
            <th></th>
        </tr>
    </thead>
    <tbody id="results">
    </tbody>`;
    card.appendChild(table);
    addLogout();

    var requestOptions = {
        method: "GET",
        redirect: "follow",
        withCredentials: true,
        credentials: "include",
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
    };
    fetch("/api/servers", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
}

function logOut() {
    window.localStorage.clear();
    window.location.reload();
}
function addLogout() {
    var button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-danger");
    button.type = "button";
    button.onclick = logOut;
    button.textContent = "Logout";
    nav.appendChild(button);
}
