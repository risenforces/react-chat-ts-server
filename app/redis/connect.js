const client = require('./client')
const Log = require('@app/helpers/Log')
const { redisNamespace } = require('@config')

const splitKeysByChunks = (arr, len) => {
  const result = []

  const chunksAmount = Math.ceil(arr.length / len)

  let offset = 0
  for (let i = 0; i < chunksAmount; i++) {
    const chunk = []

    const end = offset + len > arr.length ? arr.length : offset + len

    for (let j = offset; j < end; j++) {
      chunk.push(arr[j])
    }

    result.push(chunk)
    offset = end
  }

  return result
}

module.exports = () =>
  new Promise((resolve, reject) => {
    let interval = null

    // 10 seconds
    const maxWaitTime = 1000 * 10

    const start = new Date()

    const success = () => {
      if (interval) clearInterval(interval)

      const end = () => {
        Log.success('Redis storage is ready')
        resolve()
      }

      client.keys(`${redisNamespace}/*`, (err, keys) => {
        if (err) {
          return reject()
        }

        if (keys.length === 0) {
          return end()
        }

        Log.warning(`Found ${keys.length} old records in Redis, clearing them..`)
        const chunks = splitKeysByChunks(keys, 50)

        let delCount = 0

        for (let chunk of chunks) {
          client.del(...chunk, () => {
            delCount += 1
            if (delCount === chunks.length) {
              end()
            }
          })
        }
      })
    }

    const failure = () => {
      if (interval) clearInterval(interval)
      Log.failure('Failed to connect to Redis')
      reject()
    }

    if (client.connected) {
      return success()
    }

    const checkConnection = () => {
      if (client.connected) {
        return success()
      }
      if (new Date() - start > maxWaitTime) {
        return failure()
      }
    }

    interval = setInterval(checkConnection, 500)
  })
