"use strict";

const nisCode_to_postCode = require(`./nisCode_to_postCode.js`);
const ah = require(`./admin_hierarchy-1.0.0.js`);
// const datalist_gemeentes = document.getElementById("datalist_gemeentes");
const input_gemeente = document.getElementsByName("input_gemeente")[0];
const opties_gemeentes = document.getElementById("opties_gemeentes");
const geselecteerde_gemeente = document.getElementById("geselecteerde_gemeente");
const optties_partijen = document.getElementById("optties_partijen");

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
  selectedNis: null,
  airTables: {
    Partij: null,
    Politiekers: null,
    Organisaties: null,
    Stad: null
  }
}

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


function TableRequest(tableName) {
  console.log(tableName); /* eslint-disable-line */
  loadJSON(`https://api.airtable.com/v0/app5SoKsYnuOY96ef/${tableName}?api_key=key2Jl1YfS4WWBFa5`,
    function (json) {
      model.airTables[tableName] = json;
      UpdateAll()
      console.log(tableName, json);
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


function DisplayPartijen() {
  while (optties_partijen.firstChild) {
    optties_partijen.removeChild(optties_partijen.firstChild);
  }

  if (model.selectedNis == null) return;

  const stad = FindStadMetNis(model.selectedNis)

  const lines = stad.fields.Partij;
  for (const property in lines) {
    if (lines.hasOwnProperty(property)) {
      if (lines[property] == "") continue;
      const partij = FindPartijWithRecid(lines[property]);

      const option = document.createElement("li")
      option.id = partij.key;

      const img = document.createElement("img")
      if (partij.fields.Logo && partij.fields.Logo)
        img.src = partij.fields.Logo[0].thumbnails.small.url;
      else
        img.src = "http://emilesonneveld.be/bol.png";
      img.classList.add("partij_logo");
      img.width = "60"
      img.height = "20"
      option.appendChild(img)

      const span = document.createElement("span");
      span.innerText = ` ${partij.fields.Partij}`;
      option.appendChild(span)

      /*option.addEventListener("clicki", function(evt){
      	console.log("Click", evt.target, evt.target.id);
      	model.selectedNis = parseInt(evt.target.id);
      	UpdateAll()
      })*/
      optties_partijen.appendChild(option);
    }
  }
}



function GemeenteInputEvent() /* eslint-disable-line */ {
  model.inputString = input_gemeente.value;
}

UpdateAll();

function UpdateAll() {
  UpdateGemeenteInput();
  geselecteerde_gemeente.innerText = model.selectedNis;
  DisplayPartijen()
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
    option.addEventListener("click", function (evt) {
      console.log("Click", evt.target, evt.target.id);
      model.selectedNis = parseInt(evt.target.id);
      UpdateAll()
    })
    opties_gemeentes.appendChild(option);
  }
}

function GetGemeentes(inputStr) {
  let results = [];
  if (inputStr == null || inputStr == "") {
    results = results.concat(GetGemeentes("Meise"))
    results = results.concat(GetGemeentes("Ieper"))
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
