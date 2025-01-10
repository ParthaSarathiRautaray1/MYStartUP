
// Initialize the map centered on Odisha with a closer zoom level
const map = L.map('map', {
    zoomControl: false,  // Removes zoom controls
    attributionControl: false  // Removes attribution
}).setView([20.2961, 85.8245], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// 2 sound effects
const transitionSound = new Audio('./assets/sounds/whoosh.wav');
const markerRemoveSound = new Audio('./assets/sounds/popSound.mp3');


let isMapVisible = false;
let shouldPlaySounds = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      isMapVisible = entry.isIntersecting;
      shouldPlaySounds = entry.isIntersecting;
  });
}, { threshold: 0.5 });

const mapSection = document.querySelector('.journey-map');
observer.observe(mapSection);


// Define locations with adjusted zoom levels
const locations = [
  { name: "Puri", coords: [19.8135, 85.8312], zoom: 12 },
  { name: "Konark", coords: [19.8876, 86.0945], zoom: 13 },
  { name: "Chilika", coords: [19.7245, 85.3073], zoom: 11 }
];

let currentLocationIndex = 0;

function playSoundIfVisible(sound) {
  if (shouldPlaySounds && isMapVisible) {
      sound.currentTime = 0;
      sound.play();
  }
}

function animateToNextLocation() {
  if (currentLocationIndex >= locations.length) {
    currentLocationIndex = 0;
  }

  const location = locations[currentLocationIndex];

  playSoundIfVisible(transitionSound);

  map.flyTo(location.coords, location.zoom, {
    duration: 2,
    easeLinearity: 0.5
});

  
const marker = L.marker(location.coords, {
  icon: L.divIcon({
      className: 'car-marker',
      html: '<i class="fas fa-map-marker-alt"></i>',
      iconSize: [30, 30]
  })
}).addTo(map);
 




  // Remove marker after delay
  setTimeout(() => {
    playSoundIfVisible(markerRemoveSound);
        map.removeLayer(marker);
  }, 2000);

  currentLocationIndex++;
}

// Start animation
setInterval(animateToNextLocation, 3000);
animateToNextLocation();










