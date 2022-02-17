import internal, { Readable } from 'stream';

/** Stream to read a sequence of bytes from. The sequence of bytes is stored in memory */
export default class MemoryReadStream extends Readable {
  private pushedByteCount: number
  /**
   * Creates an instance of a memory read stream.
   * @param data The data contained in the stream.
   * @param options options for the Readable stream, see https://nodejs.org/api/stream.html#new-streamreadableoptions.
   */
  constructor(private data: Buffer, options?: internal.ReadableOptions) {
    super(options);
    this.pushedByteCount = 0
  }

  public _read = (size: number): void => {
    const capacity = Math.min(size, this.data.length - this.pushedByteCount)
    const readData = new Uint8Array(capacity)
    for (let i = 0; i < capacity; ++i) {
      readData[i] = (this.data.readUInt8(i + this.pushedByteCount))
    }

    this.pushedByteCount += capacity
    this.push(readData)

    if (this.pushedByteCount >= this.data.length) {
      this.push(null)
    }
  }
}
