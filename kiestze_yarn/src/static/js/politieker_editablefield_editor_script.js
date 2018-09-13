'use strict';

import { getParameterByName } from './static_utils.js';
import { approve, JsonRequest, GetDjangoUrl, RenderEditableFieldStringToHtml } from './common.js';
import { belijds_themas } from './belijds_themas.js';


const submit_new_value = document.getElementById("submit_new_value");
const input_new_value = document.getElementById("input_new_value");
const ul_suggesties = document.getElementById("ul_suggesties");
const belijds_thema_div = document.getElementById("belijds_thema_div");
const belijds_thema_1 = document.getElementById("belijds_thema_1");
const belijds_thema_2 = document.getElementById("belijds_thema_2");
const belijds_thema_3 = document.getElementById("belijds_thema_3");

document.body.addEventListener("change", function(){
  UpdateAll(); // Bring the overkill!
})
submit_new_value.addEventListener("click", submitUserEdit);

//let politieker_id = {{ politieker }};
const politieker_id = getParameterByName("politieker");
console.log(politieker_id);
const fieldname = getParameterByName("fieldname");

// Used from HTML
function submitUserEdit(evt) {
  approve(politieker_id, fieldname, evt.target.parentElement.querySelector('input[name="suggestedValue"]').value, AfterSubmit)
}

function AfterSubmit()
{
  model.djangoData.get_sugested_edits.Reload();
}

function DisplayBelijdsThemas()
{
  const belijds_thema_collection = [
    belijds_thema_1,
    belijds_thema_2,
    belijds_thema_3,
  ]

  for (let i = 0; i < belijds_thema_collection.length; i++) {
    const belijds_thema_el = belijds_thema_collection[i];

    for (let i = 0; i < belijds_themas.length; i++) {
      const thema_string = belijds_themas[i]
      const optionEl = document.createElement("option")
        optionEl.value = thema_string
        belijds_thema_el.appendChild(optionEl);
        
        optionEl.innerText = thema_string
    }
  }
}
DisplayBelijdsThemas();


const model = {
  valueToBeSubmitted : "",
  djangoData: {
    get_sugested_edits:  new JsonRequest(GetDjangoUrl(`/get_sugested_edits?politieker=${politieker_id}&fieldname=${fieldname}`), UpdateAll),
  },
}

window["model"] = model;




function DisplaySuggestedEdits() {
  const usedChildren = []

  const get_sugested_edits = model.djangoData.get_sugested_edits.json;

  for (const key in get_sugested_edits) {
    if (get_sugested_edits.hasOwnProperty(key)) {
      const sugested_edit = get_sugested_edits[key];

      let option = document.getElementById(`sugested_edit_${key}`)
      if(option == null)
      {
        option = document.createElement("li")
        option.id = `sugested_edit_${key}`
        ul_suggesties.appendChild(option);
        const display = RenderEditableFieldStringToHtml(key, fieldname)
        let btnClass = "button";
        for (let i = 0; i < sugested_edit.approvers.length; i++) {
          const ap = sugested_edit.approvers[i]
          if(ap.user_id == getParameterByName("userName"))
            btnClass = "button-already-voted"; // Need to implement CSS. Need to deactivate button too.
        }
        option.innerHTML = `
          <img src="/static/assets/img/pending.svg"/>
          <div class="value-el">${display}</div>
          <span class="dot">${sugested_edit.approvers.length}/3</span>
          <button class="${btnClass}">Dit klopt!</button>
          <br/>`
        const addEvtListnr = function(el, suggested_value){
          el.addEventListener(`click`, 
            function(){
              approve(politieker_id, fieldname, suggested_value, AfterSubmit)
            });
        }
        addEvtListnr(option.querySelector("button"), key);
      }
      usedChildren.push(option)
    }
  }

  const children = ul_suggesties.children; // life updating list
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if(!usedChildren.includes(child)){
      ul_suggesties.removeChild(child);
      i--;
    }
  }
}



function UpdateAll()
{
  /*
  const valueEls = document.dsffds("value-el")
  for (let i = 0; i < valueEls.length; i++) {
    const v = valueEls[i]
    v.innerHTML = RenderEditableFieldStringToHtml(fieldname, ); Django gives us prefilled values, need to return Json instead
  }*/

  input_new_value.style.display = "block";
  belijds_thema_div.style.display = "none"
  input_new_value.placeholder = ""

  switch(fieldname)
  {
    case "belijds_thema":
      input_new_value.style.display = "none";
      belijds_thema_div.style.display = "block"

      input_new_value.value = 
          `${belijds_thema_1.value}|${belijds_thema_2.value  }|${belijds_thema_3.value}`;
      break;

    case "openthebox_id":
      input_new_value.placeholder = "Paste ID here"
      break;

    case "facebook":
    case "twitter":
    case "website":
      input_new_value.placeholder = "https://..."
      break;

    default:
      console.warn("No specific input for fieldName")
      break;

  }

  DisplaySuggestedEdits()
}

UpdateAll();
