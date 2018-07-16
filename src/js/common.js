﻿"use strict";

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
      this.JsonRequest();
    return this._json;
  }

  JsonRequest() {
    const self = this;
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

export { StateEnum, JsonRequest, GetTableUrl};
