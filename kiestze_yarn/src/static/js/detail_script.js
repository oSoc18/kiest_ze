"use strict";

import { updateQueryStringParam, getParameterByName } from './static_utils.js';
import { JsonRequest, GetDjangoUrl, GetGemeenteNaamForNis } from './common.js';

const politieker_naam = document.getElementById("politieker_naam");
const persoon_foto = document.getElementById("persoon_foto");
const partij_naam = document.getElementById("partij_naam");
//const politieker_website = document.getElementById("politieker_website");
//const politieker_website_button = document.getElementById("politieker_website_button");
const politieker_facebook = document.getElementById("politieker_facebook");
const politieker_twitter = document.getElementById("politieker_twitter");
const politieker_linkedin = document.getElementById("politieker_linkedin");
const politieker_openthebox = document.getElementById("politieker_openthebox");
const politieker_openthebox_not_found = document.getElementById("politieker_openthebox_not_found");
const gemeente_element = document.getElementById("gemeente_element");
const input_foto_url = document.getElementById("input_foto_url");

/*
politieker_website_button.addEventListener("click", function(evt)
{
  const suggestedValue = evt.target.parentElement.querySelector('input[name="suggestedValue"]').value;
  approve(model.selectedPolitiekerId, "website", suggestedValue);
})*/

input_foto_url.addEventListener("click", function(evt)
{
  const suggestedValue = evt.target.parentElement.querySelector('input[name="suggestedValue"]').value;
  approve(model.selectedPolitiekerId, "foto", suggestedValue);
})





const modal = document.getElementById('myModal');
const btnMaakAanpassing = document.getElementById("btnMaakAanpassing");
const closeSpan = document.getElementsByClassName("closeSpan")[0];

btnMaakAanpassing.onclick = function(evt) {
    modal.style.display = "block"; // Open modal
  
    const politieker = model.selectedPolitiekerId;
    const fieldname = evt.target.value;
    evt.target.parentElement.getElementsByTagName("iframe")[0].src = `http://127.0.0.1:8000/politieker_editablefield_editor?politieker=22295&fieldname=${fieldname}`;
}

closeSpan.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




function approve(politieker, fieldname, suggested_value) {
  const data = new FormData();
  const csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0]
  if(csrfmiddlewaretoken != null)
    data.append('csrfmiddlewaretoken', csrfmiddlewaretoken.value);
  else console.error("csrfmiddlewaretoken should be injected by Django")
  data.append('politieker', politieker);
  data.append('fieldname', fieldname);
  data.append('value', suggested_value);

  const xhr = new XMLHttpRequest();
  xhr.open('POST',  GetDjangoUrl('request_edit'), true);
  xhr.onload = function () {
    console.log(this.responseText);
    model.djangoData.get_last_accepted_edit.Reload();
    //location.reload();
  };
  xhr.send(data);
}

function BadString(str)
{
  return str == null || str == "";
}

function UpdateAll()
{
  if(!BadString(model.selectedPolitiekerId))
    model.djangoData.get_last_accepted_edit.url = GetDjangoUrl(`/get_last_accepted_edit?politieker=${model.selectedPolitiekerId}`)
  if(!BadString(model.selectedPartijId))
    model.djangoData.get_partij.url = GetDjangoUrl(`/get_partij?partij_id=${model.selectedPartijId}`)

  const politieker = model.djangoData.get_last_accepted_edit.json
  if(politieker == null) return;

  let partij = model.djangoData.get_partij.json;
  if(partij == null) return;
  partij = partij[model.selectedPartijId] // Hack

  politieker_naam.innerText = politieker.naam;

  let objectFit = `contain`;
  let profiel_foto = "static/assets/img/default_man.svg";
  if(politieker.geslacht == `F`) {
    profiel_foto = "static/assets/img/default_vrouw.svg";
  }
  if(politieker.edits.foto)
  {
    profiel_foto = politieker.edits.foto.suggested_value
    objectFit = `cover`;
  }
  persoon_foto.src = profiel_foto;
  persoon_foto.style.objectFit = objectFit;

  partij_naam.innerText = partij.lijstnaam

  let website_value = "";
  if(politieker.edits.website != null)
    website_value = politieker.edits.website.suggested_value

  //politieker_website.innerText = website_value;
  //politieker_website.href = website_value;
  //politieker_website_input.value = website_value;

  if(politieker.edits.facebook == null)
    politieker_facebook.style.display = "none"
  else{
    politieker_facebook.style.display = "inline"
    politieker_facebook.href = politieker.edits.facebook.suggested_value
  }
  if(politieker.edits.twitter == null)
    politieker_twitter.style.display = "none"
  else{
    politieker_twitter.style.display = "inline"
    politieker_twitter.href = politieker.edits.twitter.suggested_value
  }
  if(politieker.edits.linkedin == null)
    politieker_linkedin.style.display = "none"
  else{
    politieker_linkedin.style.display = "inline"
    politieker_linkedin.href = politieker.edits.linkedin.suggested_value
  }

  if(politieker.edits.openthebox_id == null){
    politieker_openthebox.style.display = "none"
    politieker_openthebox_not_found.style.display = "inherit"
  }
  else{
    politieker_openthebox.style.display = "inline"
    politieker_openthebox_not_found.style.display = "none"
    politieker_openthebox.href = `https://openthebox.be/person/${politieker.edits.openthebox_id.suggested_value}`
  }

  gemeente_element.innerText = GetGemeenteNaamForNis(partij.nis)
}

const model = {
  /* NEEDED?
  _inputString: "",
  set inputString(value) {
    if(this._inputString === value) return;

    this._inputString = value;
    UpdateAll();
  },
  get inputString() {
    return this._inputString;
  },*/

  _selectedPartijId: "",
  set selectedPartijId(value) {
    value = parseInt(value); // enforce int
    if(this._selectedPartijId === value) return;

    this._selectedPartijId = value;
    updateQueryStringParam("partij_id", model.selectedPartijId)
    UpdateAll();
  },
  get selectedPartijId() {
    return this._selectedPartijId;
  },


  _selectedPolitiekerId: "",
  set selectedPolitiekerId(value) {
    //console.error("Not implemented yet!")
    value = parseInt(value); // enforce int
    if(this._selectedPolitiekerId === value) return;

    this._selectedPolitiekerId = value;
    updateQueryStringParam("politieker_id", model.selectedPolitiekerId)
    UpdateAll();
  },
  get selectedPolitiekerId() {
    return this._selectedPolitiekerId;
  },

  djangoData: {
    get_partij:  new JsonRequest("", UpdateAll),
    get_last_accepted_edit:  new JsonRequest("", UpdateAll),
  },
}
window["model"] = model;

model.selectedPartijId = getParameterByName("partij_id")
model.selectedPolitiekerId = getParameterByName("politieker_id")

UpdateAll()

