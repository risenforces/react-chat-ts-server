const Yup = require('yup')
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
