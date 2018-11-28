const canvas = document.getElementById('logo-output');
const ctx = canvas.getContext('2d');
const logoForm = document.getElementById('logo-form');
const logoText = document.getElementById('logo-text');

const runButton = document.getElementById('run');
const resetButton = document.getElementById('reset');

const infoDiv = document.getElementById('info');

ctx.fillStyle = '#101010';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const turtle = new Turtle(ctx);

// draw a spirograph inspired circle.
// turtle.penUp();

// turtle.left(135);
// turtle.forward(200);
// turtle.right(135);

// turtle.penDown();

// for (let i = 0; i < 90; ++i) {
//   turtle.forward(300);
//   turtle.right(92);
// }

runButton.addEventListener('click', event => {
  event.preventDefault();

  const parser = new LogoParser(logoText.value);

  infoDiv.innerText = JSON.stringify(parser.tokens, null, 2);

  const runner = new LogoRunner(turtle, parser.tokens);

  runner.run();
});

resetButton.addEventListener('click', () => {
  turtle.reset();
});
