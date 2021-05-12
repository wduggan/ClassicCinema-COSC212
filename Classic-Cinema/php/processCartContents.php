<?php
session_start();
$arr = json_decode(file_get_contents("php://input"));
$orders = simplexml_load_file('../orders.xml');


echo "<table><tr><th style='text-align:left'>Movie</th><th>Price</th></tr>";
foreach ($arr as $value){
    echo "<tr><td>$value->title</td><td>$$value->price</td></tr>";

}
echo "</table>";

/**
 * adds details about delivery from session storage to the XML file
 */
$newOrder = $orders->addChild('order');
$delivery = $newOrder->addChild('delivery');
$delivery->addChild('name', $_SESSION['deliveryName']);
$delivery->addChild('email', $_SESSION['deliveryEmail']);
if (isset($_SESSION['deliveryAddress2'])) {
    $delivery->addChild('address', $_SESSION['deliveryAddress1'].", ".$_SESSION['deliveryAddress2']);
} else {
    $delivery->addChild('address', $_SESSION['deliveryAddress1']);
}
$delivery->addChild('city', $_SESSION['deliveryCity']);
$delivery->addChild('postcode', $_SESSION['deliveryPostcode']);


/**
 * Add the items from local storage into the XML file
 */
$items = $newOrder->addChild('items');
foreach ($arr as $value) {
    $item = $items->addChild('item');
    $item->addChild('title', $value->title);
    $item->addChild('price', $value->price);
}


$orders->saveXML('../orders.xml');
$_SESSION = array();
session_destroy();
?>