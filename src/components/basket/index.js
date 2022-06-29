Vue.component('basket', {
  template: 
    `<div class="basket-list">
      <p class="basketText">Корзина</p>
      <div class="basket container">
        <slot></slot>
      </div>
      <img src="image/close.svg" alt="close" @click="$emit('closed')">
      </div>`
});