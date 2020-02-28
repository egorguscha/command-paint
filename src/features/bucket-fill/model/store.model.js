import {createStore} from 'effector'
import {formValidation, isEmpty} from '../../../libs/validators'
import {
  formsInputsHandlers,
  formsInputsFocus,
  resetForm,
} from '../../model/event.model'

export const $bucketFillScheme = createStore({
  token: {value: '', error: ''},
})
export const $isBucketFillSchemeValid = formValidation($bucketFillScheme)

$bucketFillScheme
  .on(
    merge([formsInputsHandlers.bucketFill, formsInputsFocus.bucketFill]),
    (fields, {type, value}) => ({
      ...fields,
      [type]: {...fields[type], value, error: isEmpty(value)},
    }),
  )
  .reset(resetForm)
