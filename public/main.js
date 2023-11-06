import { sketch } from "./index.js";

document.addEventListener("DOMContentLoaded", () => {
  new p5(sketch, document.getElementById("p5-sketch"));
});
