"use strict";

import { loadJSON } from './static_utils.js';

const StateEnum = Object.freeze({ "init": 1, "requesting": 2, "succes": 3, "fail": 4 })

class JsonRequest {
  constructor(url, callback) {
    this._url = url;
    this.callback = callback
    this._json = null;
    this.state = StateEnum.init
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
    loadJSON(this._url,
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

function GetTableUrl(tableName)
{
  return `https://api.airtable.com/v0/app5SoKsYnuOY96ef/${tableName}?api_key=key2Jl1YfS4WWBFa5`
}

function GetDjangoUrl(queryString)
{
  queryString = queryString.replace(/^\/+/g, '');
  //return `https://kiestze.be/${queryString}`
  return `http://127.0.0.1:8000/${queryString}`
}

export { StateEnum, JsonRequest, GetTableUrl, GetDjangoUrl};
