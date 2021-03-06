"use strict";

import { loadJSON } from './static_utils.js';
import { ah } from './admin_hierarchy-1.0.0.js';

const StateEnum = Object.freeze({ "init": 1, "requesting": 2, "succes": 3, "fail": 4 })

function RenderEditableFieldStringToHtml(suggested_value, fieldtype)
{

  switch(fieldtype)
  {
    case "belijds_thema":
    return (function(){
      if (suggested_value == null) return ""
      const belijds_thema = suggested_value.split("|");
      const list = []
      for (let i = 0; i < belijds_thema.length; i++) {
        if(belijds_thema[i] != "-")
          list.push(`<b>${  belijds_thema[i]  }</b>`)
      }
      return list.join(", ");
    })();

    case "facebook":
    case "twitter":
    case "website":
      return `<a target="_blank" href='${suggested_value}'>${suggested_value}</a>`

    case "openthebox_id":
      return `<a target="_blank" href='${GetOtbUrl(suggested_value)}'>${suggested_value}</a>`
    default:
      console.warn(`No specific renderer for fieldtype: ${fieldtype}`)
      return suggested_value;
  }
}

function approve(politieker, fieldname, suggested_value, callback) {
  if((suggested_value == "" || suggested_value == undefined) && ! window.confirm("Value is empty, sure you wan't to submit?"))
    return;
  console.log(politieker, fieldname, suggested_value)

  const data = new FormData();
  const csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0]
  if(csrfmiddlewaretoken != null)
    data.append('csrfmiddlewaretoken', csrfmiddlewaretoken.value);
  else console.error("csrfmiddlewaretoken should be injected by Django")
    data.append('politieker', politieker);
  data.append('fieldname', fieldname);
  data.append('value', suggested_value);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', GetDjangoUrl('request_edit'), true);
  xhr.onload = function () {
    console.log(this.responseText);
    callback();
    //location.reload();
  };
  xhr.send(data);
}

class JsonRequest {
  constructor(url, callback) {
    this._url = url;
    this.callback = callback
    this._json = null;
    this.state = StateEnum.init
    this.runningXhr = null;
  }

  get json() {
    if (this.state == StateEnum.init)
      this.DoJsonRequest();
    return this._json;
  }

  get url()
  {
    return this._url;
  }
  
  set url(value)
  {
    if(this._url === value) return;
    this._url = value;
    if(this.runningXhr)
      this.runningXhr.abort() // untested
    this._json = null;
    this.state = StateEnum.init
    this.callback()
  }

  Reload()
  {
    if(this.state == StateEnum.requesting) return;
    this.DoJsonRequest()
  }
   
  DoJsonRequest() {
    this.state = StateEnum.requesting
    const self = this;
    if(this._url == "")
    {
      this.state = StateEnum.fail;
      return;
    }

    if(this.runningXhr)
      this.runningXhr.abort()
    this.runningXhr = loadJSON(this._url,
      function (json) {
        self.state = StateEnum.succes;

        self._json = json;

        self.callback()
      },
      function (evt) {
        self.state = StateEnum.fail
        console.warn(evt)
      });
  }
}

function GetOtbUrl(otbId)
{
  return `https://openthebox.be/person/${otbId}`;
}
function GetTableUrl(tableName)
{
  return `https://api.airtable.com/v0/app5SoKsYnuOY96ef/${tableName}?api_key=key2Jl1YfS4WWBFa5`
}

function GetDjangoUrl(queryString)
{
  queryString = queryString.replace(/^\/+/g, '');
  return `https://kiestze.be/${queryString}`
  //return `http://127.0.0.1:8000/${queryString}`
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

function GetGemeenteLineForNis(nis)
{
  let result = null;
  function Recurse(el)
  {
    const children = el; //.children;
    if(typeof children == "string") return;
    for (const property in children) {
      if (children.hasOwnProperty(property)) {
        const child_el = children[property]
        if(property == 11292){
          console.log("the end is near")
        }
        if(property == nis)
        {
          result = child_el; //["naam"]
          return;
        }
        Recurse(child_el);
        if(result != null)
          return;
      }
    }
  }
  Recurse(ah["02000"]); // From admin_hiearchy file
  return result;
}

function GetGemeenteNaamForNis(nis)
{
  const line = GetGemeenteLineForNis(nis)
  if(line)
    return line["naam"]
  return null
}

export { StateEnum,
  JsonRequest,
  GetTableUrl,
  GetDjangoUrl,
  GetGemeentes,
  GetGemeenteNaamForNis,
  GetGemeenteLineForNis,
  approve,
  RenderEditableFieldStringToHtml,
  GetOtbUrl};
