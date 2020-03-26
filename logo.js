const canvas = document.getElementById('logo-output');
const ctx = canvas.getContext('2d');

const logoText = document.getElementById('logo-text');

const runButton = document.getElementById('run');
const resetButton = document.getElementById('reset');

const infoDiv = document.getElementById('info');

ctx.fillStyle = '#101010';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const turtle = new Turtle(ctx);

runButton.addEventListener('click', () => {
  const parser = new LogoParser(logoText.value);
  const runner = new LogoRunner(turtle, parser.tokens);

  infoDiv.innerText = JSON.stringify(parser.tokens, null, 2);

  runner.run();
});

resetButton.addEventListener('click', () => {
  turtle.reset();
});
