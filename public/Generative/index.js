import imageOne from "../assets/websites/facegen.png";
import imageTwo from "../assets/websites/terrain.png";
import imageThree from "../assets/websites/ant.png";
import imageFour from "../assets/websites/textureOne.png";

const images = [
  `url(${imageOne})`,
  `url(${imageTwo})`,
  `url(${imageThree})`,
  `url(${imageFour})`,
];

images.forEach((imageUrl) => {
  const img = new Image();
  img.src = imageUrl.replace('url("', "").replace('")', "");
});

let currentIndex = 0;
const imageContainer = document.getElementById("imageContainer");

function changeImage() {
  imageContainer.style.backgroundImage = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;
}

changeImage();

setInterval(changeImage, 2000);
