const images = [
  "url(../assets/static/ball.png)",
  "url(../assets/static/ny.jpg)",
  "url(../assets/static/ant.png)",
  "url(../assets/static/textureOne.png)",
];

let currentIndex = 0;
const imageContainer = document.getElementById("imageContainer");

function changeImage() {
  imageContainer.style.backgroundImage = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;
}

changeImage();

setInterval(changeImage, 4000);
