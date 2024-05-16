let sun = new Image();
let moon = new Image();
let earth = new Image();

const ctx = document.getElementById("canvasSolarSystem").getContext("2d");

//
function init() {
  sun.src = "canvas_sun.png";
  moon.src = "canvas_moon.png";
  earth.src = "canvas_earth.png";
  window.requestAnimationFrame(draw);
}

function draw() {
  //para dibujar atras de los demas elementos
  ctx.globalCompositeOperation = "destination-over";
  //limpia el canvas de anera continua
  ctx.clearRect(0, 0, 300, 300); // limpiar canvas

  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.strokeStyle = "rgba(0,153,255,0.4)";
  ctx.save();
  ctx.translate(150, 150);

  // La tierra
  let time = new Date();
  ctx.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
      ((2 * Math.PI) / 60000) * time.getMilliseconds(),
  );

  //se hace el deplazamiento del objeto, para generar una sombra 
  ctx.translate(105, 0);
  ctx.fillRect(0, -12, 50, 24); // Sombra
  //dibujar multiples imagenes, con una translacion en base a la original
  ctx.drawImage(earth, -12, -12);

  // La luna
  ctx.save();
  ctx.rotate(
    ((2 * Math.PI) / 6) * time.getSeconds() +
      ((2 * Math.PI) / 6000) * time.getMilliseconds(),
  );
  ctx.translate(0, 28.5);
  ctx.drawImage(moon, -3.5, -3.5);

  //Restore vuelve al punto original para poder volver a dibujar
  ctx.restore();

  ctx.restore();

  //dibuja un circulo en sentido antihorario
  ctx.beginPath();
  ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Órbita terrestre
  ctx.stroke();

  ctx.drawImage(sun, 0, 0, 300, 300);

  window.requestAnimationFrame(draw);
}

init();
