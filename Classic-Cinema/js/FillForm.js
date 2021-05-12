/**
 * Form Filler function for the Classic Cinema site.
 *
 * Created by: Nick Meek, 07/08/2019
 */


/**
 * Module pattern
 */
var FillForm = (function(){
    "use strict";
    var pub = {};

    /**
     * A function to ease the hurt of filling out the Classic Cinema form
     * hundreds and hundreds of times.
     */
    pub.fillForm = function(){
        $("#deliveryName").val("A Name");
        $("#deliveryEmail").val("Bill@microsoft.com");
        $("#deliveryAddress1").val("An Address");
        $("#deliveryAddress2").val("More Address");
        $("#deliveryCity").val("A City");
        $("#deliveryPostcode").val("1234");
        $("#cardType").val("amex");
        $("#cardNumber").val("311111111111111");
        $("#cardValidation").val("1234");
        $("#cardYear").val("2020");
    };

    return pub;
}());