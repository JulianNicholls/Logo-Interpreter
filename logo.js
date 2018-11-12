const canvas = document.getElementById('logo-output');
const ctx = canvas.getContext('2d');
const logoForm = document.getElementById('logo-form');
const logoText = document.getElementById('logo-text');
const infoDiv = document.getElementById('info');

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, 600, 600);

const turtle = new Turtle(ctx);

turtle.penUp();

turtle.left(135);
turtle.forward(200);
turtle.right(135);

turtle.penDown();

for (let i = 0; i < 90; ++i) {
  turtle.forward(300);
  turtle.right(92);
}

logoForm.addEventListener('submit', event => {
  event.preventDefault();

  const parser = new LogoParser(logoText.value);

  infoDiv.innerText = JSON.stringify(parser.tokens, null, 1);
});
