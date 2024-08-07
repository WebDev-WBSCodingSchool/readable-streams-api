import { createReadStream } from 'fs';

class MediaStream {
  constructor(path) {
    this.filePath = createReadStream(path);
    this.iterator = this[Symbol.asyncIterator];
    this.controller = new AbortController();
  }

  async *[Symbol.asyncIterator]() {
    for await (const chunk of this.filePath) {
      await new Promise(resolve => setTimeout(resolve, 50));
      yield chunk;
    }
  }
}

export default MediaStream;
