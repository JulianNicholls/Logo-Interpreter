class Turtle {
  constructor(ctx) {
    this.ctx = ctx;
    this.angle = -Math.PI / 2;
    this.x = 250;
    this.y = 250;
    this._penDown = true;

    ctx.strokeStyle = '#fff';
  }

  forward(delta) {
    const { x: curX, y: curY, angle, ctx, _penDown } = this;

    this.x += Math.cos(angle) * delta;
    this.y += Math.sin(angle) * delta;

    if (_penDown) {
      ctx.beginPath();
      ctx.moveTo(curX, curY);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
    }
  }

  right(angle) {
    let newAngle = this.angle + (angle * Math.PI) / 180;

    if (newAngle > 2 * Math.PI) newAngle -= 2 * Math.PI;

    this.angle = newAngle;
  }

  left(angle) {
    let newAngle = this.angle - (angle * Math.PI) / 180;

    if (newAngle < 0) newAngle += 2 * Math.PI;

    this.angle = newAngle;
  }

  penUp() {
    this._penDown = false;
  }

  penDown() {
    this._penDown = true;
  }
}

const canvas = document.getElementById('logo-output');
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, 600, 600);

const turtle = new Turtle(ctx);

turtle.forward(100);
turtle.right(60);

turtle.forward(100);
turtle.right(60);

turtle.penUp();

turtle.forward(100);
turtle.right(60);

turtle.penDown();

turtle.forward(100);
turtle.right(60);

turtle.penUp();

turtle.forward(100);
turtle.right(60);

turtle.penDown();

turtle.forward(100);

//   ctx.strokeStyle = '#fff';

// ctx.beginPath();
// ctx.moveTo(100, 100);
// ctx.lineTo(200, 100);
// ctx.lineTo(150, 187);
// ctx.lineTo(100, 100);
// ctx.stroke();
