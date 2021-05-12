/**
 * Retreive and display movie reviews on the Classic Cinema site.
 *
 * Created by: Steven Mills, 09/04/2014
 * Last Modified by: Nick Meek 02/09/2019
 */

/**
 * Module pattern for Reviews functions
 */
var Reviews = (function(){
    "use strict";
        var pub = {};

    /**
     * Process the reviews and put the content in the target element
     *
     * If there are no reviews a message is displayed
     */
        function parseReviews(data, target) {
            var reviews;
            $(target).empty();
            reviews = $(data).find("review");
            if(reviews.length === 0){
                $(target).append("<p>No reviews for this movie.</p>");
            }else {
                $(data).find("review").each(function () {
                    var rating = $(this).find("rating")[0].textContent;
                    var user = $(this).find("user")[0].textContent;
                    $(target).append("<dt>" + user + "</dt><dd>" + rating + "</dd>");
                });
            }
        }

    /**
     * Initiates the AJAX request and handles the response
     *
     * Calculates the resource to request from the movie image name, reviews must
     * be in a file with the same name as the image file: xyz.jpg --> xyz.xml
     */
        function showReviews() {
            var xmlSource = $(this).parent().find("img").attr('src').replace("images", "reviews").replace(".jpg", ".xml");
            var target = $(this).parent().find(".review")[0];
        $(target).empty();
            $.ajax({
                type: "GET",
                url: xmlSource,
                cache: false,
                success: function(data) {
                    parseReviews(data, target);
                },
                error: function(data){
                    $(target).append("<p>No reviews for this movie.</p>");
                }
            });
        }

    /**
     * Do the setup for the Reviews
     *
     * Add a review button to each movie
     *
     * Attach the event listeners to those buttons
     */
    pub.setup = function(){
            $(".film").append("<input type='button' class='showReviews' value='Show Reviews'><div class='review'></div>");
            $(".showReviews").click(showReviews);
            };
        return pub;
    }());

$(document).ready(Reviews.setup);