const checkEquality = (v1, v2) => {
  if (typeof v1 !== typeof v2) {
    return false
  }

  if (typeof v1 !== 'object') {
    return v1 === v2
  }

  if (v1 === null || v2 === null) {
    return v1 === v2
  }

  if (v1.constructor !== v2.constructor) {
    return false
  }

  if (v1.constructor === Object) {
    if (Object.keys(v1).length !== Object.keys(v2).length) return false

    for (let key in v1) {
      if (!checkEquality(v1[key], v2[key])) return false
    }

    return true
  }

  if (v1.constructor === Set) {
    v1 = Array.from(v1)
    v2 = Array.from(v2)
  }

  if (v1.constructor === Array) {
    if (v1.length !== v2.length) return false

    for (let i = 0; i < v1.length; i++) {
      if (!checkEquality(v1[i], v2[i])) return false
    }

    return true
  }

  if (v1.constructor === Map) {
    if (v1.size !== v2.size) return false

    for (let key of v1.keys()) {
      if (!checkEquality(v1.get(key), v2.get(key))) return false
    }

    return true
  }

  // unsupported type
  return false
}

module.exports = checkEquality
