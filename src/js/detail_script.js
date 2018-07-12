"use strict";

//import { nisCode_to_postCode } from './nisCode_to_postCode.js';
//import { ah } from './admin_hierarchy-1.0.0.js';
import { updateQueryStringParam, getParameterByName } from './static_utils.js';

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

function UpdateAll()
{

}
