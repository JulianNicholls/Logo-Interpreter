class LogoRunner {
  constructor(turtle, tokens) {
    this.turtle = turtle;
    this.tokens = tokens;
  }

  run(tokens = this.tokens) {
    const { turtle } = this;

    tokens.forEach(({ type, arg, loopCount, commands }) => {
      switch (type) {
        case 'fd':
          turtle.forward(arg);
          break;

        case 'lt':
          turtle.left(arg);
          break;

        case 'rt':
          turtle.right(arg);
          break;

        case 'pu':
          turtle.penUp();
          break;

        case 'pd':
          turtle.penDown();
          break;

        case 'clr':
          turtle.colour(arg);
          break;

        case 'repeat':
          for (let i = 0; i < loopCount; ++i) {
            this.run(commands);
          }
          break;
      }
    });
  }
}
