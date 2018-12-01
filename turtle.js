// The direction starts straight up, however, actually its 270deg
// because the co-ordinate system runs from the top.
class Turtle {
  constructor(ctx) {
    this.ctx = ctx;

    this.reset();
  }

  reset() {
    this.angle = -Math.PI / 2;
    this.x = 250;
    this.y = 250;
    this._penDown = true;

    this.ctx.strokeStyle = '#fff';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
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

  colour(colour) {
    this.ctx.strokeStyle = colour;
  }

  penUp() {
    this._penDown = false;
  }

  penDown() {
    this._penDown = true;
  }
}
