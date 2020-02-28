import * as React from 'react'
import {
  PrimaryButton,
  FormSectionTitle,
  FormSection,
  CustomInput,
  ToggleVisibility,
} from '../../ui'
import {useStore} from 'effector-react'
import {line} from '../../mechanics'

export const DrawLine = () => {
  const {line} = useStore($sectionVisibility)
  const fields = useStore($lineScheme)
  const isFormValid = useStore($isLineSchemeValid)
  const handleChange = event => {
    if (isNumbers(event.target.value)) {
      prependedHandleInput({event, formName: 'draw-line'})
    }
  }
  const handleFocus = event => {
    prependedFocusedInput({event, formName: 'draw-line'})
  }
  const handleSubmit = event => {
    event.preventDefault()
    submitedForm({formName: 'draw-line'})
    resetForm()
  }

  return (
    <ToggleVisibility isOpen={line}>
      <FormSection onSubmit={handleSubmit}>
        <FormSectionTitle>Line</FormSectionTitle>
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
