(function () {

    var idUser = 4873191;
    var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
    var searchUrl = "https://www.bodas.net/website/website-AjaxRsvpRun.php";
    var userUrl = "https://www.bodas.net/website/website-AjaxRsvpLayer.php?idContacto=";

    var outputField = document.getElementById('output');
    var searchField = document.getElementById('post');

    function doCORSRequest(options, printResult) {
        var x = new XMLHttpRequest();
        x.open(options.method, cors_api_url + options.url);
        x.onload = x.onerror = function () {
            printResult(x.responseText, x.status)
        };
        if (/^POST/i.test(options.method)) {
            x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        x.send(options.data);
    }

    function fetchUser(userId) {
        doCORSRequest({
            method: 'GET',
            url: userUrl + userId
        }, function (result) {
            outputField.innerHTML = result;

            var buttons = outputField.querySelectorAll('button');
            console.log(buttons);
        });
    }

    function fetchSearchResult(){
        var nombre = escape(document.getElementById("nombre").value);
        var apellidos = escape(document.getElementById("apellidos").value);

        doCORSRequest({
            method: 'POST',
            url: searchUrl,
            data: "toConfirm=&idUser="+idUser+"&nombre="+nombre+"&apellidos="+apellidos
        }, function (response) {
            var result = JSON.parse(response);
            outputField.innerHTML = result.html;

            var buttons = outputField.querySelectorAll('button');
            buttons.forEach(element => {
                var id = element.closest('[data-id-contacto]').dataset["idContacto"];
                element.onclick = () => fetchUser(id);
            });
        });
    }

    searchField.onclick = function (e) {
        e.preventDefault();
        fetchSearchResult();
    };
    
})();