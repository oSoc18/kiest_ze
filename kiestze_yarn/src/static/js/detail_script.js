"use strict";

import { updateQueryStringParam, getParameterByName } from './static_utils.js';
import { JsonRequest, GetDjangoUrl } from './common.js';
import { ah } from './admin_hierarchy-1.0.0.js';

const politieker_naam = document.getElementById("politieker_naam");
const persoon_foto = document.getElementById("persoon_foto");
const partij_naam = document.getElementById("partij_naam");
const politieker_website = document.getElementById("politieker_website");
//const politieker_website_input = document.getElementById("politieker_website_input");
const politieker_website_button = document.getElementById("politieker_website_button");
const politieker_facebook = document.getElementById("politieker_facebook");
const politieker_twitter = document.getElementById("politieker_twitter");
const politieker_linkedin = document.getElementById("politieker_linkedin");
const politieker_openthebox = document.getElementById("politieker_openthebox");
const politieker_openthebox_not_found = document.getElementById("politieker_openthebox_not_found");
const gemeente_element = document.getElementById("gemeente_element");
const input_foto_url = document.getElementById("input_foto_url");


politieker_website_button.addEventListener("click", function(evt)
{
  const suggestedValue = evt.target.parentElement.querySelector('input[name="suggestedValue"]').value;
  approve(model.selectedPolitiekerId, "website", suggestedValue);
})

input_foto_url.addEventListener("click", function(evt)
{
  const suggestedValue = evt.target.parentElement.querySelector('input[name="suggestedValue"]').value;
  approve(model.selectedPolitiekerId, "foto", suggestedValue);
})



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


function UpdateAll()
{
  model.djangoData.get_last_accepted_edit.url = GetDjangoUrl(`/get_last_accepted_edit?politieker=${model.selectedPolitiekerId}`)
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

  politieker_website.innerText = website_value;
  politieker_website.href = website_value;
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
    console.error("Not implemented yet!")
    value = parseInt(value); // enforce int
    if(this._selectedPolitiekerId === value) return;

    this._selectedPolitiekerId = value;
    updateQueryStringParam("politieker_id", model.selectedPolitiekerId)
    UpdateAll();
  },
  get selectedPolitiekerId() {
    return this._selectedPolitiekerId;
  },

  /*airTables: {
    Partij: new JsonRequest(GetTableUrl("Partij"), UpdateAll),
    PolitiekerRecord: null, 
    Organisaties: new JsonRequest(GetTableUrl("Organisaties"), UpdateAll),
    Stad: new JsonRequest(GetTableUrl("Stad"), UpdateAll),
  }*/
  djangoData: {
    //get_all_gemeentes:  new JsonRequest(GetDjangoUrl("/get_all_gemeentes"), UpdateAll), // TODO
    get_partij:  new JsonRequest("", UpdateAll),
    get_last_accepted_edit:  new JsonRequest("", UpdateAll),
    //get_politiekers:  new JsonRequest("", UpdateAll),
    //get_all_politieker_partij_link_van_gemeente:  new JsonRequest("", UpdateAll),
  },
}
window["model"] = model;

model.selectedPartijId = getParameterByName("partij_id")
model.selectedPolitiekerId = getParameterByName("politieker_id")
/*
function GetPolitiekerUrl(rec)
{
  return `https://api.airtable.com/v0/app5SoKsYnuOY96ef/Politiekers/${rec}?api_key=key2Jl1YfS4WWBFa5`
}

model.airTables.PolitiekerRecord = new JsonRequest(GetPolitiekerUrl(model.politieker_id), UpdateAll)
*/

UpdateAll()


function GetGemeenteNaamForNis(nis)
{
  let result = null;
  function Recurse(el)
  {
    const children = el; //.children;
    if(typeof children == "string") return;
    for (const property in children) {
      if (children.hasOwnProperty(property)) {
        const child_el = children[property]
        if(property == 11292){
          console.log("the end is near")
        }
        if(property == nis)
        {
          result = child_el["naam"]
          return;
        }
        Recurse(child_el);
        if(result != null)
          return;
      }
    }
  }
  Recurse(ah["02000"]); // From admin_hiearchy file
  return result;
}