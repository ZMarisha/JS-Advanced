export default Vue.component('card-basket', {
  props: ['item'],
  template: `<div class="cardBasket">
  <h3>{{ item.product_name }}</h3>
  <div class="countEl">
  <div class="addElement">
  <button @click="$emit('minus', item.id_product)">-</button>
  <p>{{ item.count }} шт.</p>
  <button @click="$emit('add', item.id_product)">+</button>
  </div>
  </div>
  <p>{{ item.price }} ₽</p>
  </div>`
})

