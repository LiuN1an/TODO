import { createStore } from 'vuex'
import { state } from './state/index'
import { actions } from './actions/index'
import { mutations } from './mutations/index'

export default createStore({
  state,
  actions,
  mutations,
})
