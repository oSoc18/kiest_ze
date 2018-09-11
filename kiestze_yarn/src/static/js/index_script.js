import { GetGemeentes } from './common.js';
import { nisCode_to_postCode } from './nisCode_to_postCode.js';
import { updateQueryStringParam } from './static_utils.js';

const input_gemeente = document.getElementsByName("input_gemeente")[0];
const opties_gemeentes = document.getElementById("opties_gemeentes");
const lijst_link = document.getElementById("lijst_link");

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


}

window["model"] = model;
function UpdateAll() {
  UpdateGemeenteInput();
  lijst_link.href = `lijst?selectedNis=${model.selectedNis}`;
}
UpdateAll();


input_gemeente.addEventListener(`change`, GemeenteInputEvent);
input_gemeente.addEventListener(`keyup`, GemeenteInputEvent);
input_gemeente.addEventListener(`input`, GemeenteInputEvent);
//input_gemeente.addEventListener(`mouseup`, GemeenteInputEvent);


function GemeenteInputEvent() {
  model.inputString = input_gemeente.value;
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

function ShorterNis(longNisCode)
{
  longNisCode=`${longNisCode}` // cast to string
  longNisCode= longNisCode.substr(0, longNisCode.length - 1)
  return parseInt(longNisCode)
}

function GemeenteClick(evt)
{
  console.log("Click", evt.target, evt.target.id);
  model.selectedNis = parseInt(evt.target.id);
  input_gemeente.value = ""
  input_gemeente.placeholder = evt.target.innerText
}
