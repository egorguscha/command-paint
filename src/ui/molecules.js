import * as React from 'react'
import {
  CommandPanelWrapper,
  InputWrapper,
  PrimaryLabel,
  ErrorText,
  PrimaryInput,
  FormSectionWrapper,
} from './atoms'

export const ToggleVisibility = ({isOpen, children}) => {
  return isOpen && <div>{children}</div>
}

export const CommandPanel = ({children}) => {
  return <CommandPanelWrapper>{children}</CommandPanelWrapper>
}

export const CustomInput = ({
  label,
  value,
  error,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  frozePlaceholder,
  coordType,
}) => {
  return (
    <InputWrapper>
      {label && <PrimaryLabel>{label}</PrimaryLabel>}
      <PrimaryInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-coord-type={coordType}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <ErrorText>{error}</ErrorText>
    </InputWrapper>
  )
}

export const FormSection = ({onSubmit, children}) => {
  return <FormSectionWrapper onSubmit={onSubmit}>{children}</FormSectionWrapper>
}
