let sun = new Image();
let moon = new Image();
let earth = new Image();

const ctxS = document.getElementById("canvasSolarSystem").getContext("2d");

//
function init() {
  sun.src = "canvas_sun.png";
  moon.src = "canvas_moon.png";
  earth.src = "canvas_earth.png";
  window.requestAnimationFrame(drawSolarSystem);
}

function drawSolarSystem() {
  //para dibujar atras de los demas elementos
  ctxS.globalCompositeOperation = "destination-over";
  //limpia el canvas de anera continua
  ctxS.clearRect(0, 0, 300, 300); // limpiar canvas

  ctxS.fillStyle = "rgba(0,0,0,0.4)";
  ctxS.strokeStyle = "rgba(0,153,255,0.4)";
  ctxS.save();
  ctxS.translate(150, 150);

  // La tierra
  let time = new Date();
  ctxS.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
      ((2 * Math.PI) / 60000) * time.getMilliseconds(),
  );

  //se hace el deplazamiento del objeto, para generar una sombra 
  ctxS.translate(105, 0);
  ctxS.fillRect(0, -12, 50, 24); // Sombra
  //dibujar multiples imagenes, con una translacion en base a la original
  ctxS.drawImage(earth, -12, -12);

  // La luna
  ctxS.save();
  ctxS.rotate(
    ((2 * Math.PI) / 6) * time.getSeconds() +
      ((2 * Math.PI) / 6000) * time.getMilliseconds(),
  );
  ctxS.translate(0, 28.5);
  ctxS.drawImage(moon, -3.5, -3.5);

  //Restore vuelve al punto original para poder volver a dibujar
  ctxS.restore();

  ctxS.restore();

  //dibuja un circulo en sentido antihorario
  ctxS.beginPath();
  ctxS.arc(150, 150, 105, 0, Math.PI * 2, false); // Órbita terrestre
  ctxS.stroke();

  ctxS.drawImage(sun, 0, 0, 300, 300);

  window.requestAnimationFrame(drawSolarSystem);
}

init();

// Panoramica 
const img = new Image();

// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.
img.src = "panoramica4.jpg";
const canvasXSize = 1000;
const canvasYSize = 400;
const speed = 30; // lower is faster
const scale = 1.05;
const y = -4.5; // vertical offset

// Main program
const dx = 0.75;
let imgW;
let imgH;
let x = 0;
let clearX;
let clearY;
let ctx;

img.onload = () => {
  imgW = img.width * scale;
  imgH = img.height * scale;

  if (imgW > canvasXSize) {
    // Image larger than canvas
    x = canvasXSize - imgW;
  }

  // Check if image dimension is larger than canvas
  clearX = Math.max(imgW, canvasXSize);
  clearY = Math.max(imgH, canvasYSize);

  // Get canvas context
  ctx = document.getElementById("canvasP").getContext("2d");

  // Set refresh rate
  return setInterval(draw, speed);
};

function draw() {
  ctx.clearRect(0, 0, clearX, clearY); // clear the canvas

  // If image is <= canvas size
  if (imgW <= canvasXSize) {
    // Reset, start from beginning
    if (x > canvasXSize) {
      x = -imgW + x;
    }

    // Draw additional image1
    if (x > 0) {
      ctx.drawImage(img, -imgW + x, y, imgW, imgH);
    }

    // Draw additional image2
    if (x - imgW > 0) {
      ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
    }
  } else {
    // Image is > canvas size
    // Reset, start from beginning
    if (x > canvasXSize) {
      x = canvasXSize - imgW;
    }

    // Draw additional image
    if (x > canvasXSize - imgW) {
      ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
    }
  }

  // Draw image
  ctx.drawImage(img, x, y, imgW, imgH);

  // Amount to move
  x += dx;
}
