function serialize(form){if(!form||form.nodeName!=="FORM"){return }var i,j,q=[];for(i=form.elements.length-1;i>=0;i=i-1){if(form.elements[i].name===""){continue}switch(form.elements[i].nodeName){case"INPUT":switch(form.elements[i].type){case"text":case"hidden":case"password":case"button":case"reset":case"submit":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"checkbox":case"radio":if(form.elements[i].checked){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value))}break;case"file":break}break;case"TEXTAREA":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"SELECT":switch(form.elements[i].type){case"select-one":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"select-multiple":for(j=form.elements[i].options.length-1;j>=0;j=j-1){if(form.elements[i].options[j].selected){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].options[j].value))}}break}break;case"BUTTON":switch(form.elements[i].type){case"reset":case"submit":case"button":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break}break}}return q.join("&")};
function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, options.url);
    x.onload = x.onerror = function () {
        printResult(x.responseText, x.status)
    };
    if (/^POST/i.test(options.method)) {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
    x.send(options.data);
}

(function () {
    document.getElementById('submit-form').onclick = function(e){
        e.preventDefault();
        var name = this.form.querySelector('input[name=name]').value;
        var comment = this.form.querySelector('input[name=comment]').value;
        var confirmation = this.form.querySelector('input[name=confirmation]').value;
        var data = "name="+encodeURIComponent(name)
                    +"&comment="+encodeURIComponent(comment)
                    +"&confirmation="+encodeURIComponent(confirmation);
        var url = "https://script.google.com/macros/s/AKfycbxhS3vastRhNTUQR9EreGxN7BLh65FFLMSaN1wf_WtFFYC-uS0/exec?"
        console.log(this,url+data);
        doCORSRequest({
            method: 'GET',
            url: url + data,
        }, function(response){
            var result = JSON.parse(response);
            if (result.result === "success"){
                
                document.getElementById('success-name').innerHTML = name;
            }
            console.log(response);
        });
    }
})();