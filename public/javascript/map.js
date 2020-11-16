function initMap() {
    var center = {lat: 36.174465, lng: -86.767960};
    var locations = [
        ['Nashville', 36.174465, -86.767960],
      ['Los Angelas',   34.046438, -118.259653],
      ['Santa Monica', 34.017951, -118.493567],
      ['Pasadena', 34.143073, -118.132040],
      ['Huntington Beach', 33.655199, -117.998640],
      ['Glendale', 34.142823, -118.254569]
    ];
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: center
    });
  var infowindow =  new google.maps.InfoWindow({});
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
  }