const images = [
  "url(../assets/websites/h20.jpeg)",
  "url(../assets/websites/ny.jpg)",
  "url(../assets/websites/facegen.png)",
  "url(../assets/websites/textureOne.png)",
];

let currentIndex = 0;
const imageContainer = document.getElementById("imageContainer");

function changeImage() {
  imageContainer.style.backgroundImage = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;
}

changeImage();

setInterval(changeImage, 2000);
