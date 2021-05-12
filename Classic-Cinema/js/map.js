/**
 * Map functions for the Classic Cinema site
 *
 * Created by: Nick Meek, 20/07/2018
 * Last Modified by: Nick Meek 23/08/2018
 */

var Map = (function () {
    var pub = {};

    var map;
    var centralMarker;
    var southMarker;
    var northMarker;


    function centreMap() {
        var markerLocation, markerBounds;
        if (this.textContent === "North") {
            markerLocation = [northMarker.getLatLng()];
        } else if (this.textContent === "Central") {
            markerLocation = [centralMarker.getLatLng()];
        } else {
            markerLocation = [southMarker.getLatLng()];
        }
        markerBounds = L.latLngBounds(markerLocation);
        map.fitBounds(markerBounds);
    }

    pub.setup = function () {
        map = L.map('map').setView([-45.875, 170.500], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(map);

        // Central
        centralMarker = L.marker([-45.873937, 170.50311]).addTo(map);
        centralMarker.bindPopup("<figure class='popup'><img src='images/Metropolis.jpg'>" +
            "<figcaption><p>Central Store</p>" +
            "<p>Specialising in Classic Cinema</p></figcaption></figure>");

        // South
        southMarker = L.marker([-45.887357, 170.496829]).addTo(map);
        southMarker.bindPopup("<figure class='popup'><img src='images/Plan_9_from_Outer_Space.jpg'>" +
            "<figcaption><p>South Store</p>" +
            "<p>Specialising in Classic Cinema</p></figcaption></figure>");

        // North
        northMarker = L.marker([-45.861252, 170.513035]).addTo(map);
        northMarker.bindPopup("<figure class='popup'><img src='images/Vertigo.jpg'>" +
            "<figcaption><p>North Store</p>" +
            "<p>Specialising in Classic Cinema</p></figcaption></figure>");

        $("h3").click(centreMap).css("cursor", "pointer");

    };

    return pub;
}());


if (document.getElementById) {
    window.onload = Map.setup;
}