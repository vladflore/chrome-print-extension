'use strict';

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'www.coursera.org' },
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
    if (changedProps.status != "complete")
        return;

    var views = chrome.extension.getViews();
    for (var i = 0; i < views.length; i++) {
        var view = views[i];
        if (view.location.href == chrome.extension.getURL('template.html')) {
            chrome.storage.local.get(['elementContent'], function (result) {
                (view.document.getElementsByTagName("body")[0]).innerHTML = result.elementContent;
            });
            break;
        }
    }
});