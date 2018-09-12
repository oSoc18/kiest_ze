'use strict';

import { getParameterByName } from './static_utils.js';
import { approve } from './common.js';
import { belijds_themas } from './belijds_themas.js';


const submit_new_value = document.getElementById("submit_new_value");
const politieker_website_input = document.getElementById("politieker_website_input");

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
  approve(politieker_id, fieldname, evt.target.parentElement.querySelector('input[name="suggestedValue"]').value)
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
        optionEl.value = belijds_themas
        belijds_thema_el.appendChild(optionEl);
        
        optionEl.innerText = thema_string
    }
  }
}
DisplayBelijdsThemas();


const model = {
  valueToBeSubmitted : "",
}

window["model"] = model;




function UpdateAll()
{
  /*
  const valueEls = document.dsffds("value-el")
  for (let i = 0; i < valueEls.length; i++) {
    const v = valueEls[i]
    v.innerHTML = RenderEditableFieldStringToHtml(fieldname, ); Django gives us prefilled values, need to return Json instead
  }*/

  politieker_website_input.style.display = "block";
  belijds_thema_div.style.display = "none"

  switch(fieldname)
  {
    case "belijds_thema":
    politieker_website_input.style.display = "none";
    belijds_thema_div.style.display = "block"

    model.valueToBeSubmitted = 
      + belijds_thema_1.value
      + belijds_thema_2.value
      + belijds_thema_3.value;
    break;

    case "openthebox_id":
    politieker_website_input.placeholder = "Paste ID here"
    model.valueToBeSubmitted = politieker_website_input.value;
    break;

    default:
      console.warn("No specific input for fieldName")
      model.valueToBeSubmitted = politieker_website_input.value;
      return;

  }
}

UpdateAll();
