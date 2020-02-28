import {sample} from 'effector'
import {$lineScheme, $lineCreator} from './store.model'
import {formsSubmited} from '../../model/event.model'

export const samplledAddLine = sample({
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
