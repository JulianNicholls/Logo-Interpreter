class LogoRunner {
  constructor(turtle, tokens) {
    this.turtle = turtle;
    this.tokens = tokens;
  }

  runCommand(token) {
    const { turtle } = this;
    const { type, arg, loopCount, commands } = token;

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
  }

  run(tokens = this.tokens) {
    tokens.forEach((token) => this.runCommand(token));
  }
}
