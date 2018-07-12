﻿"use strict";

import { nisCode_to_postCode } from './nisCode_to_postCode.js';
import { ah } from './admin_hierarchy-1.0.0.js';
import { updateQueryStringParam, getParameterByName } from './static_utils.js';

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
    //if(this._inputString === value) return;

    this._inputString = value;
    UpdateAll();
  },
  get inputString() {
    return this._inputString;
  },
  selectedNis: getParameterByName("selectedNis"),
  selectedPartijRec: getParameterByName("selectedPartijRec"),
  airTables: {
    Partij: null,
    Politiekers: null,
    Organisaties: null,
    Stad: null
  }
}
window["model"] = model;

// https://stackoverflow.com/questions/9838812/how-can-i-open-a-json-file-in-javascript-without-jquery
function loadJSON(path, success, error) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success)
          success(JSON.parse(xhr.responseText));
      } else {
        if (error)
          error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

DownloadAirtableCode()


// Must be in a separate function to copy the tableName by value
function TableRequest(tableName) {
  loadJSON(`https://api.airtable.com/v0/app5SoKsYnuOY96ef/${tableName}?api_key=key2Jl1YfS4WWBFa5`,
    function (json) {
      model.airTables[tableName] = json;
      UpdateAll()
    },
    console.error);
}

function DownloadAirtableCode() {
  const tableNames = ["Partij", "Politiekers", "Organisaties", "Stad"];

  for (let i = 0; i < tableNames.length; i++) {
    TableRequest(tableNames[i]);
  }
}


function FindStadMetNis(nisCode) {
  const steden = model.airTables.Stad.records;

  for (const property in steden) {
    if (steden.hasOwnProperty(property)) {
      if (steden[property].fields.NisCode == nisCode)
        return steden[property];
    }
  }
}

function FindPartijWithRecid(Rcis) {
  const partijen = model.airTables.Partij.records;
  for (const property in partijen) {
    if (partijen.hasOwnProperty(property)) {
      if (partijen[property].id == Rcis)
        return partijen[property];
    }
  }
}

function PartijClicked(evt){
  console.log("PartijClicked", evt.target, evt.target.id);
  model.selectedPartijRec = evt.target.id;
  UpdateAll()
}

function DisplayPartijen() {
  const usedChildren = []

  //if (model.selectedNis == null) return;
  console.log("selectedNis", model.selectedNis)
  const stad = FindStadMetNis(model.selectedNis)

  stad_display.innerText = stad?stad.fields.Naam:"Onbekende gemeente/stad";

  geen_opties_partijen.style.display = stad? "none":"block"
  opties_partijen.style.display = stad? "block":"none"

  if(stad){
    const lines = stad.fields.Partij;
    for (const property in lines) {
      if (lines.hasOwnProperty(property)) {
        if (lines[property] == "") continue;
        const partij = FindPartijWithRecid(lines[property]);

        let option = document.getElementById(partij.id)
        if(option == null)
        {
          option = document.createElement("div")
          option.id = partij.id;
          opties_partijen.appendChild(option);
          option.innerHTML = `<div class="form-check"> 
          <input class="form-check-input" type="radio" name="partijRadio" id="${partij.id}" value="option">
          <label class="form-check-label" for="partijRadio">${partij.fields.Partij}</label>
          </div>`
          option.querySelector("input").addEventListener(`click`, PartijClicked);
        }
        usedChildren.push(option)
      }
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
  const usedChildren = []

  const lines = model.airTables.Politiekers.records;
  const partij = FindPartijWithRecid(model.selectedPartijRec);

  for (const property in lines) {
    if (lines.hasOwnProperty(property)) {
      //if (lines[property] == "") continue;
      const politieker = lines[property];

      if(model.selectedPartijRec != null
        && ContainsAirtableRec(politieker.fields.Partij, model.selectedPartijRec))
      {

        let option = document.getElementById(politieker.id)
        if(option == null)
        {
          option = document.createElement("div")
          option.id = politieker.id;
          kanidaaten_lijst.appendChild(option);
        }
        usedChildren.push(option)

        let shortName = politieker.fields.Naam;
        shortName = shortName.substr(shortName.lastIndexOf(" "))
        let logo = "https://pbs.twimg.com/profile_images/787106179482869760/CwwG2e2M_400x400.jpg";
        if(politieker.fields.Foto)
          logo = politieker.fields.Foto[0].thumbnails.large.url
        option.innerHTML = `<article class="card mr-4 mt-4" style="width: 17rem;">
        <img class="card-img-top politieker-img" src="${logo}" alt="Card image cap ">
        <div class="card-body">
        <h3 class="card-title">${politieker.fields.Naam}</h5>
        <p class="card-text">${partij.fields.Partij}</p>
        <a href="detail.html?persoon=${politieker.id}#${politieker.fields.Naam.replace(/ /g, "_")}" class="btn btn-primary">Ontdek ${shortName}</a>
        </div>
        </article>`
      }
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
  if(model.airTables.Stad == null) return;
  if(model.airTables.Politiekers == null) return;
  if(model.airTables.Partij == null) return;

  updateQueryStringParam("selectedNis", model.selectedNis)
  updateQueryStringParam("selectedPartijRec", model.selectedPartijRec)

  DisplayPartijen()
  DisplayKanidaten()
}

function GemeenteClick(evt){
  console.log("Click", evt.target, evt.target.id);
  model.selectedNis = parseInt(evt.target.id);
  UpdateAll()
}

function UpdateGemeenteInput() {
  while (opties_gemeentes.firstChild) {
    opties_gemeentes.removeChild(opties_gemeentes.firstChild);
  }

  const lines = GetGemeentes(model.inputString);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] == "") continue;
    const option = document.createElement("li")
    const key = lines[i].key
    option.id = key;
    // Bad code:
    option.innerText = `${lines[i].naam  } ${nisCode_to_postCode[parseInt(key.substr(0, key.length - 1))]}`;
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
