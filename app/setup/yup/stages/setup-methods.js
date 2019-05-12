const Yup = require('yup')
const { ObjectId } = require('mongoose').Types
const isAbsent = require('yup/lib/util/isAbsent')
const locale = require('../locale')

Yup.addMethod(Yup.array, 'unique', function() {
  return this.test({
    name: 'unique',
    message: locale.array.unique,
    exclusive: true,
    test: value => isAbsent(value) || new Set(value).size === value.length
  })
})

Yup.addMethod(Yup.string, 'mongodbObjectId', function() {
  return this.test({
    name: 'mongodbObjectId',
    message: locale.string.mongodbObjectId,
    exclusive: true,
    test: value => {
      try {
        return isAbsent(value) || new ObjectId(value) == value
      } catch (err) {
        return false
      }
    }
  })
})
