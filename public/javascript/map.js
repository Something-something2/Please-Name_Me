user_id = window.location.href.split('/')[window.location.href.split('/').length - 1]
var map

$.get(`../api/pins/user/${user_id}`).then(function (data) {
    console.log(data)
    // JS API is loaded and available
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {
            lat: 34.046438,
            lng: -118.259653
        }
    });

    var infowindow = new google.maps.InfoWindow({});
    var marker, count;
    for (count = 0; count < data.length; count++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(data[count].lat, data[count].long),
            map: map,
<<<<<<< HEAD
            title: data[count].city
        });
        google.maps.event.addListener(marker, 'click', (function (marker, count) {
            return function () {
                infowindow.setContent(data[count].city);
=======
            title: "Indev"
        });
        google.maps.event.addListener(marker, 'click', (function (marker, count) {
            return function () {
                infowindow.setContent("Indev");
>>>>>>> 2902a91b4bb69a84cef1ab657d3ded9c47cf4584
                infowindow.open(map, marker);
            }
        })(marker, count));
    }
});
