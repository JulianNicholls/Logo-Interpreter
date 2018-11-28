class Token {
  constructor(type, arg = null) {
    this.type = type;
    this.arg = arg ? parseInt(arg, 10) : arg;
    this.loopCount = 0;
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

    this.chunks = chunks;
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
    }

    console.error('Unrecognised:', chunk);
    return new Token('invalid');
  }

  tokenise() {
    let chunk;

    this.tokens = [];

    while ((chunk = this.nextChunk()) !== undefined) {
      if (chunk === 'repeat') {
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

        this.tokens.push(token);
      } else this.tokens.push(this.tokenFromChunk(chunk));
    }
  }
}
