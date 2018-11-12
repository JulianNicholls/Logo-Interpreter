class Turtle {
  constructor(ctx) {
    this.ctx = ctx;
    this.angle = -Math.PI / 2; // Straight up, however, actually 270deg because the co-oridnate system runs from the top
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
