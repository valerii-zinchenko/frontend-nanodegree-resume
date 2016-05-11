/*

This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.

Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.

Cameron Pittman
*/


/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var HTMLheader =
	'<header>'+
		'<div class="name">'+
			'<h1 id="name">%name%</h1> '+
			'<p class="role">%role%</p>'+
		'</div>'+
		'<ul id="topContacts"></ul>'+
		'<hr class="clear-float">'+
	'</header>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLcontacts =
//	'<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%mobile%</span></li>'+
	'<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%email%</span></li>'+
//	'<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%twitter%</span></li>'+
	'<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%github%</span></li>'+
//	'<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%blog%</span></li>'+
	'<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%location%</span></li>';

var HTMLbioPicWelcomeMsg = '<img src="%biopic%" class="biopic"><span class="welcome-message">%welcomeMessage%</span>';

var HTMLskillsStart =
	'<section>'+
		'<header>'+
			'<h3 id="skills-h3">Skills at a Glance:</h3>'+
		'</header>'+
		'<ul id="skills" class="flex-box"></ul>'+
	'</section>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

var HTMLwork =
	'<section class="work-entry">'+
		'<header>'+
			'<a href="%url%" target="_blank">%employer% - %title%</a>'+
			'<div class="date-text">%dates%</div>'+
			'<div class="location-text">%location%</div>'+
		'</header>'+
		'<article><br>%description%</article>'+
		'<section>'+
			'<header>'+
				'<h4>Main responsibilities</h4>'+
			'</header>'+
			'<ul class="key-items"></ul>'+
		'</section>'+
	'</section>';
var HTMLworkItem = '<li>%data%</li>';

var HTMLproject =
	'<section class="project-entry">'+
		'<header>'+
			'<a href="%url%" target="_blank">%title%</a>'+
			'<div class="date-text">%dates%</div>'+
		'</header>'+
		'<article><br>%description%</article>'+
		//'<img src="%data%">'+
	'</section>';

var HTMLschool =
	'<section class="education-entry">'+
		'<header>'+
			'<a href="%url%">%name% - %degree%</a>'+
			'<div class="date-text">%dates%</div>'+
			'<div class="location-text">%location%</div>'+
		'</header>'+
		'<p><em><br>Major: %major%</em></p>'+
	'</section>';

var HTMLonlineClasses = '<h3>Online Courses</h3>';
var HTMLonline =
	'<section class="education-entry">'+
		'<a href="%url%">%title% - %school%</a>'+
		'<div class="date-text">%dates%</div>'+
	'</section>';
var HTMLonlineCertificate = '<br><a href="%certificate%" target="_blank">Certificate</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';


/*
The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
function inName(name) {
	name = name.trim().split(" ");

	if (name && name.length === 0) {
		return name;
	}

	name[0] = name[0][0].toUpperCase() + name[0].slice(1).toLowerCase();

	if (name[1]) {
		name[1] = name[1].toUpperCase();
	}

	return name.join(" ");
}

$(document).ready(function() {
  $('button').click(function() {
    var iName = inName ? inName(data.bio.name) : (function(){ return ""; })();
    $('#name').html(iName);
  });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
	logClicks(loc.pageX, loc.pageY);
});



/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  /*
  For the map to be displayed, the googleMap var must be
  appended to #mapDiv in resumeBuilder.js.
  */
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(data.bio.contacts.location);

    // iterates through school locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide:
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    data.education.schools.concat(data.work.jobs).forEach(function(item){
      if (locations.indexOf(item.location) === -1) {
        locations.push(item.location);
      }
    });

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
      locations.forEach(function(place){
      // the search request object
      var request = {
        query: place
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    });
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});
