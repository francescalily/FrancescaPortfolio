let cols, rows;
const scl = 15;
let w;
let h;

let terrain = [];

let video;

let shift = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  w = width;
  h = height;
  cols = w / scl;
  rows = h / scl;

  video = createCapture(VIDEO);
  video.id("myCapture");

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {
  video.size(w / scl, h / scl);
  background(0);

  video.loadPixels();
  loadPixels();
  shift -= 0.03;
  let yOffset = shift;

  for (let y = 0; y < video.height; y++) {
    let xOffset = 0;
    for (let x = 0; x < video.width; x++) {
      const index = (video.width - x - 1 + y * video.width) * 4;
      const r = video.pixels[index + 0];
      const g = video.pixels[index + 1];
      const b = video.pixels[index + 2];
      const brightness = (r + b + g) / 3;

      terrain[x][y] =
        map(brightness, 0, 255, -50, 100) +
        map(noise(xOffset, yOffset), 0, 1, -50, 20);
      xOffset += 0.1;
    }
    yOffset += 0.1;
  }

  background(255, 255, 255);
  translate(0, 50);
  rotateX(map(mouseY, 80, height, PI / 2, -PI / 8));
  noFill();
  stroke(0, 0, 0);

  translate(-w / 2, -h / 2);
  for (let y = 0; y < rows - 2; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols - 1; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
