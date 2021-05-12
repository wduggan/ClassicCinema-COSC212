<!DOCTYPE html>

<html lang="en">
    <?php
    $scriptList = array('js/jquery3.3.js', 'js/map.js', 'js/leaflet.js'); include('htaccess/header.php');
    ?>
<main>
    <figure id="map">

    </figure>

    <ul class="contact">
        <li>
            <h3>Central</h3>
            <p>
                101 The Octagon
            </p>
            <p>
                (03) 490 1234
            </p>
        </li>
        <li>
            <h3>South</h3>
            <p>
                789 Princes St
            </p>
            <p>
                (03) 490 2468
            </p>
        </li>
        <li>
            <h3>North</h3>
            <p>
                561 Great King St
            </p>
            <p>
                (03) 490 3579
            </p>
        </li>
    </ul>
</main>

<?php include("htaccess/footer.php"); ?>

</body>
</html>