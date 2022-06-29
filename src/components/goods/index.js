export default Vue.component('goods', {
  props: ['item'],
  template: `<div class="card">
    <h3>{{ item.product_name }}</h3>
    <p>{{ item.price }} ₽</p>
    <button @click="$emit('addelement', item.id_product)">Добавить в корзину</button>
  </div>`
});