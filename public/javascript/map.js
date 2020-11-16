var map;
    var service;
    var infoWindow;
    var marker;

    function initialize() {
        infoWindow = new google.maps.InfoWindow;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                map = new google.maps.Map(document.getElementById('pin-map'), {
                    center: pos,
                    zoom: 15
                });

                var request = {
                    location: pos,
                    radius: '41000',
                    type: ['restaurant']
                };

                service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, callback);

                infoWindow.setPosition(pos);
                infoWindow.setContent('location found');
                infoWindow.open(map);
                map.setCenter(pos);



            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }


    }

    function createMarker(places) {
        var bounds = new google.maps.LatLngBounds();

        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };


            marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                animation: google.maps.Animation.DROP,
                position: place.geometry.location
            });


            var infowindow = new google.maps.InfoWindow({
                content: places[i].name
            });
            // console.log(places[i].name)

            marker.addListener("click", function () {
                infowindow.open(marker.get("map"), marker);
            });




            bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);

    }


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');

        infoWindow.open(map);
    }

    function callback(results, status) {
        console.log(results, status);
        if (status == google.maps.places.PlacesServiceStatus.OK) {

            createMarker(results);


        }
    }