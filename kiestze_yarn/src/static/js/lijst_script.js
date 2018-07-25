"use strict";

import { nisCode_to_postCode } from './nisCode_to_postCode.js';
import { ah } from './admin_hierarchy-1.0.0.js';
import { updateQueryStringParam, getParameterByName } from './static_utils.js';
import { JsonRequest, GetTableUrl, GetDjangoUrl } from './common.js';

// const datalist_gemeentes = document.getElementById("datalist_gemeentes");
const input_gemeente = document.getElementsByName("input_gemeente")[0];
const opties_gemeentes = document.getElementById("opties_gemeentes");
const geselecteerde_gemeente = document.getElementById("geselecteerde_gemeente");
const opties_partijen = document.getElementById("opties_partijen");
const kanidaaten_lijst = document.getElementById("kanidaaten_lijst");
const geen_opties_partijen = document.getElementById("geen_opties_partijen");
const stad_display = document.getElementById("stad_display");




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

  /*airTables: {
    Partij: new JsonRequest(GetTableUrl("Partij"), UpdateAll),
    Politiekers: new JsonRequest(GetTableUrl("Politiekers"), UpdateAll),
    Organisaties: new JsonRequest(GetTableUrl("Organisaties"), UpdateAll),
    Stad: new JsonRequest(GetTableUrl("Stad"), UpdateAll),
  },*/
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

function FindStadMetNis(nisCode) {
  const steden = model.airTables.Stad.json.records;

  for (const property in steden) {
    if (steden.hasOwnProperty(property)) {
      if (steden[property].fields.NisCode == nisCode)
        return steden[property];
    }
  }
}

function FindPartijWithRecid(Rcis) {
  const partijen = model.airTables.Partij.json.records;
  for (const property in partijen) {
    if (partijen.hasOwnProperty(property)) {
      if (partijen[property].id == Rcis)
        return partijen[property];
    }
  }
}

function PartijClicked(evt){
  console.log("PartijClicked", evt.target, evt.target.id);
  model.selectedPartijId = evt.target.id;
  UpdateAll()
}

function DisplayPartijen() {
  const usedChildren = []

  //if (model.selectedNis == null) return;
  console.log("selectedNis", model.selectedNis)


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


function ContainsAirtableRec(list, rec)
{
  return list.includes(rec)
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
      let logo = "https://pbs.twimg.com/profile_images/787106179482869760/CwwG2e2M_400x400.jpg";
      if(politieker.edits.foto)
        logo = politieker.edits.foto.suggested_value
      const shortName2 = politieker.naam.replace(/ /g, "_");
      option.innerHTML = `<a href="detail?politieker_id=${politieker_id}&partij_id=${model.selectedPartijId}#${shortName2}"><article class="card mr-4 mt-4" style="width: 17rem;">
        <img class="card-img-top politieker-img" src="${logo}" alt="Card image cap ">
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

function UpdateAll() {
  UpdateGemeenteInput();
  geselecteerde_gemeente.innerText = model.selectedNis;

  // Wait while downloading airtables. Maybe show spinner?
  //if(model.airTables.Stad.json == null) return;
  //if(model.airTables.Politiekers.json == null) return;
  //if(model.airTables.Partij.json == null) return;

  const shortNis = ShorterNis(model.selectedNis)
  model.djangoData.get_partij.url = GetDjangoUrl(`/get_partij?gemeente_nis=${shortNis}&jaar=0`)
  model.djangoData.get_politiekers.url = GetDjangoUrl(`/get_politiekers?gemeente_nis=${shortNis}&jaar=0`)
  model.djangoData.get_all_politieker_partij_link_van_gemeente.url = GetDjangoUrl(`/get_all_politieker_partij_link_van_gemeente?gemeente_nis=${shortNis}&jaar=0`)
  const json1 = model.djangoData.get_politiekers.json;
  const json2 = model.djangoData.get_partij.json;
  const json3 = model.djangoData.get_all_politieker_partij_link_van_gemeente.json;


  DisplayPartijen()
  DisplayKanidaten()
}

function GemeenteClick(evt){
  console.log("Click", evt.target, evt.target.id);
  model.selectedNis = parseInt(evt.target.id);
  UpdateAll()
}

function ShorterNis(longNisCode)
{
  longNisCode=`${longNisCode}`
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
    const key = lines[i].key
    option.id = key;
    // Bad code:
    option.innerText = `${lines[i].naam  } ${nisCode_to_postCode[parseInt(ShorterNis(key))]}`;
    option.addEventListener("click", GemeenteClick)
    opties_gemeentes.appendChild(option);
  }
}

function GetGemeentes(inputStr) {
  let results = [];
  if (inputStr == null || inputStr == "") {
    results = results.concat(GetGemeentes("Meise"))
    results = results.concat(GetGemeentes("Ieper"))
    results = results.concat(GetGemeentes("Moorslede"))
    return results;
  }

  inputStr = inputStr.toLowerCase();

  //   const dedup_test = []
  //   let depth = 0;

  function Recurse(key, el) {
    if (results.length > 10) return;
    // depth++;
    //console.log(depth, el.type, el.naam)

    if (el.type == "I" || el.type == "G") {
      //for (let i = 0; i < dedup_test.length; i++) {
      //	if(dedup_test[i].naam == el.naam)
      //		console.log("Found dup: ", el);
      //	// Found dup:  {type: "G", naam: "Sint-Pieters-Kapelle", children: {…}}
      //	// Found dup:  {type: "G", naam: "Zandvoorde", children: {…}}
      //	// Found dup:  {type: "G", naam: "Oostkerke", children: {…}}
      //	// Found dup:  {type: "G", naam: "Ramskapelle", children: {…}}
      //	// Found dup:  {type: "G", naam: "Sint-Joris", children: {…}}
      //	// Found dup:  {type: "G", naam: "Sint-Maria-Oudenhove", children: {…}}
      //	// Found dup:  {type: "G", naam: "Nieuwerkerken", children: {…}}
      //	// Found dup:  {type: "G", naam: "Haren", children: {…}}
      //	// Found dup:  {type: "G", naam: "Kolmont", children: {…}}
      //}
      //dedup_test.push(el);

      // Could use levenstein
      if (el.naam.toLowerCase().indexOf(inputStr) != -1) {
        results.push({
          naam: el.naam,
          type: el.type,
          key: key
        });
      }
    } else {
      const children = el.children;
      for (const property in children) {
        if (children.hasOwnProperty(property)) {
          Recurse(property, children[property]);
        }
      }

      for (const property in el) {
        if (el.hasOwnProperty(property) && !(["type", "naam", "children"].includes(property))) {
          Recurse(property, el[property]);
        }
      }

    }

  }
  Recurse("02000", ah["02000"]); // From admin_hiearchy file
  return results;
}

