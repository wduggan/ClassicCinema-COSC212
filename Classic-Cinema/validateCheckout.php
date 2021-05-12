<?php
session_start();
$scriptList = array('js/jquery3.3.js');
include("htaccess/header.php");
include('htaccess/validationFunctions.php');
?>
<main>
    <ul>
        <?php
        $_SESSION['deliveryName'] = $_POST['deliveryName'];
        $_SESSION['deliveryEmail'] = $_POST['deliveryEmail'];
        $_SESSION['deliveryAddress1'] = $_POST['deliveryAddress1'];
        $_SESSION['deliveryAddress2'] = $_POST['deliveryAddress2'];
        $_SESSION['deliveryCity'] = $_POST['deliveryCity'];
        $_SESSION['deliveryPostcode'] = $_POST['deliveryPostcode'];

        $FormOK = true;
        if (isEmpty($_POST['deliveryName'])) {
            $FormOK = false;
            echo "<li>Name required</li>";
        }

        if (isEmpty($_POST['deliveryEmail'])) {
            echo "<li>Email required</li>";
            $FormOK = false;
        } elseif (!isEmail($_POST['deliveryEmail'])) {
            echo "<li> Please enter a valid email address </li>";
            $FormOK = false;
        }

        if (isEmpty($_POST['deliveryAddress1'])) {
            echo "<li>Delivery Address required</li>";
            $FormOK = false;
        }


        if (isEmpty($_POST['deliveryCity'])) {
            echo "<li>Delivery City is required</li>";
            $FormOK = false;
        }


        if (isEmpty($_POST['deliveryPostcode'])) {
            $FormOK = false;
            echo "<li>You must enter a postcode</li>";
        } elseif (!isDigits($_POST['deliveryPostcode']) || !checkLength($_POST['deliveryPostcode'], 4)) {
            $FormOK = false;
            echo "<li>Invalid Postcode, must be 4 Digits long</li>";
        }

        if (isEmpty($_POST['cardNumber'])) {
            $FormOK = false;
            echo "<li>You must enter a credit card number</li>";
        } elseif (!checkCardNumber($_POST['cardType'], $_POST['cardNumber'])) {
            $FormOK = false;
            echo "<li>Invalid card number</li>";
        }

        if (!checkCardDate($_POST['cardMonth'], $_POST['cardYear'])) {
            $FormOK = false;
            echo "<li>Enter a valid card date</li>";
        }
        if (!checkCardVerification($_POST['cardType'], $_POST['cardValidation'])) {
            $FormOK = false;
            echo "<li>Invalid CVC</li>";
        }

        if ($FormOK == true) {
            echo "<h3>Checkout Completed Successfully</h3>";
            echo "<script src='js/GetCartContents.js'> </script>";
        }
        ?>
    </ul>
    <div id="movieTable"></div>
</main>
<?php include("htaccess/footer.php");
?>

</body>
</html>

