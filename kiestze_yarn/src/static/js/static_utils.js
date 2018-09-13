
// https://stackoverflow.com/questions/22119673/find-the-closest-ancestor-element-that-has-a-specific-class
function findAncestor (el, className) {
    if(className[0] != ".") console.warn("className should start with dot")
    while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,className)));
    return el;
}

// Could be optimized by not checking the previous node
function findClosestTagnameInHiarchy(el, tagName) {
  while(el) {
    const test = el.getElementsByTagName(tagName)
    if(test && test.length > 0) return test[0];
    el = el.parentElement;
  }
  console.warn("tagName not found! Performance burdon!", tagName)
}

const updateQueryStringParam = function (key, value) {
    const baseUrl = [location.protocol, '//', location.host, location.pathname].join('')
    const urlQueryString = document.location.search
    const newParam = `${key  }=${  value}`
    let params = `?${  newParam}`

    // If the "search" string exists, then build params from it
    if (urlQueryString) {
        const keyRegex = new RegExp(`([\?&])${  key  }[^&]*`);

        // If param exists already, update it
        if (urlQueryString.match(keyRegex) !== null) {
            params = urlQueryString.replace(keyRegex, `$1${  newParam}`);
        } else { // Otherwise, add it to end of query string
            params = `${urlQueryString  }&${  newParam}`;
        }
    }
    window.history.replaceState({}, "", baseUrl + params);
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${  name  }(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

export { updateQueryStringParam, getParameterByName, loadJSON, findAncestor, findClosestTagnameInHiarchy};
