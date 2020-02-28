import {createEvent, split, prepend} from 'effector'

export const handleInput = createEvent('handle input')
export const focusedInput = createEvent('focused input')
export const submitedForm = createEvent('submitted form')
export const resetForm = createEvent('reset form')
export const prependedHandleInput = handleInput.prepend(
  ({event, formName}) => ({
    formName,
    value: event.target.value,
    type: event.target.getAttribute('data-coord-type'),
  }),
)
export const formsInputsHandlers = split(handleInput, {
  line: ({formName}) => formName === 'draw-line',
  rectangle: ({formName}) => formName === 'draw-rectangle',
  canvas: ({formName}) => formName === 'create-canvas',
  bucketFill: ({formName}) => formName === 'bucket-fill',
})
export const prependedFocusedInput = focusedInput.prepend(
  ({event, formName}) => ({
    formName,
    value: event.target.value,
    type: event.target.getAttribute('data-coord-type'),
  }),
)

export const formsInputsFocus = split(focusedInput, {
  line: ({formName}) => formName === 'draw-line',
  rectangle: ({formName}) => formName === 'draw-rectangle',
  canvas: ({formName}) => formName === 'create-canvas',
  bucketFill: ({formName}) => formName === 'bucket-fill',
})
export const prependedSubmitedForm = submitedForm.prepend(({formName}) => {
  formName
})
export const formsSubmited = split(submitedForm, {
  line: ({formName}) => formName === 'draw-line',
  rectangle: ({formName}) => formName === 'draw-rectangle',
  canvas: ({formName}) => formName === 'create-canvas',
  bucketFill: ({formName}) => formName === 'bucket-fill',
})
