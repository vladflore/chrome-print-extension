'use strict';

let printBtn = document.getElementById('printBtn');
let pathToDomElement = document.getElementById('pathToDomElement');

printBtn.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: "document.evaluate('" + pathToDomElement.value + "', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.outerHTML" },
            function (result) {
                chrome.storage.local.set({ elementContent: result }, function () {
                    // do nothing
                });
                chrome.tabs.create({ url: chrome.extension.getURL('template.html') });
            });
    });
};