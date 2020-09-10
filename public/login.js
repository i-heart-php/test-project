var form = document.getElementById("login-form");
var card = document.getElementById("demo-output");
var nav = document.getElementById("nav");
var saveNewbtn = document.getElementById("save-new");
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
                    // normally I would deconstruct errors from the api response
                    content: JSON.stringify(data.error, null, 2),
                    title: "Login Error",
                    alertType: "alert-danger",
                    fillType: "filled",
                });
            } else if (data.token) {
                // save JWT in localstorage
                window.localStorage.setItem("token", data.token);
                loggedInInit();
            }
        });
};

if (window.localStorage.getItem("token")) {
    loggedInInit();
}

function loggedInInit() {
    addLogout();
    addCreate();
    reloadServers();
    saveNewbtn.onclick = saveNewSever;
}

function logOut() {
    var requestOptions = {
        method: "POST",
        withCredentials: true,
        credentials: "include",
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
    };
    fetch("api/logout", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            // normally I would vaildate the response before
            // killing JWT token and reloading SPA
            window.localStorage.clear();
            window.location.reload();
        });
}

function addLogout() {
    var button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.classList.add("float-right");
    button.type = "button";
    button.onclick = logOut;
    button.textContent = "Logout";
    nav.appendChild(button);
}

function addCreate() {
    var a = document.createElement("a");
    a.classList.add("btn");
    a.classList.add("btn-success");
    a.type = "a";
    a.textContent = "Create";
    a.href = "#new-server";
    nav.appendChild(a);
}

function saveNewSever() {
    var newServerForm = document.getElementById("new-server-form");
    fetch("/api/server", {
        method: "POST",
        credentials: "include",
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        body: new FormData(newServerForm),
    })
        .then((response) => response.json())
        .then((data) => {
            reloadServers();
        });
}

function editField(e) {
    var id = e.target.parentElement.dataset.id;
    var value = e.target.innerText;
    var fieldname = e.target.id;

    var requestOptions = {
        method: "PATCH",
        withCredentials: true,
        credentials: "include",
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name: fieldname, value }),
    };
    fetch("api/server", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            reloadServers();
        });
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

var debouncedEditField = debounce(editField, 250);

function deleteServer(e) {
    var row = e.target.parentElement.parentElement;
    var id = row.dataset.id;
    var requestOptions = {
        method: "DELETE",
        withCredentials: true,
        credentials: "include",
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        body: id,
    };
    fetch("api/server", requestOptions).then((response) => {
        row.remove();

        // just in case lets refresh
        reloadServers();
    });
}

function reloadServers() {
    card.innerHTML = "";
    var table = document.createElement("table");
    table.classList.add("table");
    table.innerHTML = `
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Domain Name</th>
            <th>Description</th>
            <th></th>
        </tr>
    </thead>
    <tbody id="results">
    </tbody>`;
    card.appendChild(table);

    var requestOptions = {
        method: "GET",
        withCredentials: true,
        credentials: "include",
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
    };
    fetch("/api/servers", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            var results = document.getElementById("results");
            results.innerHTML = "";
            if (result.servers) {
                for (let server of result.servers) {
                    var tr = document.createElement("tr");
                    tr.dataset.id = server.id;
                    tr.innerHTML = `
                        <td>${server.id}</td>
                        <td class="field" id="name" contenteditable="true">${server.name}</td>
                        <td class="field" id="fqdn" contenteditable="true">${server.fqdn}</td>
                        <td class="field" id="description" contenteditable="true">${server.description}</td>
                        <td><button class="btn btn-danger del-server" type="button">Delete</button></td>
                    `;
                    results.appendChild(tr);
                }
                var inputs = document.querySelectorAll(".field");
                for (let input of inputs) {
                    input.addEventListener("input", debouncedEditField);
                }
                var inputs = document.querySelectorAll(".del-server");
                for (let input of inputs) {
                    input.addEventListener("click", deleteServer);
                }
            }
        });
}
