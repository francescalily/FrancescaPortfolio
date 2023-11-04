const images = [
  "url(../assets/static/h20.jpeg)",
  "url(../assets/static/ny.jpg)",
  "url(../assets/static/facegen.png)",
  "url(../assets/static/textureOne.png)",
];

let currentIndex = 0;
const imageContainer = document.getElementById("imageContainer");

function changeImage() {
  imageContainer.style.backgroundImage = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;
}

changeImage();

setInterval(changeImage, 2000);
