// @version      0.1
// @description  Popout video chat
// @author       Sebastian Berlin
// @match        https://app.roll20.net/editor/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var $ = window.jQuery;

    $("<button>")
        .text("Popout video")
        .click(popoutVideo)
        .insertAfter("#exitroll20game");

    function popoutVideo() {
        let $video = $("#avatarContainer");
        // Remove non-avatar things that for some reason are here.
        $video.find("#macrobar")
            .detach()
            .appendTo("#playerzone");
        console.log("video =", $video);
        let windowFeatures = "menubar=no,location=no,resizable=yes,scrollbars=no,status=no";
        let videoWindow = window.open("", "Video", windowFeatures);
        console.log(videoWindow);
        $(videoWindow).empty();
        let $videoBody = $(videoWindow.document.body);
        let $playerZone = $("<div>")
            .prop("id", "playerzone")
            .addClass("largevideo")
            .css("padding", "unset")
            .appendTo($videoBody);
        $video.appendTo($playerZone);

        // Just add all the CSS to the popup.
        try {
            for(let sheet of document.styleSheets) {
                let cssString = "";
                for(let rule of sheet.rules) {
                    cssString += rule.cssText;
                }
                $("<style>")
                    .text(cssString)
                    .appendTo(videoWindow.document.head);

            }
        } catch(e) {
            console.warn("Failed copying CSS:", e);
        }

        // Resize window to fit the video.
        let windowHeight = $videoBody.find("#avatarContainer").outerHeight();
        videoWindow.innerHeight = windowHeight;
    }
})();
