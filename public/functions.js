// The main function
function run(){
    initMap();
    initMapSize();
  
    map.panTo(new google.maps.LatLng(currentLat, currentLng))
  
    currentLocationMarker = new google.maps.Marker({
      position: currentLocation,
      map: map
    });
}

// Init the map on the screen
function initMap() {  
    currentLocation = {lat: currentLat, lng: currentLng};
  
    mapOptions = {
      zoom: 17,
      center: new google.maps.LatLng(currentLocation),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      clickableIcons: false,
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: false,
      fullscreenControl: false        
    }
  
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);
    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(centerControlDiv);
}

// Set map size by screen resolution
function initMapSize(){
    screenHeight = (window.innerHeight / 100) * 99.99;
    screenWidth = (window.innerWidth / 100) * 99.99;
    document.getElementById("map").style.setProperty("width", screenWidth + "px");
    document.getElementById("map").style.setProperty("height", screenHeight + "px");
  
    map.panTo(new google.maps.LatLng(currentLat, currentLng))
}

  // Getting current location and setting the map
function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function(position){
      currentLat = position.coords.latitude;
      currentLng = position.coords.longitude;
    });
}

// Set the recenter button 
function CenterControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '15px';
    controlUI.style.marginLeft = '22px';
    controlUI.style.borderRadius = '100%';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);
    
    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.paddingLeft = '15px';
    controlText.style.paddingRight = '15px';
    controlText.style.paddingTop = '15px';
    controlText.style.paddingBottom = '15px';
    controlText.innerHTML = '<img src="target.png"/>';
    controlUI.appendChild(controlText);
    
    // Setup the click event listeners: simply set the map to current location.
    controlUI.addEventListener('click', function() {
      map.panTo(currentLocation);
    });
}