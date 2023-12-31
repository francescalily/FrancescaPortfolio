export function sketch(p) {
  let cols, rows;
  const scl = 10;
  let w, h;
  let terrain = [];
  let video;
  let shift = 0;

  p.setup = function () {
    console.log("Setup test");
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    w = p.width + scl;
    h = p.height;
    cols = w / scl;
    rows = h / scl + 1;
    video = p.createCapture(p.VIDEO);
    video.id("myCapture");

    for (let x = 0; x < cols; x++) {
      terrain[x] = [];
      for (let y = 0; y < rows; y++) {
        terrain[x][y] = 0;
      }
    }
  };

  p.draw = function () {
    console.log("Draw test");
    video.size(w / scl, h / scl);
    p.background(255);

    video.loadPixels();
    shift -= 0.03;
    let yOffset = shift;

    for (let y = 0; y < rows - 1; y++) {
      let xOffset = 0;
      for (let x = 0; x < cols; x++) {
        const index = (x + y * video.width) * 4;
        const r = video.pixels[index];
        const g = video.pixels[index + 1];
        const b = video.pixels[index + 2];
        const brightness = (r + g + b) / 3;
        terrain[x][y] =
          p.map(brightness, 0, 255, -50, 100) +
          p.map(p.noise(xOffset, yOffset), 0, 1, -50, 50);
        xOffset += 0.1;
      }
      yOffset += 0.1;
    }

    p.translate(-w / 2, -h / 3, -200);
    p.rotateX(p.map(p.mouseY, 0, p.height, p.PI / 2, -p.PI / 8));
    p.noFill();
    p.stroke(0);

    for (let y = 0; y < rows - 3; y++) {
      p.beginShape(p.TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        p.vertex(x * scl, y * scl, terrain[x][y]);
        p.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
      }
      p.endShape();
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    w = p.windowWidth + scl;
    h = p.windowHeight;
    cols = w / scl;
    rows = h / scl + 1;
    video.size(w / scl, h / scl);
  };
}
