class Token {
  constructor(type, arg = null) {
    this.type = type;
    this.arg = arg ? parseInt(arg, 10) : arg;
    this.commands = [];
  }

  addCommandToken(token) {
    this.commands.push(token);
  }
}

class LogoParser {
  constructor(text) {
    this.setText(text);
  }

  setText(text) {
    this.text = text;
    this.split();
    this.tokenise();
    this.curToken = 0;
  }

  split() {
    const stripped = this.text.toLowerCase().replace(/\s+/g, ' ');
    const chunks = [];
    let chunk = '';

    for (let idx = 0; idx < stripped.length; ++idx) {
      const ch = stripped.charAt(idx);

      if (ch === ' ') {
        if (chunk.length !== 0) {
          chunks.push(chunk);
          chunk = '';
        }
      } else if (ch == '[' || ch === ']') {
        if (chunk.length !== 0) {
          chunks.push(chunk);
          chunk = '';
        }

        chunks.push(ch);
      } else if (/[a-z0-9]/.test(ch)) chunk += ch;
    }

    if (chunk.length !== 0) chunks.push(chunk);

    this.tokens = chunks;
  }

  tokenise() {
    const chunks = [...this.tokens];
    let chunk;

    this.tokens = [];

    while ((chunk = chunks.shift()) !== undefined) {
      switch (chunk) {
        case 'fd':
        case 'forward':
          this.tokens.push(new Token('fd', chunks.shift()));
          break;

        case 'left':
        case 'lt':
          this.tokens.push(new Token('lt', chunks.shift()));
          break;

        case 'right':
        case 'rt':
          this.tokens.push(new Token('rt', chunks.shift()));
          break;

        case 'penup':
        case 'pu':
          this.tokens.push(new Token('pu'));
          break;

        case 'pendown':
        case 'pd':
          this.tokens.push(new Token('pd'));
          break;
      }
    }
  }
}
