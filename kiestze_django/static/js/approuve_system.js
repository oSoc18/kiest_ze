
'use strict';

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${  name  }(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


let csrfmiddlewaretoken = document.getElementsByName('csrfmiddlewaretoken')[0];

//let politieker_id = {{ politieker }};
let politieker_id = getParameterByName("politieker");
console.log(politieker_id);

function submitUserEdit(evt, fieldname) {
    approve(politieker_id, fieldname, evt.target.parentElement.querySelector('input[name="suggestedValue"]').value)
}

function approve(politieker, fieldname, suggested_value) {
    if(suggested_value == "" && ! window.confirm("Value is empty, sure you wan't to submit?"))
        return;
    console.log(politieker, fieldname, suggested_value)

    let data = new FormData();
    data.append('csrfmiddlewaretoken', csrfmiddlewaretoken.value);
    data.append('politieker', politieker);
    data.append('fieldname', fieldname);
    data.append('value', suggested_value);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'request_edit', true);
    xhr.onload = function () {
        console.log(this.responseText);
        //location.reload();
    };
    xhr.send(data);
}