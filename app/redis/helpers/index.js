const { redisNamespace } = require('@config')
const client = require('../client')
const { promisify } = require('util')

const withNS = key => redisNamespace + '/' + key
const combine = path => path.join('/')

const format = path => {
  const combined = combine(path)
  return withNS(combined)
}

const asyncActions = {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
  remove: promisify(client.del).bind(client)
}

exports.get = async ({ path, parse = v => v }) => {
  const key = format(path)

  const value = await asyncActions.get(key)
  return parse(value)
}

exports.set = ({ path, value, stringify = v => v.toString() }) => {
  const key = format(path)

  const str = stringify(value)
  return asyncActions.set(key, str)
}

exports.remove = ({ path }) => {
  const key = format(path)

  return asyncActions.remove(key)
}

exports.custom = async ({ path, fn }) => {
  const key = format(path)

  return await fn({ key, asyncActions })
}

exports.parsers = {
  number: str => Number(str),
  boolean: str => str === 'true',
  object: str => JSON.parse(str),
  array: str => JSON.parse(array)
}

exports.stringifiers = {
  object: obj => JSON.stringify(obj),
  array: arr => JSON.stringify(arr)
}
