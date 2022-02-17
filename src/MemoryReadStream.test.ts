import MemoryReadStream from './MemoryReadStream'

describe('MemoryReadStream', () => {
  it.each([null, 2, 8, 16, 32])('is a readable stream that stores the data in memory (%d chunk size)', async (chunkSize) => {
    const content = 'This is a content.'

    const stream = new MemoryReadStream(Buffer.from(content, 'utf8'))

    const readContent = await new Promise<string>((resolve, reject) => {
      let content = ''
      stream.on('error', reject)
      stream.on('end', () => resolve(content))
      stream.on('readable', () => {
        let chunk: Uint8Array
        if (chunkSize === null) {
          while (null !== (chunk = stream.read())) {
            content += chunk.toString()
          }
        } else {
          while (null !== (chunk = stream.read(chunkSize))) {
            content += chunk.toString()
          }
        }
      })
    })

    expect(readContent).toBe(content)
  })
})
