// Global variables
var currentLat = 0.0, currentLng = 0.0, map, currentLocation, currentLocationMarker, mapOptions;
var socket = io();

// Get first current location
navigator.geolocation.getCurrentPosition(function(position){
  currentLat = position.coords.latitude;
  currentLng = position.coords.longitude;
});

setInterval(function(){
getCurrentLocation();
currentLocation = {lat: currentLat, lng: currentLng};
currentLocationMarker.setPosition(currentLocation)

//socket.emit('JSON', currentLocation);
}, 2000)

socket.on('location', function(data){
  console.log(data);
})
