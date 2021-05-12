/**
 * Shopping cart functions for the category pages
 *
 * Created by: Steven Mills, 09/04/2014
 * Last Modified by: Nick Meek 02/09/2019
 */

/* global Cookie */

/**
 * Module pattern for Cart functions
 */
var Cart = (function () {
    "use strict";

    var pub;

    // Public interface
    pub = {};

    /**
     * Add items to the cart
     *
     * This function is called when a 'Buy' button is clicked.
     * The cart itself is stored in a cookie, which is updated each time this function is called.
     */
    function addToCart() {
        var itemList, newItem;
        itemList = window.sessionStorage.getItem("cart");
        if (itemList) {
            itemList = JSON.parse(itemList);
        } else {
            itemList = [];
        }
        newItem = {};
        /* jshint -W040 */
        newItem.title = $(this).parent().parent().find("h3").html();
        newItem.price = $(this).parent().find(".price").html();
        /* jshint +W040 */
        itemList.push(newItem);
        window.sessionStorage.setItem("cart", JSON.stringify(itemList));
    }

    /**
     * Setup function for the cart functions
     *
     * Gets a list of 'Buy' buttons, and sets them to call addToCart when clicked
     */
    pub.setup = function () {
        $(".buy").click(addToCart);
    };

    // Expose public interface
    return pub;
}());

// The usual onload event handling to call Cart.setup
$(document).ready(Cart.setup);