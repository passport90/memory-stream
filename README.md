# memory-stream
Simple and lightweight implementation of Node.js Readable and Writable stream API where the data are stored in memory.

## Usage Example
### Read stream
This snippet would print 'This is a content.' to the screen.
```
import { MemoryReadStream } from '@passport90/memory-stream'

const content = 'This is a content.'

const stream = new MemoryReadStream(Buffer.from(content, 'utf8'))

let readString = ''
stream.on('error', console.error)
stream.on('end', () => console.log(readString)) 
stream.on('readable', () => {
  let chunk: Uint8Array
  while (null !== (chunk = stream.read())) {
    readString += chunk.toString()
  }
})

```

### Write stream
This snippet would print 'This is a content.' to the screen.
```
import { MemoryWriteStream } from '@passport90/memory-stream'

const content = 'This is a content.'
const buffer = Buffer.alloc(content.length)

const stream = new MemoryWriteStream(buffer)

stream.on('error', console.error)
stream.on('finish', () => console.log(buffer.toString()))
stream.end(content, 'utf8')

```


