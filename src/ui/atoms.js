import styled from 'styled-components'

export const Canvas = styled.div`
  display: grid;
  grid-template-columns: repeat(${({width}) => width && width}, 1fr);
  grid-template-rows: repeat(${({height}) => height && height}, 1fr);
  background: #fff;
`
export const CanvasWrapper = styled.div``
export const PrimaryButton = styled.button`
  background: var(--primary-black);
  color: #fff;
  padding: 0 25px;
  height: 35px;
  border-radius: 20px;
  transition: 0.2s;
  box-shadow: -1px 3px 9px rgba(0, 0, 0, 0.5);

  &:hover {
    cursor: pointer;
    background: var(--primary-black-hover);
  }
  &:active {
    box-shadow: none;
    background: var(--primary-black);
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background: var(--disabled);
    box-shadow: none;
    cursor: default;
  }
`
export const PrimaryInput = styled.input`
  border: 1px solid var(--primary-black);
  height: 35px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: 0.2s;
  &:focus {
    border-color: var(--primary-blue);
  }
`
export const ErrorText = styled.div`
  color: red;
  font-size: var(--font-size-14);
`

export const PrimaryLabel = styled.label``
export const InputWrapper = styled.div`
  display: grid;
  grid-row-gap: 7px;
`
export const FormSectionWrapper = styled.form`
  display: grid;
  grid-row-gap: 10px;
  padding: 30px 0;
`

export const Title = styled.span`
  font-size: var(--font-size-20);
`
export const FormSectionTitle = styled(Title)`
  margin: 0 0 15px 0;
  display: block;
`

export const CommandPanelWrapper = styled.div`
  padding: 20px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #c0c0c0;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 15px;
  justify-content: left;
`

export const SidePanel = styled.aside`
  padding: 30px 15px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
`
export const CanvasSpace = styled.div`
  background: #c0c0c0;
  padding: 15px;
  box-sizing: border-box;
  overflow: auto;
`
export const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 370px 1fr;
  height: 100%;
`
