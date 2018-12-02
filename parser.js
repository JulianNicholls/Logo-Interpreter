class Token {
  constructor(type, arg = null) {
    this.type = type;
    this.arg = this.parseArg(arg);
    this.loopCount = 0;
    this.commands = [];
  }

  addCommandToken(token) {
    this.commands.push(token);
  }

  parseArg(arg) {
    if (!arg || arg[0] === '#') return arg;

    return parseInt(arg, 10);
  }
}

class LogoParser {
  constructor(text) {
    this.setText(text);
  }

  setText(text) {
    this.text = text;
    this.chunks = [];
    this.lexer();
    this.tokenise();
  }

  lexer() {
    const stripped = this.text.toLowerCase().replace(/\s+/g, ' ');
    let chunk = '';

    stripped.split('').forEach(ch => {
      if (ch === ' ') {
        if (chunk.length !== 0) {
          this.chunks.push(chunk);
          chunk = '';
        }
      } else if (ch == '[' || ch === ']') {
        if (chunk.length !== 0) {
          this.chunks.push(chunk);
          chunk = '';
        }

        this.chunks.push(ch);
      } else if (/[a-z0-9#]/.test(ch)) chunk += ch;
    });

    if (chunk.length !== 0) this.chunks.push(chunk);
  }

  nextChunk() {
    return this.chunks.shift();
  }

  tokenFromChunk(chunk) {
    switch (chunk) {
      case 'fd':
      case 'forward':
        return new Token('fd', this.nextChunk());

      case 'left':
      case 'lt':
        return new Token('lt', this.nextChunk());

      case 'right':
      case 'rt':
        return new Token('rt', this.nextChunk());

      case 'penup':
      case 'pu':
        return new Token('pu');

      case 'pendown':
      case 'pd':
        return new Token('pd');

      case 'color':
      case 'colour':
        return new Token('clr', this.nextChunk());

      case 'repeat':
        return this.parseRepeat();
    }

    console.error('Unrecognised:', chunk);
    return new Token('invalid');
  }

  parseRepeat() {
    const token = new Token('repeat');
    let next = this.nextChunk();

    next = parseInt(next, 10);

    if (isNaN(next) || this.nextChunk() !== '[') {
      console.error('Error following repeat, expected nn [, got', next);
      return;
    }

    token.loopCount = next;

    while ((next = this.nextChunk()) !== ']') {
      token.addCommandToken(this.tokenFromChunk(next));
    }

    return token;
  }

  tokenise() {
    let chunk;

    this.tokens = [];

    while ((chunk = this.nextChunk()) !== undefined)
      this.tokens.push(this.tokenFromChunk(chunk));
  }
}
