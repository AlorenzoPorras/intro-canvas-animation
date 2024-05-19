const canvasMouse = document.getElementById("cw");
const context = canvasMouse.getContext("2d");
context.globalAlpha = 0.5;

const cursor = {
  x: canvasMouse.width / 2,
  y: canvasMouse.height / 2,
};

let particlesArray = [];

generateParticles(101);
anim();

addEventListener("mousemove", (e) => {
  cursor.x = e.clientX - canvasMouse.offsetLeft;
  cursor.y = e.clientY - canvasMouse.offsetTop;
});

addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    cursor.x = e.touches[0].clientX - canvasMouse.offsetLeft;
    cursor.y = e.touches[0].clientY - canvasMouse.offsetTop;
  },
  { passive: false },
);

function generateParticles(amount) {
  for (let i = 0; i < amount; i++) {
    particlesArray[i] = new Particle(
      canvasMouse.width / 2,
      canvasMouse.height / 2,
      4,
      generateColor(),
      0.02,
    );
  }
}

function generateColor() {
  let hexSet = "0123456789ABCDEF";
  let finalHexString = "#";
  for (let i = 0; i < 6; i++) {
    finalHexString += hexSet[Math.ceil(Math.random() * 15)];
  }
  return finalHexString;
}

function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
  this.x = x;
  this.y = y;
  this.particleTrailWidth = particleTrailWidth;
  this.strokeColor = strokeColor;
  this.theta = Math.random() * Math.PI * 2;
  this.rotateSpeed = rotateSpeed;
  this.t = Math.random() * 150;

  this.rotate = () => {
    const ls = {
      x: this.x,
      y: this.y,
    };
    this.theta += this.rotateSpeed;
    this.x = cursor.x + Math.cos(this.theta) * this.t;
    this.y = cursor.y + Math.sin(this.theta) * this.t;
    context.beginPath();
    context.lineWidth = this.particleTrailWidth;
    context.strokeStyle = this.strokeColor;
    context.moveTo(ls.x, ls.y);
    context.lineTo(this.x, this.y);
    context.stroke();
  };
}

function anim() {
  requestAnimationFrame(anim);

  context.fillStyle = "rgb(0 0 0 / 5%)";
  context.fillRect(0, 0, canvasMouse.width, canvasMouse.height);

  particlesArray.forEach((particle) => particle.rotate());
}
