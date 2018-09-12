"use strict";

import { nisCode_to_postCode } from './nisCode_to_postCode.js';
import { updateQueryStringParam, getParameterByName } from './static_utils.js';
import { JsonRequest, GetDjangoUrl, GetGemeentes } from './common.js';

const input_gemeente = document.getElementsByName("input_gemeente")[0];
const opties_gemeentes = document.getElementById("opties_gemeentes");
const geselecteerde_gemeente = document.getElementById("geselecteerde_gemeente");
const opties_partijen = document.getElementById("opties_partijen");
const kanidaaten_lijst = document.getElementById("kanidaaten_lijst");



const model = {
  _inputString: "",
  set inputString(value) {
    if(this._inputString === value) return;

    this._inputString = value;
    UpdateAll();
  },
  get inputString() {
    return this._inputString;
  },

  _selectedNis: "",
  set selectedNis(value) {
    value = parseInt(value); // enforce int
    if(this._selectedNis === value) return;

    this._selectedNis = value;
    updateQueryStringParam("selectedNis", model.selectedNis)
    console.log("selectedNis", model.selectedNis)
    UpdateAll();
  },
  get selectedNis() {
    return this._selectedNis;
  },

  _selectedPartijId: "",
  set selectedPartijId(value) {
    value = parseInt(value); // enforce int
    if(this._selectedPartijId === value) return;

    this._selectedPartijId = value;
    updateQueryStringParam("selectedPartijId", model.selectedPartijId)
    UpdateAll();
  },
  get selectedPartijId() {
    return this._selectedPartijId;
  },

  djangoData: {
    get_all_gemeentes:  new JsonRequest(GetDjangoUrl("/get_all_gemeentes"), UpdateAll), // TODO
    get_partij:  new JsonRequest("", UpdateAll),
    get_politiekers:  new JsonRequest("", UpdateAll),
    get_all_politieker_partij_link_van_gemeente:  new JsonRequest("", UpdateAll),
  },
}
window["model"] = model;


model.selectedNis = getParameterByName("selectedNis")
model.selectedPartijId = getParameterByName("selectedPartijId")

function PartijClicked(evt){
  console.log("PartijClicked", evt.target, evt.target.id);
  model.selectedPartijId = evt.target.id;
  UpdateAll()
}

function DisplayPartijen() {
  const usedChildren = []

  const get_partij = model.djangoData.get_partij.json;

  for (const partij_id in get_partij) {
    if (get_partij.hasOwnProperty(partij_id)) {
      const partij = get_partij[partij_id];

      let option = document.getElementById(`partij_${partij_id}`)
      if(option == null)
      {
        option = document.createElement("div")
        option.id = `partij_${partij_id}`
        opties_partijen.appendChild(option);
        let label = "";
        if(partij.jaar == "2018")
          label = "<b style='color:#fff676;'>2018!</b>"
        option.innerHTML = `<div class="form-check"> 
          <input class="form-check-input" type="radio" name="partijRadio" id="${partij_id}" value="option">
          <label class="form-check-label" for="partijRadio">${label} ${partij.lijstnaam}</label>
          <span class="checkmark"></span>
          </div>`
        option.querySelector("input").addEventListener(`click`, PartijClicked);
      }
      usedChildren.push(option)
    }
  }

  const children = opties_partijen.children; // life updating list
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if(!usedChildren.includes(child)){
      opties_partijen.removeChild(child);
      i--;
    }
  }
}

function DisplayKanidaten() {
  if(model.djangoData.get_all_politieker_partij_link_van_gemeente.json == null) return;
  if(model.djangoData.get_politiekers.json == null) return;
  if(model.djangoData.get_partij.json == null) return;
  if(model.selectedPartijId == "") return;

  const usedChildren = []

  const selectedPolitiekerIds = []

  const links = model.djangoData.get_all_politieker_partij_link_van_gemeente.json

  for (const link_id in links) {
    if (links.hasOwnProperty(link_id)) {
      const link = links[link_id];

      if(link.partij== model.selectedPartijId)
      {
        selectedPolitiekerIds.push(link.politieker)
      }
    }
  }


  const partij = model.djangoData.get_partij.json[model.selectedPartijId]

  for (const i in selectedPolitiekerIds) {
    if (selectedPolitiekerIds.hasOwnProperty(i)) {
      const politieker_id = selectedPolitiekerIds[i];
      const politieker = model.djangoData.get_politiekers.json[politieker_id];

      let option = document.getElementById(`politieker_${politieker_id}`)
      if(option == null)
      {
        option = document.createElement("div")
        option.id = `politieker_${politieker_id}`;
        kanidaaten_lijst.appendChild(option);
      }
      usedChildren.push(option)

      let shortName = politieker.naam;
      shortName = shortName.substr(shortName.lastIndexOf(" "))
      let objectFit = `contain`;
      let profiel_foto = "static/assets/img/default_man.svg";
      if(politieker.geslacht == `F`) {
        profiel_foto = "static/assets/img/default_vrouw.svg";
      }
      if(politieker.edits.foto)
      {
        profiel_foto = politieker.edits.foto
        objectFit = `cover`;
      }
      const shortName2 = politieker.naam.replace(/ /g, "_");
      option.innerHTML = `<a href="detail?politieker_id=${politieker_id}&partij_id=${model.selectedPartijId}&selectedNis=${getParameterByName("selectedNis")}#${shortName2}"><article class="card mr-4 mt-4" style="width: 17rem;">
        <img class="card-img-top politieker-img" src="${profiel_foto}" alt="Card image cap" style="object-fit:${objectFit}">
        <div class="card-body">
        <h3 class="card-title">${politieker.naam}</h5>
        <p class="card-text">${partij.lijstnaam}</p>
        </div>
        </article></a>`
    }
  }

  const children = kanidaaten_lijst.children; // life updating list
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if(!usedChildren.includes(child)){
      kanidaaten_lijst.removeChild(child);
      i--;
    }
  }
}

function GemeenteInputEvent() {
  model.inputString = input_gemeente.value;
}

input_gemeente.addEventListener(`change`, GemeenteInputEvent);
input_gemeente.addEventListener(`keyup`, GemeenteInputEvent);
input_gemeente.addEventListener(`input`, GemeenteInputEvent);
//input_gemeente.addEventListener(`mouseup`, GemeenteInputEvent);

UpdateAll();

function BadString(str)
{
  return str == null || str == "" || isNaN(str);
}

function UpdateAll() {
  UpdateGemeenteInput();
  geselecteerde_gemeente.innerText = model.selectedNis;

  const radioButton = document.getElementById(model.selectedPartijId)
  if(radioButton)
    radioButton.checked = true

  if(!BadString(model.selectedNis)){
    const shortNis = ShorterNis(model.selectedNis)
    model.djangoData.get_partij.url = GetDjangoUrl(`/get_partij?gemeente_nis=${shortNis}&jaar=0`)
    model.djangoData.get_politiekers.url = GetDjangoUrl(`/get_politiekers?gemeente_nis=${shortNis}&jaar=0`)
    model.djangoData.get_all_politieker_partij_link_van_gemeente.url = GetDjangoUrl(`/get_all_politieker_partij_link_van_gemeente?gemeente_nis=${shortNis}&jaar=0`)
  }


  DisplayPartijen()
  DisplayKanidaten()
}

function GemeenteClick(evt){
  console.log("Click", evt.target, evt.target.id);
  model.selectedNis = parseInt(evt.target.id);
  input_gemeente.value = ""
  input_gemeente.placeholder = evt.target.innerText
  UpdateAll()
}

function ShorterNis(longNisCode)
{
  longNisCode=`${longNisCode}` // cast to string
  longNisCode= longNisCode.substr(0, longNisCode.length - 1)
  return parseInt(longNisCode)
}

function UpdateGemeenteInput() {
  while (opties_gemeentes.firstChild) {
    opties_gemeentes.removeChild(opties_gemeentes.firstChild);
  }

  const lines = GetGemeentes(model.inputString);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] == "") continue;
    const option = document.createElement("li")
    option.classList.add(`optie_gemeente`)
    option.classList.add(`dropdown-item`)
    const key = lines[i].key
    option.id = key;
    // Bad code:
    option.innerText = `${lines[i].naam  } ${nisCode_to_postCode[parseInt(ShorterNis(key))]}`;
    option.addEventListener("click", GemeenteClick)
    opties_gemeentes.appendChild(option);
  }
}
