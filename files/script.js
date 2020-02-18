function serialize(form){if(!form||form.nodeName!=="FORM"){return }var i,j,q=[];for(i=form.elements.length-1;i>=0;i=i-1){if(form.elements[i].name===""){continue}switch(form.elements[i].nodeName){case"INPUT":switch(form.elements[i].type){case"text":case"hidden":case"password":case"button":case"reset":case"submit":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"checkbox":case"radio":if(form.elements[i].checked){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value))}break;case"file":break}break;case"TEXTAREA":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"SELECT":switch(form.elements[i].type){case"select-one":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"select-multiple":for(j=form.elements[i].options.length-1;j>=0;j=j-1){if(form.elements[i].options[j].selected){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].options[j].value))}}break}break;case"BUTTON":switch(form.elements[i].type){case"reset":case"submit":case"button":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break}break}}return q.join("&")};
(function () {

    var outputField = document.getElementById('output');

    var corsUrl = ''; //'https://cors-anywhere.herokuapp.com/' 
    function doCORSRequest(options, printResult) {
        var x = new XMLHttpRequest();
        x.open(options.method, corsUrl + options.url);
        x.onload = x.onerror = function () {
            printResult(x.responseText, x.status)
        };
        if (/^POST/i.test(options.method)) {
            x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        x.send(options.data);
    }


    document.getElementById('submit-form').onclick = function(e){
        e.preventDefault();
        var data = serialize(this.form);
        var url = "https://script.google.com/macros/s/AKfycbxhS3vastRhNTUQR9EreGxN7BLh65FFLMSaN1wf_WtFFYC-uS0/exec?"
        console.log(this,url+data);
        doCORSRequest({
            method: 'GET',
            url: url + data,
        }, function(response){
            console.log(response);
        });
    }


    function confirmUser() {
        var form = document.getElementById('app-website-frm-rsvp-confirm');
        doCORSRequest({
            method: 'POST',
            url: "https://www.bodas.net/website/website-AjaxRsvpLayerRun.php",
            data: serialize(form)
        }, function (response) {
            var result = JSON.parse(response);
            if (result.errCode === 0 ){
                outputField.innerHTML = "Respuesta guardada, gracias.";
            }
            else {
                alert(result.message);
            }
        });
    }

    function fetchUser(userId) {
        doCORSRequest({
            method: 'GET',
            url: "https://www.bodas.net/website/website-AjaxRsvpLayer.php?idContacto=" + userId
        }, function (result) {
            outputField.innerHTML = result;

            var buttonField = outputField.querySelector('input[type="Submit"');
            buttonField.onclick = function (e){
                e.preventDefault();
                confirmUser(buttonField);
            }
        });
    }

    function searchCallback(result) {
        if (result.errCode === 0 ){
            outputField.innerHTML = result.html;

            var buttons = outputField.querySelectorAll('button');
            buttons.forEach(element => {
                var id = element.closest('[data-id-contacto]').dataset["idContacto"];
                element.onclick = () => fetchUser(id);
            });
        }
        else {
            alert(result.message);
        }
    }

    function fetchSearchResult(){
        var nombre = escape(document.getElementById("nombre").value);
        var apellidos = escape(document.getElementById("apellidos").value);

        doCORSRequest({
            method: 'POST',
            url: "https://www.bodas.net/website/website-AjaxRsvpRun.php",
            data: "toConfirm=&idUser=4873191&nombre="+nombre+"&apellidos="+apellidos
        }, function (response) {
            var result = JSON.parse(response);
            searchCallback(result)
        });
    }

    document.getElementById('post').onclick = function (e) {
        e.preventDefault();
        fetchSearchResult();
    };

})();