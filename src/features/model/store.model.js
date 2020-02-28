import {createStore, sample} from 'effector'
import {shape} from '../../mechanics'
import {createdCanvas} from '../canvas/model/event.model'
import {samplledAddRectangle} from '../rectangle/model/event.model'
import {samplledAddLine} from '../line/model/event.model'
import {bucketFilled} from '../bucket-fill/model/event.model'

export const $shapeCreator = createStore(shape)
export const $shapeCollection = createStore({collection: [], bucketFill: ''})
export const $instanceOfShape = createStore(null)
export const $canvas = createStore(null)

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
