import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import CardReducer from './Card'
import PanelReducer from './Panel'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  cards: CardReducer,
  panels: PanelReducer
})

export default createRootReducer

