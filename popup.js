
const myButton = document.querySelector('#generate');

function category() {
    statement = "";

    if (document.getElementById('programming').checked) {
        statement += "programming"
    }
    if (document.getElementById("misc").checked) {
        if (statement != "") {
            statement += ",";
        }
        statement += "miscellaneous";
    }
    if (document.getElementById('dark').checked) {
        if (statement != "") {
            statement += ",";
        }
        statement += "dark";
    }
    if (document.getElementById('pun').checked) {
        if (statement != "") {
            statement += ",";
        }
        statement += "pun";
    }
    if (document.getElementById('spooky').checked) {
        if (statement != "") {
            statement += ",";
        }
        statement += "spooky";
    }
    if (document.getElementById('christmas').checked) {
        if (statement != "") {
            statement += ",";
        }
        statement += "christmas";
    }

    if (statement == "") { statement = "Any" }

    return statement;
}

function includes() {
    statement = "";

    if (document.getElementById('includes').value != undefined) {
        statement = document.getElementById('includes').value;
    }

    return statement;
}


function generate() {

    fetch('https://v2.jokeapi.dev/joke/' + category() + '?blacklistFlags=nsfw,racist,sexist&contains=' + includes())
    .then(function (response) {
        return response.json();
    })
    .then(function (data) { 
        appendData(data);
    })

    function appendData(data) {
        if (data.type == "single") {
            document.getElementById("setup").innerHTML = data.joke;
            document.getElementById("delivery").innerHTML = "";

        } else if (data.type == "twopart") {
            document.getElementById("setup").innerHTML = data.setup + "<hr>";
            document.getElementById("delivery").innerHTML = data.delivery;
        } else {
            document.getElementById("setup").innerHTML = "No matching joke found. Remove some filters and try again!";
            document.getElementById("delivery").innerHTML = "";
        }
        
    }
    
}

myButton.onclick = generate;
