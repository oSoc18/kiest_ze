"use strict";

import { updateQueryStringParam, getParameterByName } from './static_utils.js';
import { JsonRequest, GetTableUrl } from './common.js';

const persoon_naam = document.getElementById("persoon_naam");
const persoon_foto = document.getElementById("persoon_foto");

function UpdateAll()
{
  const persoon = model.airTables.PolitiekerRecord.json
  if(persoon == null) return;
  console.log(persoon)
  persoon_naam.innerText = persoon.fields.Naam;

  let logo = "https://pbs.twimg.com/profile_images/787106179482869760/CwwG2e2M_400x400.jpg";
  if(persoon.fields.Foto)
    logo = persoon.fields.Foto[0].thumbnails.large.url

  persoon_foto.src = logo;

}

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
  persoon: getParameterByName("persoon"),
  selectedPartijRec: getParameterByName("selectedPartijRec"),
  airTables: {
    Partij: new JsonRequest(GetTableUrl("Partij"), UpdateAll),
    PolitiekerRecord: null, 
    Organisaties: new JsonRequest(GetTableUrl("Organisaties"), UpdateAll),
    Stad: new JsonRequest(GetTableUrl("Stad"), UpdateAll),
  }
}
window["model"] = model;

function GetPolitiekerUrl(rec)
{
  return `https://api.airtable.com/v0/app5SoKsYnuOY96ef/Politiekers/${rec}?api_key=key2Jl1YfS4WWBFa5`
}

model.airTables.PolitiekerRecord = new JsonRequest(GetPolitiekerUrl(model.persoon), UpdateAll)


UpdateAll()
