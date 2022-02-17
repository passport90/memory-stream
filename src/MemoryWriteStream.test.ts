import MemoryWriteStream from './MemoryWriteStream'

describe('MemoryWriteStream', () => {
  it.each([null, 2, 8, 16, 32])('is a writable stream that stores the data in memory (%d chunk size)', async (chunkSize) => {
    const content = 'This is a content.'
    const buffer = Buffer.alloc(content.length)

    const stream = new MemoryWriteStream(buffer)

    await new Promise<void>((resolve, reject) => {
      stream.on('error', reject)
      stream.on('finish', resolve)
      if (chunkSize === null) {
        stream.end(content, 'utf8')
      } else {
        for (let w = 0; w < content.length; w += chunkSize) {
          stream.write(content.slice(w, w + chunkSize), 'utf8')
        }
        stream.end()
      }
    })

    expect(buffer.toString()).toBe(content)
  })
})
