/// <reference types="node" />
import internal, { Readable } from 'stream';
/** Stream to read a sequence of bytes from. The sequence of bytes is stored in memory */
export default class MemoryReadStream extends Readable {
    private data;
    private pushedByteCount;
    /**
     * Creates an instance of a memory read stream.
     * @param data The data contained in the stream.
     * @param options options for the Readable stream, see https://nodejs.org/api/stream.html#new-streamreadableoptions.
     */
    constructor(data: Buffer, options?: internal.ReadableOptions);
    _read: (size: number) => void;
}
