// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDuW8hriTtxjhfk1GYdDvv7XRohfMMnkok&callback=initMap';
script.defer = true;

var map

// Attach your callback function to the `window` object
window.initMap = function (stuff) {
    console.log(stuff);
    // JS API is loaded and available
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: { lat: 34.046438, lng: -118.259653 }
    });
    var locations = [
        ['yup', 34.046438, -118.259653],
        ['nope', 41.881832, -87.623177],
        ['hey', 40.730610, -73.935242]
    ];

    var infowindow = new google.maps.InfoWindow({});
    var marker, count;
    for (count = 0; count < locations.length; count++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[count][1], locations[count][2]),
            map: map,
            title: locations[count][0]
        });
        google.maps.event.addListener(marker, 'click', (function (marker, count) {
            return function () {
                infowindow.setContent(locations[count][0]);
                infowindow.open(map, marker);
            }
        })(marker, count));
    }
};

// Append the 'script' element to 'head'
document.head.appendChild(script);




