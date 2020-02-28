import {createStore, merge} from 'effector'
import {formValidation, isEmpty} from '../../../libs/validators'
import {
  formsInputsHandlers,
  formsInputsFocus,
  resetForm,
} from '../../model/event.model'
import {line} from '../../../mechanics'

export const $lineScheme = createStore({
  x1: {value: '', error: ''},
  y1: {value: '', error: ''},
  x2: {value: '', error: ''},
  y2: {value: '', error: ''},
})
export const $lineCreator = createStore(line)
export const $isLineSchemeValid = formValidation($lineScheme)

$lineScheme
  .on(
    merge([formsInputsHandlers.line, formsInputsFocus.line]),
    (fields, {type, value}) => ({
      ...fields,
      [type]: {...fields[type], value, error: isEmpty(value)},
    }),
  )
  .reset(resetForm)
