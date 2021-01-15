
import {ADD_COUNTER, ADD_TO_CART} from './mutations-types'
export default {
  //修改state中的状态，mutations每个地方完成的事件应该比较单一
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true // 默认为选中状态
    state.cartList.push(payload)
  }
}
