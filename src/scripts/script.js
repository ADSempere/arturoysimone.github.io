(function () {

    function showSuccessMessage(name){
        document.getElementById('success-name').innerHTML = name;
        document.getElementById('error-message').style.display = "none";
        document.getElementById('success-message').style.display = "block";
    }

    function showErrorMessage(){
        document.getElementById('error-message').style.display = "block";
        document.getElementById('success-message').style.display = "none";
    }

    function showPending(){
        document.querySelector('.spinner').style.display = "block";
        document.getElementById('submit-form').disabled = true;
    }

    function hidePending(){
        document.querySelector('.spinner').style.display = "none";
        document.getElementById('submit-form').disabled = false;
        
    }

    document.getElementById('submit-form').onclick = function(e){
        e.preventDefault();

        if (!this.form.reportValidity()) return;

        showPending();

        var name = this.form.querySelector('[name=name]').value;
        var comment = this.form.querySelector('[name=comment]').value;
        var confirmation = this.form.querySelector('[name=confirmation]').checked;
        var data = "name="+encodeURIComponent(name)
                    +"&comment="+encodeURIComponent(comment)
                    +"&confirmation="+encodeURIComponent(confirmation);
        var url = "https://script.google.com/macros/s/AKfycbxhS3vastRhNTUQR9EreGxN7BLh65FFLMSaN1wf_WtFFYC-uS0/exec?" + data

        var x = new XMLHttpRequest();
        x.open('GET', url);
        x.onload = x.onerror = function () {
            try {
                var result = JSON.parse(x.responseText);
                console.log(result)
                if (result.result === "success"){
                    showSuccessMessage(name);
                } else {
                    showErrorMessage()
                }
            } catch (e) {
                showErrorMessage();
                console.log(e); 
            }

            hidePending();
        };
        x.send();
    }
})();