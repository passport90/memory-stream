import MemoryReadStream from './MemoryReadStream'

describe('MemoryReadStream', () => {
  it('is a readable stream that stores the data in memory', async () => {
    const content = 'This is a content.'

    const stream = new MemoryReadStream(Buffer.from(content, 'utf8'))

    const readContent = await new Promise<string>((resolve, reject) => {
      let content = ''
      stream.on('error', reject)
      stream.on('end', () => resolve(content))
      stream.on('readable', () => {
        let chunk: Uint8Array
        while (null !== (chunk = stream.read())) {
          content += chunk.toString()
        }
      })
    })

    expect(readContent).toBe(content)
  })
})
