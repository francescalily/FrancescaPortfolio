import { sketch } from "./index.js";

document.addEventListener("DOMContentLoaded", () => {
  // Create a new p5 instance and attach it to the p5-sketch element
  new p5(sketch, document.getElementById("p5-sketch"));
});
