import * as React from 'react'
import {
  PrimaryButton,
  FormSectionTitle,
  FormSection,
  CustomInput,
  ToggleVisibility,
} from '../../ui'
import {useStore} from 'effector-react'
import {
  prependedFocusedInput,
  prependedHandleInput,
  bucketFilled,
} from './model/event.model'
import {resetForm} from '../model/event.model'

export const BucketFilling = () => {
  const {bucketFill} = useStore($sectionVisibility)
  const fields = useStore($bucketFillScheme)
  const isFormValid = useStore($isBucketFillSchemeValid)
  const handleChange = event => {
    if (event.target.value.length <= 1) {
      prependedHandleInput({event, formName: 'bucket-fill'})
    }
  }
  const handleFocus = event => {
    prependedFocusedInput({event, formName: 'bucket-fill'})
  }

  const handleSubmit = event => {
    event.preventDefault()
    bucketFilled(fields.token.value)
    resetForm()
  }

  return (
    <ToggleVisibility isOpen={bucketFill}>
      <FormSection onSubmit={handleSubmit}>
        <FormSectionTitle>Bucket fill</FormSectionTitle>
        {Object.keys(fields).map(coord => (
          <CustomInput
            key={coord}
            label={coord}
            error={fields[coord].error}
            onChange={handleChange}
            coordType={coord}
            value={fields[coord].value}
            onFocus={handleFocus}
          />
        ))}
        <PrimaryButton disabled={!isFormValid}>Add</PrimaryButton>
      </FormSection>
    </ToggleVisibility>
  )
}
