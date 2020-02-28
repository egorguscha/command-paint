import {createStore, merge} from 'effector'
import {formValidation} from '../../../libs/validators'
import {rectangle} from '../../../mechanics'
import {
  formsInputsHandlers,
  formsInputsFocus,
  resetForm,
} from '../../model/event.model'

export const $rectangleScheme = createStore({
  x1: {value: '', error: ''},
  y1: {value: '', error: ''},
  x2: {value: '', error: ''},
  y2: {value: '', error: ''},
})
export const $rectangleCreator = createStore(rectangle)
export const $isRectangleSchemeValid = formValidation($rectangleScheme)

$rectangleScheme
  .on(
    merge([formsInputsHandlers.rectangle, formsInputsFocus.rectangle]),
    (fields, {type, value}) => ({
      ...fields,
      [type]: {...fields[type], value, error: isEmpty(value)},
    }),
  )
  .reset(resetForm)
