/**
 * Show/Hide movie details on the Classic Cinema site.
 *
 * Created by: Steven Mills, 09/04/2014
 * Last Modified by: Nick Meek 23/08/2018
 */

/**
 * Module pattern for Show/Hide functions
 */
var ShowHide = (function () {
    "use strict";

    var pub;

    // Public interface
    pub = {};

    /**
     * Show or hide the details of a given movie
     *
     * Which movie is determined by a mouse click, accessed via 'this'.
     */
    function showHideDetails() {
        $(this).siblings().toggle();
    }

    /**
     * Setup function for the ShowHide
     *
     * Attaches showHide as a callback when movie titles are clicked on.
     */
    pub.setup = function () {
        $(".film").find("h3").click(showHideDetails).css("cursor", "pointer");
    };

    // Expose public interface
    return pub;
}());

// The usual ready event handling to call ShowHide.setup
$(document).ready(ShowHide.setup);