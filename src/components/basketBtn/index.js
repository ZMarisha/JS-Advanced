export default Vue.component('basket-btn', {
  template: 
    `<button class="cart-button" type ="button" @click="$emit('btn')">
      <slot></slot>
    </button>`
})