const actions = new Map()

const createActionGroup = groupName => {
  const addAction = (actionName, ...handlers) => {
    actions.set(`${groupName}/${actionName}`, handlers)
  }

  const createSubGroup = subGroupName => {
    return createActionGroup(`${groupName}/${subGroupName}`)
  }

  return {
    addAction,
    createSubGroup
  }
}

const get = action => actions.get(action) || null

module.exports = {
  get,
  createActionGroup
}
