function changeText(node) {
    console.log("Looking for imposters!");

    // Finds and replaces all examplar messages with 'imposter implementations'.
    var examplarMessages = node.getElementsByClassName("file-examplar-summary-message")
    for (var i = 0, l = examplarMessages.length; i < l; i++) {
        examplarMessages[i].textContent = examplarMessages[i].textContent.replace("sample buggy programs", "imposter implementations");
    }

    // Finds and replaces all unfound chaffs with images of crewmates.
    var chaff = node.getElementsByClassName('chaff');
    for (var i = 0, l = chaff.length; i < l; i++) {
        var ranSeed = Math.ceil(Math.random() * 14);
        var imgURL = chrome.extension.getURL(`images/crewmate/${ranSeed}.png`);
        chaff[i].textContent = "";
        chaff[i].appendChild(createElement("img", {'class': 'imposter-img', 'src': imgURL}));
    }

    // Finds and replaces all found chaffs with images of imposters.
    var chaffCaught = document.getElementsByClassName('caught');
    for (var i = 0, l = chaffCaught.length; i < l; i++) {
        var ranSeed = Math.ceil(Math.random() * 24);
        var imgURL = chrome.extension.getURL(`images/imposter/${ranSeed}.png`);
        chaffCaught[i].textContent = "";
        chaffCaught[i].appendChild(createElement("img", {'class': 'imposter-img', 'src': imgURL}));
    }
}

// Create a MutationObserver to handle updating events
// (e.g. filtering TextNode elements)
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes) {
            [].slice.call(mutation.addedNodes).forEach(function (node) {
                if (node.nodeName.toLowerCase() == "div" && node.nodeType == 1 && node.className == "file-examplar-summary") {
                    changeText(node);
                }
            });
        }
    });
});

// Start observing "childList" events in document and its descendants
observer.observe(document, {
    childList: true,
    subtree: true
});

// Helper function for creating an element to add as child.
//                     String,  Object,  String
function createElement(tagName, attribs, text) {
    var elm = document.createElement(tagName), a;
    if (attribs) // if given
        for (a in attribs) // for each property
            if (attribs.hasOwnProperty(a)) // that is not inherited
                elm.setAttribute(a, attribs[a]); // set attribute
    if (text) // if given
        elm.appendChild(document.createTextNode(text)); // append text
    return elm; // node out
}

console.log("Examplar but caterpillars are imposters! - v0.0.0.1")

// Emoji source: https://www.reddit.com/r/AmongUs/comments/im9l8j/oc_among_us_emojis_link_in_comments/
// i was really bored and wanted to procrastinate doing contfracs - Jiahua
