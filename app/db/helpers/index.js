const checkEquality = require('./checkEquality')

const createDataMethod = callback => {
  return function() {
    const data = this.toObject()
    return callback(data)
  }
}

const resolve = (data, path) => {
  let destination = data
  for (let segment of path) {
    destination = destination[segment]
  }
  return destination
}

const is = field => {
  const path = field.split('.')

  const equalTo = value => {
    return createDataMethod(data => resolve(data, path) === value)
  }

  const notEqualTo = value => {
    return createDataMethod(data => resolve(data, path) !== value)
  }

  const deepEqualTo = value => {
    return createDataMethod(data => checkEquality(resolve(data, path), value))
  }

  const notDeepEqualTo = value => {
    return createDataMethod(data => !checkEquality(resolve(data, path), value))
  }

  const oneOf = values => {
    return createDataMethod(data => values.includes(resolve(data, path)))
  }

  const notOneOf = values => {
    return createDataMethod(data => !values.includes(resolve(data, path)))
  }

  return {
    equalTo,
    notEqualTo,
    deepEqualTo,
    notDeepEqualTo,
    oneOf,
    notOneOf
  }
}

module.exports = {
  createDataMethod,
  is
}
