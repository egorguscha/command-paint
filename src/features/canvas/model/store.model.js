import {createStore} from 'effector'
import {shape} from '../../../mechanics'
import {formValidation, isEmpty} from '../../../libs/validators'
import {
  formsInputsHandlers,
  formsInputsFocus,
  resetForm,
} from '../../model/event.model'
import {createdCanvas} from './event.model'

export const $canvasOptions = createStore([0, 0])
export const $canvasScheme = createStore({
  width: {value: '', error: ''},
  height: {value: '', error: ''},
})
export const $isCanvasSchemeValid = formValidation($canvasScheme)

$canvasScheme
  .on(
    merge([formsInputsHandlers.canvas, formsInputsFocus.canvas]),
    (fields, {type, value}) => ({
      ...fields,
      [type]: {...fields[type], value, error: isEmpty(value)},
    }),
  )
  .reset(resetForm)

$canvasOptions.on(createdCanvas, (_, value) => value)
