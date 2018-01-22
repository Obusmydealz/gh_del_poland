// ==UserScript==
// @name        gh_del_whitelist
// @namespace   gh_space
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @include     http://geizhals.de/?bpnew=*
// @include     http://geizhals.de/?thres=*
// @include     https://geizhals.de/?bpnew=*
// @include     https://geizhals.de/?thres=*
// @version     1
// @grant       none
// ==/UserScript==

var white_list = ['.de', '-de', 'alternate', 'computeruniverse.net', 'BIT-electronix', 'talk-point', 'Cyberport', 'GmbH', 'Mindfactory', 'XXXLutz', 'HardwareRogge', 'Onlineshop', 'Online-Shop', 'Compuland', 'Abholshop', 'ATELCO','Rakuten', 'Allyouneed.com','check24','DriveCity','VibuOnline','Elektronik','direkt','exklusiv','handel','versand'],
    black_list = [],
    collect = [],
    lastText,
    hideAllElements = function () {
        collect.forEach(function (elem) {
            if (elem.style) {
                elem.style.display = "none";
            } else {
                elem.textContent = "";
            }
        });
    };
$.each($('#gh_content_wrapper p')[0].childNodes, function (index, value) {
    var shouldBeDeleted = true;
    if (value.nodeName === "BR") {
        white_list.some(function (elem) {
            var currentLength = lastText.length;
            if ( lastText.substring(currentLength-elem.length,currentLength).toLowerCase()==elem.toLowerCase() ) {
                shouldBeDeleted = false;
                return true;
            }
        });
        black_list.some(function (elem) {
            var currentLength = lastText.length;
            if ( lastText.substring(currentLength-elem.length,currentLength).toLowerCase()==elem.toLowerCase() ) {
                shouldBeDeleted = true;
                return true;
            }
        });
        if (shouldBeDeleted) {
            hideAllElements();
        }
        collect = [];
    } else if (value.nodeName === "#text") {
        lastText = value.textContent;
    }
    collect.push(value);
});
