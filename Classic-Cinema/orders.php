<?php
session_start();
include("htaccess/header.php");
$orders = simplexml_load_file('orders.xml');
?>
    <main>
        <?php
        foreach ($orders->order as $order) {
            $name = $order->delivery->name;
            $email = $order->delivery->email;
            $address = $order->delivery->address;
            $city = $order->delivery->city;
            $postcode = $order->delivery->postcode;
            $items = $order->items->xpath('item');
            echo "<p>Name: $name</p>";
            echo "<p>Email: $email</p>";
            echo "<p>Address: $address</p>";
            echo "<p>City: $city</p>";
            echo "<p>Postcode: $postcode</p>";
            echo "<p>Items: <ul>";
            foreach ($items as $item) {
                echo "<li>$item->title, $$item->price</li>";
            }
            echo "</ul></p>";
            echo "<br>";
        }
        ?>
    </main>
<?php
include("htaccess/footer.php");
?>