"use strict";

import { updateQueryStringParam, getParameterByName } from './static_utils.js';
import { JsonRequest, GetTableUrl, GetDjangoUrl } from './common.js';

const politieker_naam = document.getElementById("politieker_naam");
const persoon_foto = document.getElementById("persoon_foto");
const partij_naam = document.getElementById("partij_naam");

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

  let logo = "https://pbs.twimg.com/profile_images/787106179482869760/CwwG2e2M_400x400.jpg";
  if(politieker.edits.foto)
    logo = politieker.edits.foto.suggested_value

  persoon_foto.src = logo;


  partij_naam.innerText = partij.lijstnaam

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
