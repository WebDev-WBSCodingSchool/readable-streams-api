class TextStream {
  constructor(words) {
    this.words = words.split(' ');
    this.iterator = this[Symbol.asyncIterator];
    this.controller = new AbortController();
  }

  async *[Symbol.asyncIterator]() {
    for (let [_, v] of this.words.entries()) {
      await new Promise(resolve => setTimeout(resolve, 50));
      if (this.controller.signal.aborted) {
        break;
      }
      yield v;
    }
  }
}

export default TextStream;
