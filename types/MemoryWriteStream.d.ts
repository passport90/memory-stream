/// <reference types="node" />
import internal, { Writable } from 'stream';
/** Stream to write a sequence of bytes to. The sequence of bytes is stored in memory */
export default class MemoryReadStream extends Writable {
    private data;
    private writtenByteCount;
    /**
     * Creates an instance of a memory write stream.
     * @param data The buffer to hold the written data.
     * @param options options for the writable stream, see https://nodejs.org/api/stream.html#new-streamwritableoptions.
     */
    constructor(data: Buffer, options?: internal.WritableOptions);
    _write(chunk: Buffer | string | Uint8Array, encoding: BufferEncoding, callback: (error?: Error | null) => void): void;
}
