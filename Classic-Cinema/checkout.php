<!DOCTYPE html>

<html lang="en">
    <?php
    session_start();
    $scriptList = array('js/jquery3.3.js', 'js/Cart.js', 'js/Checkout.js',   'js/FillForm.js');
    include('htaccess/header.php');
    function setValue($field){
        if (isset($_SESSION[$field])) {
            $input = $_SESSION[$field];
            echo "value='$input'";
        }

    }

    ?>
<main>
<div id="cart"></div>
   <div id="errors"></div>

<!--Created by: Steven Mills 10/04/2014
    Last Modified by: Steven Mills 11/06/2014-->
    <form id="checkoutForm" novalidate
          action="validateCheckout.php"
          method="POST">
        <fieldset>
            <!-- First section of form is delivery address etc. -->
            <legend>Delivery Details:</legend>
            <p>
                <label for="deliveryName">Deliver to:</label>
                <input type="text" name="deliveryName" id="deliveryName" <?php setValue('deliveryName') ?>>
            </p>
            <p>
                <label for="deliveryEmail">Email:</label>
                <input type="email" name="deliveryEmail" id="deliveryEmail"<?php setValue('deliveryEmail') ?>>
            </p>
            <p>
                <label for="deliveryAddress1">Address:</label>
                <input type="text" name="deliveryAddress1" id="deliveryAddress1" <?php setValue('deliveryAddress1') ?>>
            </p>
            <p>
                <label for="deliveryAddress2"></label>
                <input type="text" name="deliveryAddress2" id="deliveryAddress2" <?php setValue('deliveryAddress2') ?> >
            </p>
            <p>
                <label for="deliveryCity">City:</label>
                <input type="text" name="deliveryCity" id="deliveryCity" <?php setValue('deliveryCity') ?>>
            </p>
            <p>
                <label for="deliveryPostcode">Postcode:</label>
                <input type="text" name="deliveryPostcode" id="deliveryPostcode" maxlength="4" required class="short" <?php setValue('deliveryPostcode') ?>>
            </p>
        </fieldset>

        <!-- Next section has credit card details -->
        <fieldset>
            <legend>Payment Details:</legend>
            <p>
                <label for="cardType">Card type:</label>
                <select name="cardType" id="cardType">
                    <option value="amex">American Express</option>
                    <option value="mcard">Master Card</option>
                    <option value="visa">Visa</option>
                </select>
            </p>
            <p>
                <label for="cardNumber">Card number:</label>
                <input type="text" name="cardNumber" id="cardNumber" maxlength="16" required>
            </p>
            <p>
                <label for="cardMonth">Expiry date:</label>
                <select name="cardMonth" id="cardMonth">
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select> / <select name="cardYear" id="cardYear">
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2021">2022</option>
                <option value="2021">2023</option>
                <option value="2021">2024</option>
            </select>
            </p>
            <p>
                <label for="cardValidation">CVC:</label>
                <input type="text" class="short" maxlength="4" name="cardValidation" id="cardValidation" required>
            </p>
        </fieldset>
        <input type="submit">
    </form>
</main>

<?php include("htaccess/footer.php"); ?>

</body>
</html>