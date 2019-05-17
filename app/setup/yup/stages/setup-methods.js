const Yup = require('yup')
const { ObjectId } = require('mongoose').Types
const locale = require('../locale')

Yup.addMethod(Yup.array, 'unique', function() {
  return this.test({
    name: 'unique',
    message: locale.array.unique,
    exclusive: true,
    test: value => value == null || new Set(value).size === value.length
  })
})

Yup.addMethod(Yup.string, 'mongodbObjectId', function() {
  return this.test({
    name: 'mongodbObjectId',
    message: locale.string.mongodbObjectId,
    exclusive: true,
    test: value => {
      try {
        return value == null || new ObjectId(value) == value
      } catch (err) {
        return false
      }
    }
  })
})

Yup.addMethod(Yup.object, 'atLeastOneOf', function(list) {
  return this.test({
    name: 'atLeastOneOf',
    message: locale.object.atLeastOneOf,
    exclusive: true,
    params: { list: list.join(', ') },
    test: value => value == null || list.some(f => value[f] != null)
  })
})
