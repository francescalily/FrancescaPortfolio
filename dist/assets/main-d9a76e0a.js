import"./modulepreload-polyfill-3cfb730f.js";function m(e){let n,i,c,d,r=[],s,h=0;e.setup=function(){console.log("setup called"),e.createCanvas(e.windowWidth,e.windowHeight,e.WEBGL),c=e.width+15,d=e.height,n=c/15,i=d/15+1,s=e.createCapture(e.VIDEO),s.id("myCapture");for(let l=0;l<n;l++){r[l]=[];for(let t=0;t<i;t++)r[l][t]=0}},e.draw=function(){console.log("draw called"),s.size(c/15,d/15),e.background(0),s.loadPixels(),h-=.03;let l=h;for(let t=0;t<i-1;t++){let o=0;for(let a=0;a<n;a++){const w=(a+t*s.width)*4,f=s.pixels[w],g=s.pixels[w+1],u=s.pixels[w+2],x=(f+g+u)/3;r[a][t]=e.map(x,0,255,-50,100)+e.map(e.noise(o,l),0,1,-50,50),o+=.1}l+=.1}e.translate(-c/2,-d/10),e.rotateX(e.map(e.mouseY,0,e.height,e.PI/2,-e.PI/8)),e.noFill(),e.stroke(0);for(let t=0;t<i-1;t++){e.beginShape(e.TRIANGLE_STRIP);for(let o=0;o<n;o++)e.vertex(o*15,t*15,r[o][t]),e.vertex(o*15,(t+1)*15,r[o][t+1]);e.endShape()}},e.windowResized=function(){e.resizeCanvas(e.windowWidth,e.windowHeight),c=e.windowWidth,d=e.windowHeight,n=c/15,i=d/15,s.size(n,i)}}document.addEventListener("DOMContentLoaded",()=>{new p5(m,document.getElementById("p5-sketch"))});
