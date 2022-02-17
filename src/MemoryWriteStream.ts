import internal, { Writable } from 'stream';

/** Stream to write a sequence of bytes to. The sequence of bytes is stored in memory */
export default class MemoryReadStream extends Writable {
  private writtenByteCount: number
  /**
   * Creates an instance of a memory write stream.
   * @param data The buffer to hold the written data.
   * @param options options for the writable stream, see https://nodejs.org/api/stream.html#new-streamwritableoptions.
   */
  constructor(private data: Buffer, options?: internal.WritableOptions) {
    super(options);
    this.writtenByteCount = 0
  }

  public _write(
    chunk: Buffer | string | Uint8Array,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ): void {
    this.data.fill(chunk, this.writtenByteCount, this.data.length, encoding)
    this.writtenByteCount += (chunk as string | Buffer).length
    callback()
  }
}
