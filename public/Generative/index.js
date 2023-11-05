import imageOne from "../assets/websites/h20.jpeg";
import imageTwo from "../assets/websites/ny.jpg";
import imageThree from "../assets/websites/facegen.png";
import imageFour from "../assets/websites/textureOne.png";

const images = [
  `url(${imageOne})`,
  `url(${imageTwo})`,
  `url(${imageThree})`,
  `url(${imageFour})`,
];

let currentIndex = 0;
const imageContainer = document.getElementById("imageContainer");

function changeImage() {
  imageContainer.style.backgroundImage = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;
}

changeImage();

setInterval(changeImage, 2000);
