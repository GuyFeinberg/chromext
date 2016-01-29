// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click(e) {
  chrome.tabs.executeScript(null,
      {code:"document.body.style.backgroundColor='" + e.target.id + "'"}, function(){ console.log("made it into the callback"); } );
  window.close();
}


document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});


function clickHandler(e) {
    chrome.runtime.sendMessage({directive: "popup-click"}, function(response) {
         // close the popup when the background finishes processing request
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('click-me').addEventListener('click', clickHandler);
});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request.directive = "apiJSON"){
        request.apiResult;
        var jsonStr = JSON.stringify(request.apiResult);
        document.getElementById('jsonResult').innerHTML = jsonStr;
      }
    }
);