import {createStore} from 'effector'

export const isEmpty = value => {
  if (value.length === 0) return 'This field is required'

  return ''
}

export const isNumbers = value => {
  const regexp = /^-?\d+$/

  return regexp.test(event.target.value) || !event.target.value
}

export const formValidation = store => {
  const $isValid = createStore(false)

  $isValid.on(store, (state, fields) => {
    let listFields = []

    for (const {value, error} of Object.values(fields)) {
      listFields.push(Boolean(value.length && !error))
    }

    return listFields.every(item => item)
  })

  return $isValid
}
