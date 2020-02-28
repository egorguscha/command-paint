import * as React from 'react'
import {
  PrimaryButton,
  FormSectionTitle,
  FormSection,
  CustomInput,
  ToggleVisibility,
} from '../../ui'
import {useStore} from 'effector-react'
import {rectangle} from '../../mechanics'

export const CanvasCreating = () => {
  const fields = useStore($canvasScheme)
  const isFormValid = useStore($isCanvasSchemeValid)

  const handleChange = event => {
    if (isNumbers(event.target.value)) {
      prependedHandleInput({event, formName: 'create-canvas'})
    }
    return false
  }

  const handleFocus = event => {
    prependedFocusedInput({event, formName: 'create-canvas'})
  }

  const handleSubmit = event => {
    event.preventDefault()

    createdCanvas([fields.width.value, fields.height.value])
    resetForm()
  }
  return (
    <FormSection onSubmit={handleSubmit}>
      <FormSectionTitle>Canvas</FormSectionTitle>
      {Object.keys(fields).map(prop => (
        <CustomInput
          key={prop}
          label={prop}
          error={fields[prop].error}
          onChange={handleChange}
          coordType={prop}
          value={fields[prop].value}
          onFocus={handleFocus}
        />
      ))}
      <PrimaryButton disabled={!isFormValid}>Create</PrimaryButton>
    </FormSection>
  )
}
