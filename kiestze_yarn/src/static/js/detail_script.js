"use strict";

import { updateQueryStringParam, getParameterByName, findAncestor, findClosestTagnameInHiarchy } from './static_utils.js';
import { JsonRequest, GetDjangoUrl, GetGemeenteNaamForNis, approve, GetOtbUrl } from './common.js';

const politieker_naam = document.getElementById("politieker_naam");
const persoon_foto = document.getElementById("persoon_foto");
const partij_naam = document.getElementById("partij_naam");
const politieker_openthebox = document.getElementById("politieker_openthebox");
const politieker_openthebox_found = document.getElementById("politieker_openthebox_found");
const politieker_openthebox_not_found = document.getElementById("politieker_openthebox_not_found");
const gemeente_element = document.getElementById("gemeente_element");
const input_foto_url = document.getElementById("input_foto_url");
const lijst_terug_knop = document.getElementById("lijst_terug_knop");
const belijds_thema_paragraph = document.getElementById("belijds_thema_paragraph");
const previews_openthebox_id = document.getElementById("previews_openthebox_id");

if(lijst_terug_knop) // selectedPartijId=${getParameterByName("partij_id")}&
  lijst_terug_knop.href=`lijst?selectedNis=${getParameterByName("selectedNis")}`

/*
politieker_website_button.addEventListener("click", function(evt)
{
  const suggestedValue = evt.target.parentElement.querySelector('input[name="suggestedValue"]').value;
  approve(model.selectedPolitiekerId, "website", suggestedValue, AfterApprove);
})*/

input_foto_url.addEventListener("click", function(evt)
{
  const suggestedValue = evt.target.parentElement.querySelector('input[name="suggestedValue"]').value;
  approve(model.selectedPolitiekerId, "foto", suggestedValue, AfterApprove);
})

function AfterApprove()
{
  model.djangoData.get_last_accepted_edit.Reload();
}


function OpenModal(m)
{
  if(!m.classList.contains("w3s-modal")) console.warn("Not a modal!");
  m.style.display = "block";
}
function CloseModal(m)
{
  if(!m.classList.contains("w3s-modal")) console.warn("Not a modal!");
  m.style.display = "none";

  model.djangoData.get_last_accepted_edit.Reload(); // hacky buisiness logic
}

// Fix all modals in document
(function() {
  const closeSpans = document.getElementsByClassName("w3s-closeSpan");
  for (let i = 0; i < closeSpans.length; i++) {
    const closeSpan = closeSpans[i]
    closeSpan.onclick = function (evt) {
      const m = findAncestor(evt.target, ".w3s-modal")
      CloseModal(m)
    }
  }
  const w3sModals = document.getElementsByClassName("w3s-modal");
  // In separate function to give m a new scope
  const attachCloseEvent = function(m) {
    m.addEventListener("click", function(){
      CloseModal(m)
    })
  }
  for (let i = 0; i < w3sModals.length; i++) {
    const m = w3sModals[i]
    attachCloseEvent(m)
  }
})();


function HookUpModalBlock(fieldname)
{
  const edit_fieldname = document.getElementById(`edit_${fieldname}`);
  const edit_fieldname_modal = document.getElementById(`edit_${fieldname}_modal`);
  if(edit_fieldname) {

    edit_fieldname.onclick = function (evt) {
      OpenModal(edit_fieldname_modal)

      const politieker = model.selectedPolitiekerId;
      const iframe = findClosestTagnameInHiarchy(evt.target, "iframe");
      iframe.src = 
        GetDjangoUrl(`/politieker_editablefield_editor?politieker=${politieker}&fieldname=${fieldname}&userName=${model.userName}`);
    }
  }
}
HookUpModalBlock("openthebox_id")
HookUpModalBlock("belijds_thema")
HookUpModalBlock("facebook")
HookUpModalBlock("twitter")
HookUpModalBlock("linkedin")
HookUpModalBlock("website")
//HookUpModalBlock("email")


function ShowSocialMediaIcon(politieker, fieldname) {
  const fieldVal = politieker.edits[fieldname];
  const el = document.getElementById(`politieker_${fieldname}`)
  if(fieldVal == null)
    el.parentElement.parentElement.style.display = "none"
  else{
    RemoveInlineDisplayStyle(el)
    el.href = fieldVal
  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function ShowPolitiekerBelijdsThemas(suggested_value)
{
  //belijds_thema_paragraph.innerHTML = RenderEditableFieldStringToHtml(suggested_value, "belijds_thema");
  
  let html = ""
  if (suggested_value != null) {
    const belijds_thema = suggested_value.split("|");
    for (let i = 0; i < belijds_thema.length; i++) {
      const t = belijds_thema[i]
      html+=`<div class="d-flex flex-row">
      <img src="static/assets/img/blue-bol.svg" alt="opsommingsteken" width="20" height="20" class="mr-3 mt-1">
      <p class="list-items-detail">${capitalizeFirstLetter(t)}</p>
      </div>`
    }
  }
  belijds_thema_paragraph.innerHTML = html; // Clear
}

function BadString(str)
{
  return str == null || str == "";
}

function RemoveInlineDisplayStyle(elem){
  if (elem.style.removeProperty) {
    elem.style.removeProperty('display');
  } else {
    elem.style.removeAttribute('display'); // IE
  }
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

  {
    if(politieker.edits.openthebox_id)
      model.openthebox_person.url = `https://openthebox.be/api/graph/neighbourhood/Person/${politieker.edits.openthebox_id}/nl?hops=1`;
    else
      model.openthebox_person.url = "";

    const otb_json = model.openthebox_person.json;
    let html = ""
    if(otb_json)
    {
      for (let i = 0; i < otb_json.length; i++) {
        const j = otb_json[i]
        if(j.group == "nodes" && j.data.pid != politieker.data.openthebox_id) {
          html += `<b>${j.data.caption}</b><br/>`
        }
      }

    }
    previews_openthebox_id.innerHTML = html;
  }

  politieker_naam.innerText = politieker.naam;

  let objectFit = `contain`;
  let profiel_foto = "static/assets/img/default_man.svg";
  if(politieker.geslacht == `F`) {
    profiel_foto = "static/assets/img/default_vrouw.svg";
  }
  if(politieker.edits.foto)
  {
    profiel_foto = politieker.edits.foto
    objectFit = `cover`;
  } else if (politieker.edits.twitter){
    const s = politieker.edits.twitter;
    const i = s.lastIndexOf("twitter.com/")
    let j = s.indexOf("?", i);
    if(j==-1) j = s.length;
    const begin = i + "twitter.com/".length;
    const screen_name = s.substring(begin, j);
    profiel_foto = `https://twitter.com/${screen_name}/profile_image?size=original`
    // Proxy, becouse twitter has some CORS restrictions
    profiel_foto = GetDjangoUrl(`/proxy?url=${encodeURIComponent(profiel_foto)}`)
  }
  persoon_foto.src = profiel_foto;
  persoon_foto.style.objectFit = objectFit;

  partij_naam.innerText = partij.lijstnaam

  //ShowSocialMediaIcon(politieker, "openthebox_id")
  //ShowSocialMediaIcon(politieker, "belijds_thema")
  ShowSocialMediaIcon(politieker, "facebook")
  ShowSocialMediaIcon(politieker, "twitter")
  ShowSocialMediaIcon(politieker, "linkedin")
  ShowSocialMediaIcon(politieker, "website")
  //ShowSocialMediaIcon(politieker, "email")

  if(politieker.edits.openthebox_id == null){
    politieker_openthebox_found.style.display = "none"
    RemoveInlineDisplayStyle(politieker_openthebox_not_found)
  }
  else{
    RemoveInlineDisplayStyle(politieker_openthebox_found)
    politieker_openthebox_not_found.style.display = "none"
    politieker_openthebox.href = GetOtbUrl(politieker.edits.openthebox_id)
  }

  gemeente_element.innerText = GetGemeenteNaamForNis(partij.nis)

  ShowPolitiekerBelijdsThemas(politieker.edits.belijds_thema);
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

  get userName() {
    const el = document.getElementById("user_login_span");
    if(el == null) return null;
    return el.innerText;
  },

  djangoData: {
    get_partij: new JsonRequest("", UpdateAll),
    get_last_accepted_edit: new JsonRequest("", UpdateAll),
  },
  openthebox_person: new JsonRequest("", UpdateAll),
}
window["model"] = model;

model.selectedPartijId = getParameterByName("partij_id")
model.selectedPolitiekerId = getParameterByName("politieker_id")

UpdateAll()

