const ca = require('./checkAuth')

const jwt = require('jsonwebtoken')

const SECRET = 'VERY_GOOD_SECRET'

describe('socket/checkAuth', () => {
  const validJWT = jwt.sign({ _id: 12345 }, SECRET)

  test('should fail', () => {
    const check = authorization => {
      const headers = { authorization }
      const { result } = ca(headers, SECRET)

      expect(result).toBe(false)
    }

    check(undefined)
    check(null)
    check('')
    check('jwt 7g4598gb54967g')
    check('Bearer 6sf7576fgs756')
    check(`Bearer ${validJWT}`)
    check('sugisoifgusdgsdgudhfgu')
    check('isdfgu guidfy')

    const { result: withoutAuthResult } = ca({}, SECRET)
    expect(withoutAuthResult).toBe(false)
  })

  test('should pass and return payload', () => {
    const check = authorization => {
      const headers = { authorization }
      const { result, payload } = ca(headers, SECRET)

      expect(result).toBe(true)
      expect(payload).toMatchObject({ _id: 12345 })
    }

    check(`jwt ${validJWT}`)
    check(`jWt ${validJWT}`)
    check(`JWT ${validJWT}`)
  })
})
