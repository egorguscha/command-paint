import * as React from 'react'
import {render} from 'react-dom'
import {GlobalStyle} from './global-style'
import {
  CommandPanel,
  Canvas,
  CanvasWrapper,
  CanvasSpace,
  PrimaryInput,
  PrimaryButton,
  PrimaryLabel,
  AppContainer,
  SidePanel,
  FormSectionTitle,
  FormSectionWrapper,
  Title,
  FormSection,
  CustomInput,
} from './ui'
import {createStore, createEvent, split, merge, sample, combine} from 'effector'
import {useStore} from 'effector-react'
import {line, rectangle, shape} from './mechanics'

const root = document.getElementById('root')

// validators
const isEmpty = value => {
  if (value.length === 0) return 'This field is required'
  return ''
}

const isNumbers = value => {
  const regexp = /^-?\d+$/

  return regexp.test(event.target.value) || !event.target.value
}
const formValidation = store => {
  const $isValid = createStore(false)

  $isValid.on(store, (state, fields) => {
    let listFields = []

    for (const {value, error} of Object.values(fields)) {
      listFields.push(Boolean(value.length && !error))
    }

    return listFields.every(item => item)
  })

  return $isValid
}

//events

const showSection = createEvent('show tool')
const handleInput = createEvent('handle input')
const focusedInput = createEvent('focused input')
const submitedForm = createEvent('submitted form')
const createdCanvas = createEvent('created canvas')
const bucketFilled = createEvent('bucket filled')
const resetForm = createEvent('reset form')
const prependedHandleInput = handleInput.prepend(({event, formName}) => ({
  formName,
  value: event.target.value,
  type: event.target.getAttribute('data-coord-type'),
}))
const formsInputsHandlers = split(handleInput, {
  line: ({formName}) => formName === 'draw-line',
  rectangle: ({formName}) => formName === 'draw-rectangle',
  canvas: ({formName}) => formName === 'create-canvas',
  bucketFill: ({formName}) => formName === 'bucket-fill',
})
const prependedFocusedInput = focusedInput.prepend(({event, formName}) => ({
  formName,
  value: event.target.value,
  type: event.target.getAttribute('data-coord-type'),
}))

const formsInputsFocus = split(focusedInput, {
  line: ({formName}) => formName === 'draw-line',
  rectangle: ({formName}) => formName === 'draw-rectangle',
  canvas: ({formName}) => formName === 'create-canvas',
  bucketFill: ({formName}) => formName === 'bucket-fill',
})
const prependedSubmitedForm = submitedForm.prepend(({formName}) => {
  formName
})
const formsSubmited = split(submitedForm, {
  line: ({formName}) => formName === 'draw-line',
  rectangle: ({formName}) => formName === 'draw-rectangle',
  canvas: ({formName}) => formName === 'create-canvas',
  bucketFill: ({formName}) => formName === 'bucket-fill',
})

// stores

const $sectionVisibility = createStore({
  line: false,
  rectangle: false,
  bucketFill: false,
})
const $lineScheme = createStore({
  x1: {value: '', error: ''},
  y1: {value: '', error: ''},
  x2: {value: '', error: ''},
  y2: {value: '', error: ''},
})
const $rectangleScheme = createStore({
  x1: {value: '', error: ''},
  y1: {value: '', error: ''},
  x2: {value: '', error: ''},
  y2: {value: '', error: ''},
})
const $canvasScheme = createStore({
  width: {value: '', error: ''},
  height: {value: '', error: ''},
})
const $bucketFillScheme = createStore({
  token: {value: '', error: ''},
  x: {value: '', error: ''},
  y: {value: '', error: ''},
})
const $lineCreator = createStore(line)
const $rectangleCreator = createStore(rectangle)
const $shapeCreator = createStore(shape)
const $shapeCollection = createStore({collection: [], bucketFill: ''})
const $instanceOfShape = createStore(null)
const $canvas = createStore(null)
const $canvasOptions = createStore([0, 0])

const $isCanvasSchemeValid = formValidation($canvasScheme)
const $isLineSchemeValid = formValidation($lineScheme)
const $isRectangleSchemeValid = formValidation($rectangleScheme)
const $isBucketFillSchemeValid = formValidation($bucketFillScheme)

$sectionVisibility.on(showSection, (state, section) => ({
  ...state,
  [section]: !state[section],
}))

$lineScheme
  .on(
    merge([formsInputsHandlers.line, formsInputsFocus.line]),
    (fields, {type, value}) => ({
      ...fields,
      [type]: {...fields[type], value, error: isEmpty(value)},
    }),
  )
  .reset(resetForm)

$canvasScheme
  .on(
    merge([formsInputsHandlers.canvas, formsInputsFocus.canvas]),
    (fields, {type, value}) => ({
      ...fields,
      [type]: {...fields[type], value, error: isEmpty(value)},
    }),
  )
  .reset(resetForm)
$bucketFillScheme
  .on(
    merge([formsInputsHandlers.bucketFill, formsInputsFocus.bucketFill]),
    (fields, {type, value}) => ({
      ...fields,
      [type]: {...fields[type], value, error: isEmpty(value)},
    }),
  )
  .reset(resetForm)
$rectangleScheme
  .on(
    merge([formsInputsHandlers.rectangle, formsInputsFocus.rectangle]),
    (fields, {type, value}) => ({
      ...fields,
      [type]: {...fields[type], value, error: isEmpty(value)},
    }),
  )
  .reset(resetForm)

const samplledAddLine = sample({
  source: {points: $lineScheme, line: $lineCreator},
  clock: formsSubmited.line,
  fn: ({points, line}) => {
    for (const point in points) {
      points = {...points}
      points[point] = parseInt(points[point].value, 10)
    }

    return line(points)
  },
})
const samplledAddRectangle = sample({
  source: {points: $rectangleScheme, rectangle: $rectangleCreator},
  clock: formsSubmited.rectangle,
  fn: ({points, rectangle}) => {
    for (const point in points) {
      points = {...points}
      points[point] = parseInt(points[point].value, 10)
    }

    return rectangle(points)
  },
})

sample({
  source: $shapeCreator,
  clock: createdCanvas,
  fn: (shape, [x, y]) => shape(x, y),
  target: $instanceOfShape,
})

sample({
  source: $instanceOfShape,
  clock: $shapeCollection,
  fn: (shape, {collection, bucketFill}) =>
    shape.paint(collection, {bucketFill}),
  target: $canvas,
})

$shapeCollection
  .on(createdCanvas, state => ({
    collection: [],
  }))
  .on(samplledAddLine, (state, points) => ({
    ...state,
    collection: [...state.collection, points],
  }))
  .on(samplledAddRectangle, (state, points) => ({
    ...state,
    collection: [...state.collection, points],
  }))
  .on(bucketFilled, (state, bucketFill) => ({...state, bucketFill}))
$canvasOptions.on(createdCanvas, (_, value) => value)

const ToggleVisibility = ({isOpen, children}) => {
  return isOpen && <div>{children}</div>
}

const DrawLine = () => {
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
const DrawRectangle = () => {
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
const BucketFill = () => {
  const {bucketFill} = useStore($sectionVisibility)
  const fields = useStore($bucketFillScheme)
  const isFormValid = useStore($isBucketFillSchemeValid)
  const handleChange = event => {
    const token = event.target.getAttribute('data-coord-type') === 'token'

    if (isNumbers(event.target.value) && !token) {
      prependedHandleInput({event, formName: 'bucket-fill'})
    } else if (token && event.target.value.length <= 1) {
      prependedHandleInput({event, formName: 'bucket-fill'})
    }
  }
  const handleFocus = event => {
    prependedFocusedInput({event, formName: 'bucket-fill'})
  }

  const handleSubmit = event => {
    event.preventDefault()
    bucketFilled({
      token: fields.token.value,
      coords: [fields.x.value, fields.y.value],
    })
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

const CanvasCreating = () => {
  const fields = useStore($canvasScheme)
  const isFormValid = useStore($isCanvasSchemeValid)

  const handleChange = event => {
    if (isNumbers(event.target.value)) {
      prependedHandleInput({event, formName: 'create-canvas'})
    }
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

const App = () => {
  const canvas = useStore($canvas)
  const [width, height] = useStore($canvasOptions)
  const isVisible = useStore($sectionVisibility)

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <SidePanel>
          {canvas ? (
            <>
              <CommandPanel>
                <PrimaryButton onClick={() => showSection('line')}>
                  Line
                </PrimaryButton>
                <PrimaryButton onClick={() => showSection('rectangle')}>
                  Rectangle
                </PrimaryButton>
              </CommandPanel>
              <CommandPanel>
                <PrimaryButton onClick={() => showSection('bucketFill')}>
                  Bucket fill
                </PrimaryButton>
              </CommandPanel>
              <DrawLine />
              <DrawRectangle />
              <BucketFill />
            </>
          ) : (
            <CanvasCreating />
          )}
        </SidePanel>
        <CanvasSpace>
          <Canvas
            width={width}
            height={height}
            dangerouslySetInnerHTML={{__html: canvas}}
          />
        </CanvasSpace>
      </AppContainer>
    </>
  )
}

render(<App />, root)
