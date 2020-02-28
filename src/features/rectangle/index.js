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

export const DrawRectangle = () => {
  const {rectangle} = useStore($sectionVisibility)
  const fields = useStore($rectangleScheme)
  const isFormValid = useStore($isRectangleSchemeValid)
  const handleChange = event => {
    if (isNumbers(event.target.value)) {
      prependedHandleInput({event, formName: 'draw-rectangle'})
    }
  }
  const handleFocus = event => {
    prependedFocusedInput({event, formName: 'draw-rectangle'})
  }
  const handleSubmit = event => {
    event.preventDefault()
    submitedForm({formName: 'draw-rectangle'})
    resetForm()
  }

  return (
    <ToggleVisibility isOpen={rectangle}>
      <FormSection onSubmit={handleSubmit}>
        <FormSectionTitle>Rectangle</FormSectionTitle>
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
