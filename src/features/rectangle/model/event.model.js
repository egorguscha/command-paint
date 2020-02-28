import {sample} from 'effector'
import {$rectangleScheme, $rectangleCreator} from './store.model'
import {formsSubmited} from '../../model/event.model'

export const samplledAddRectangle = sample({
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
