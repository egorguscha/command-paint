import {createStore} from 'effector'
import {showSection} from './event.model'

export const $sectionVisibility = createStore({
  line: false,
  rectangle: false,
  bucketFill: false,
})

$sectionVisibility.on(showSection, (state, section) => ({
  ...state,
  [section]: !state[section],
}))
