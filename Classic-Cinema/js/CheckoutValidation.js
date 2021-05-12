/**
 * Validation functions for the Classic Cinema site.
 *
 * Created by: Steven Mills, 09/04/2014
 * Last Modified by: Nick Meek 02/09/2019
 */

/**
 * Module pattern for Validation functions
 */

/* global $ */
var CheckoutValidation = (function () {
    "use strict";

    var pub;

    // Public interface
    pub = {};

    /**
     * Check to see if a string is empty.
     *
     * Leading and trailing whitespace are ignored.
     * @param textValue The string to check.
     * @return {boolean} True if textValue is not just whitespace, false otherwise.
     */
    function checkNotEmpty(textValue) {
        return textValue.trim().length > 0;
    }

    /**
     * Check to see if a string contains just digits.
     *
     * Note that an empty string is not considered to be 'digits'.
     * @param textValue The string to check.
     * @return {boolean} True if textValue contains only the characters 0-9, false otherwise.
     */
    function checkDigits(textValue) {
        var pattern = /^[0-9]+$/;
        return pattern.test(textValue);
    }

    /**
     * Check to see if a string's length is in a given range.
     *
     *
     * This checks to see if the length of a string lies within [minLength, maxLength].
     * If no maxLength is given, it checks to see if the string's length is exactly minLength.
     * @param textValue The string to check.
     * @param minLength The minimum acceptable length
     * @param maxLength [optional] The maximum acceptable length
     * @return {boolean} True if textValue is an acceptable length, false otherwise.
     */
    function checkLength(textValue, minLength, maxLength) {
        var length = textValue.length;
        if (maxLength === undefined) {
            maxLength = minLength;
        }
        return (length >= minLength && length <= maxLength);
    }

    /**
     * Check to see if a string looks like an email address.
     *
     * Proper email validation is difficult, but this makes some simple checks:
     * - Emails must be of the form address@domain
     * - Both address and domain consist of non-empty blocks of characters separated by '.'s.
     * - The blocks of characters can consist of letters a-z and A-Z; digits 0-9; and the punctuation characters '_' and '-'.
     * @param textValue The string to check.
     * @return {boolean} True if the string looks like an email address, false otherwise
     */
    function checkEmailAddress(textValue) {
        var pattern = /^[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)*@[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)*$/;
        return pattern.test(textValue);
    }

    /**
     * Check if a key-press is a digit or not
     *
     * @param event The event representing the key-press
     * @return {boolean} True (accept) if key is a digit, False (reject) otherwise
     */
    function checkKeyIsDigit(event) {
        // Cross-browser key recognition - see http://stackoverflow.com/questions/1444477/keycode-and-charcode
        var characterPressed, charStr;
        characterPressed = event.keyCode || event.which || event.charCode;
        charStr = "0";
        if (characterPressed < charStr.charCodeAt(0)) {
            return false;
        }
        charStr = "9";
        return characterPressed <= charStr.charCodeAt(0);
    }

    function checkIsDelOrBckspce(event){
        var characterPressed = event.keyCode || event.which || event.charCode;
        if (characterPressed.keyCode() === 8 || characterPressed.keyCode() === 46) {
            return true;
        }
        return false;

    }

    /**
     * Check to see if a string starts with a given substring
     *
     * @param textValue The string to check.
     * @param startValue The expected starting substring
     * @return {boolean} True if textValue starts with startValue, False otherwise
     */
    function startsWith(textValue, startValue) {
        return textValue.substring(0, startValue.length) === startValue;
    }

    /**
     * Check to see if the delivery name appears valid.
     *
     * The only check here is that the delivery name must not be blank.
     *
     * @param deliveryName The string to check
     * @param messages Array of error messages (may be modified)
     * @return True if the delivery name looks OK, false otherwise
     */
    function checkDeliveryName(deliveryName, messages) {
        if (!checkNotEmpty(deliveryName)) {
            messages.push("You must enter a name to deliver to");
        }
    }

    /**
     * Check to see if the delivery email appears valid.
     *
     * Check to see that an email has been applied and has a plausible format.
     *
     * @param deliveryEmail The string to check
     * @param messages Array of error messages (may be modified)
     * @return True if the delivery email looks OK, false otherwise
     */
    function checkDeliveryEmail(deliveryEmail, messages) {
        if (!checkNotEmpty(deliveryEmail)) {
            messages.push("You must enter an email address");
        } else if (!checkEmailAddress(deliveryEmail)) {
            messages.push("That doesn't look like a valid email address");
        }
    }

    /**
     * Check to see if the delivery address appears valid.
     *
     * The only check here is that the first part of the delivery address must not be blank.
     *
     * @param deliveryAddress The string to check
     * @param messages Array of error messages (may be modified)
     * @return True if the delivery address looks OK, false otherwise
     */
    function checkDeliveryAddress(deliveryAddress, messages) {
        if (!checkNotEmpty(deliveryAddress)) {
            messages.push("You must enter an address to deliver to");
        }
    }

    /**
     * Check to see if the delivery city appears valid.
     *
     * The only check here is that the delivery city must not be blank.
     *
     * @param deliveryCity The string to check
     * @param messages Array of error messages (may be modified)
     * @return True if the delivery city looks OK, false otherwise
     */
    function checkDeliveryCity(deliveryCity, messages) {
        if (!checkNotEmpty(deliveryCity)) {
            messages.push("You must enter a city to deliver to");
        }
    }

    /**
     * Check to see if the delivery postcode appears valid.
     *
     * NZ postcodes are exactly four digits long. Note that this includes leading zeros,
     * so 0123 is a valid postcode, but 123 is not.
     *
     * @param deliveryPostcode The string to check
     * @param messages Array of error messages (may be modified)
     * @return True if the delivery postcode looks OK, false otherwise
     */
    function checkDeliveryPostcode(deliveryPostcode, messages) {
        if (!checkNotEmpty(deliveryPostcode)) {
            messages.push("You must enter a postcode");
        } else if (!checkDigits(deliveryPostcode) || !checkLength(deliveryPostcode, 4)) {
            messages.push("Postcodes must be exactly 4 digits long");
        }
    }

    /**
     * Check that a credit card number looks valid
     *
     * Basic checks depend on card type
     * American Express - 15 digits starting with 3
     * Master Card - 16 digits starting with 5
     * Visa - 16 digits starting with 4
     *
     * @param cardType The type of credit card (amex | visa | mcard)
     * @param cardNumber The card number to check
     * @param messages Array of error messages (may be modified)
     * @return True if cardNumber passes basic checks, false otherwise
     */
    function checkCreditCardNumber(cardType, cardNumber, messages) {
        if (!checkNotEmpty(cardNumber)) {
            messages.push("You must enter a credit card number");
        } else if (!checkDigits(cardNumber)) {
            // Just numbers
            messages.push("The credit card number should only contain the digits 0-9");
        } else if (cardType === "amex" && (!checkLength(cardNumber, 15) || !startsWith(cardNumber, "3"))) {
            // American Express: 15 digits, starts with a 3
            messages.push("American Express card numbers must be 15 digits long and start with a '3'");
        } else if (cardType === "mcard" && (!checkLength(cardNumber, 16) || !startsWith(cardNumber, "5"))) {
            // MasterCard: 16 digits, starting with a 5
            messages.push("MasterCard numbers must be 16 digits long and start with a '5'");
        } else if (cardType === "visa" && (!checkLength(cardNumber, 16) || !startsWith(cardNumber, "4"))) {
            // Visa: 16 digits, starts with a 4
            messages.push("Visa card numbers must be 16 digits long and start with a '4'");
        }
    }

    /**
     * Check that a credit card expiry date is in the future
     *
     *
     * @param cardMonth The expiry month of the card (1-12)
     * @param cardYear The expiry year of the card (eg: 2017)
     * @param messages Array of error messages (may be modified)
     * @return True if cardValidation passes basic checks, false otherwise
     */
    function checkCreditCardDate(cardMonth, cardYear, messages) {
        var today;
        today = new Date();
        cardMonth = parseInt(cardMonth, 10);
        cardYear = parseInt(cardYear, 10);
        if (!cardYear) {
            messages.push("Invalid year in card expiry date");
        } else if (!cardMonth || cardMonth < 1 || cardMonth > 12) {
            messages.push("Invalid month in card expiry date");
        } else if (cardYear < today.getFullYear()) {
            // Year is in the past, not valid regardless of month
            messages.push("The card expiry date must be in the future");
        } else if (cardYear === today.getFullYear()) {
            // Year is this year, so need to check the month
            // Note - JS counts months from 0 (= January)
            // So the +1 and <= is correct, (even though it looks odd)
            if (cardMonth <= today.getMonth() + 1) {
                messages.push("The card expiry date must be in the future");
            }
        } // else year is in the future, so valid regardless of month
    }

    /**
     * Check that a credit card verification code looks valid
     *
     * Basic checks depend on card type
     * American Express - 4 digits
     * Master Card/Visa - 3 digits
     *
     * @param cardType The type of credit card (amex | visa | mcard)
     * @param cardValidation The validation number to check
     * @param messages Array of error messages (may be modified)
     * @return True if cardValidation passes basic checks, false otherwise
     */
    function checkCreditCardValidation(cardType, cardValidation, messages) {
        // General: Just numbers
        if (!checkNotEmpty(cardValidation)) {
            // A required field
            messages.push("You must enter a CVC value");
        } else if (!checkDigits(cardValidation)) {
            // Just numbers
            messages.push("The CVC should only contain the digits 0-9");
        } else if (cardType === "amex" && !checkLength(cardValidation, 4)) {
            // Amex, 4 digits
            messages.push("American Express CVC values must be 4 digits long");
        } else if (cardType === "mcard" && !checkLength(cardValidation, 3)) {
            // MasterCard, 3 digits
            messages.push("MasterCard CVC values must be 3 digits long");
        } else if (cardType === "visa" && !checkLength(cardValidation, 3)) {
            // Visa, 3 digits
            messages.push("Visa CVC values must be 3 digits long");
        }
    }

    /**
     * Validate the checkout form
     *
     * Check the form entries before submission
     *
     * @return {boolean} False, because server-side form handling is not implemented. Eventually will return true on success and false otherwise.
     */
    function validateCheckout() {
        var messages, deliveryName, deliveryEmail, deliveryAddress1, deliveryCity, deliveryPostcode, cardType, cardNumber, cardMonth, cardYear, cardValidation, errorHTML;

        // Default assumption is that everything is good, and no messages
        messages = [];

        // Validate Address Details

        // Name validation
        deliveryName = $("#deliveryName").val();
        checkDeliveryName(deliveryName, messages);

        // Email validation
        deliveryEmail = $("#deliveryEmail").val();
        checkDeliveryEmail(deliveryEmail, messages);

        // Address validation
        deliveryAddress1 = $("#deliveryAddress1").val();
        checkDeliveryAddress(deliveryAddress1, messages);

        // City validation
        deliveryCity = $("#deliveryCity").val();
        checkDeliveryCity(deliveryCity, messages);

        // Postcode Validation
        deliveryPostcode = $("#deliveryPostcode").val();
        checkDeliveryPostcode(deliveryPostcode, messages);

        // Validate Credit Card Details

        // This depends a bit on the type of card, so get that first
        cardType = $("#cardType").val();

        // Credit card number validation
        cardNumber = $("#cardNumber").val();
        checkCreditCardNumber(cardType, cardNumber, messages);

        // Expiry date validation
        cardMonth = $("#cardMonth").val();
        cardYear = $("#cardYear").val();
        checkCreditCardDate(cardMonth, cardYear, messages);

        // CVC validation
        cardValidation = $("#cardValidation").val();
        checkCreditCardValidation(cardType, cardValidation, messages);

        if (messages.length === 0) {
            // Checkout successful, clear the cart
            window.sessionStorage.clear();
        } else {
            // Report the error messages
            errorHTML = "<p><strong>There were errors processing your form</strong></p>";
            errorHTML += "<ul>";
            messages.forEach(function (msg) {
                errorHTML += "<li>" + msg;
            });
            errorHTML += "</ul>";
            $("#errors").html(errorHTML);
        }

        // Stop the form from submitting, which would trigger a page load
        // In future this will return true if the form is OK and can be submitted to the server
        return false;

    }

    /**
     * Setup function for sample validation.
     *
     * Adds validation to the form on submission.
     * Note that if the validation fails (returns false) then the form is not submitted.
     */
    pub.setup = function () {
        /*
        $("#checkoutForm").submit(validateCheckout());
        $("#cardNumber").keypress(checkKeyIsDigit);
        $("#deliveryPostcode").keypress(checkKeyIsDigit);
        $("#cardValidation").keypress(checkKeyIsDigit);
        */
    };

    // Expose public interface
    return pub;
}());

// The usual onload event handling to call CheckoutValidation.setup
$(document).ready(CheckoutValidation.setup);