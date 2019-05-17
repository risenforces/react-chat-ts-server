const printValue = require('yup/lib/util/printValue')

const unformattedLocale = {
  mixed: {
    default: {
      code: '${path}/INVALID',
      message: '${path} is invalid'
    },
    required: {
      code: '${path}/REQUIRED',
      message: '${path} is a required field'
    },
    oneOf: {
      code: '${path}/ONE_OF',
      message: '${path} must be one of the following values: ${values}'
    },
    notOneOf: {
      code: '${path}/NOT_ONE_OF',
      message: '${path} must not be one of the following values: ${values}'
    }
  },
  string: {
    length: {
      code: '${path}/LENGTH',
      message: '${path} must be exactly ${length} characters'
    },
    min: {
      code: '${path}/MIN',
      message: '${path} must be at least ${min} characters'
    },
    max: {
      code: '${path}/MAX',
      message: '${path} must be at most ${max} characters'
    },
    matches: {
      code: '${path}/MATCHES',
      message: '${path} must match the following: "${regex}"'
    },
    email: {
      code: '${path}/EMAIL',
      message: '${path} must be a valid email'
    },
    url: {
      code: '${path}/URL',
      message: '${path} must be a valid URL'
    },
    trim: {
      code: '${path}/TRIM',
      message: '${path} must be a trimmed string'
    },
    lowercase: {
      code: '${path}/LOWERCASE',
      message: '${path} must be a lowercase string'
    },
    uppercase: {
      code: '${path}/UPPERCASE',
      message: '${path} must be a upper case string'
    },
    mongodbObjectId: {
      code: '${path}/MONGODB_OBJECT_ID',
      message: '${path} must be a mongodb ObjectId'
    }
  },
  number: {
    min: {
      code: '${path}/MIN',
      message: '${path} must be greater than or equal to ${min}'
    },
    max: {
      code: '${path}/MAX',
      message: '${path} must be less than or equal to ${max}'
    },
    lessThan: {
      code: '${path}/LESS_THAN',
      message: '${path} must be less than ${less}'
    },
    moreThan: {
      code: '${path}/MORE_THAN',
      message: '${path} must be greater than ${more}'
    },
    notEqual: {
      code: '${path}/NOT_EQUAL',
      message: '${path} must be not equal to ${notEqual}'
    },
    positive: {
      code: '${path}/POSITIVE',
      message: '${path} must be a positive number'
    },
    negative: {
      code: '${path}/NEGATIVE',
      message: '${path} must be a negative number'
    },
    integer: {
      code: '${path}/INTEGER',
      message: '${path} must be an integer'
    }
  },
  date: {
    min: {
      code: '${path}/MIN',
      message: '${path} field must be later than ${min}'
    },
    max: {
      code: '${path}/MAX',
      message: '${path} field must be at earlier than ${max}'
    }
  },
  object: {
    noUnknown: {
      code: '${path}/NO_UNKNOWN',
      message:
        '${path} field cannot have keys not specified in the object shape'
    },
    atLeastOneOf: {
      code: '${path}/AT_LEAST_ONE_OF',
      message: 'At least one of these keys must be specified: ${list}'
    }
  },
  array: {
    min: {
      code: '${path}/MIN',
      message: '${path} field must have at least ${min} items'
    },
    max: {
      code: '${path}/MAX',
      message: '${path} field must have less than or equal to ${max} items'
    },
    unique: {
      code: '${path}/UNIQUE',
      message: '${path} field must have only unique items'
    }
  }
}

const formattedLocale = {}
for (let type in unformattedLocale) {
  formattedLocale[type] = {}

  for (let method in unformattedLocale[type]) {
    formattedLocale[type][method] = params => {
      const source = unformattedLocale[type][method]
      const formatted = {}
      for (let field in source) {
        let result = source[field]
        for (let param in params) {
          result = result.replace('${' + param + '}', params[param])
        }
        formatted[field] = result
      }
      return formatted
    }
  }
}

formattedLocale.mixed = {
  ...formattedLocale.mixed,
  notType: ({ path, type, value, originalValue }) => {
    const isCast = originalValue != null && originalValue !== value

    const code = `${path}/${type.toUpperCase()}`
    const message =
      `${path} must be a \`${type}\` type, ` +
      `but the final value was: \`${printValue(value, true)}\`` +
      (isCast
        ? ` (cast from the value \`${printValue(originalValue, true)}\`)`
        : '')

    return {
      code,
      message
    }
  }
}

module.exports = formattedLocale
