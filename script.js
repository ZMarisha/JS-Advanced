const PATH = 'http://localhost:8000/'
const GETGoodList = `${PATH}goods.json`;
const GETContentsBasket = `${PATH}BASKET`;


function service(url) {
  return fetch(url).then((res)=>res.json())
};

Vue.component('basket-btn', {
  template: 
    `<button class="cart-button" type ="button" @click="$emit('btn')">
      <slot></slot>
    </button>`
})

Vue.component('custom-input', {
  props: ['value'],
  template: 
  `<div class="search">
    <input class="search__input" type="text" 
      v-bind:value='value' 
      v-on:input="$emit('input', $event.target.value)">
  </div>`
})

Vue.component('goods', {
  props: ['item'],
  template: `<div class="card">
    <h3>{{ item.product_name }}</h3>
    <p>{{ item.price }} ₽</p>
    <basket-btn>Добавить в корзину</basket-btn>
  </div>`
});

const cardBasket = Vue.component('basket', {
  template: 
    `<div class="basket-list">
      <p class="basketText">Корзина</p>
      <div class="basket container">
        <slot></slot>
      </div>
      <img src="image/close.svg" alt="close" @click="$emit('closed')">
      <div class="total">Ваша сумма составляет:sumPrice</div></div>`, // Подскажите пожалуйста, как здесь рассчитать функцию sumPrice? Много информации перечитала, нашла через v-html, но, как я поняла, это грубо. Также пробовала вызывать две функции в одном клике @click="fetchData(); sumPrice()".
});

Vue.component('card-basket', {
  props: ['item'],
  template: `<div class="cardBasket">
  <h3>{{ item.product_name }}</h3>
  <div class="countEl">
  <div class="addElement">
  <basket-btn>-</basket-btn>
  <p>{{ item.count }} шт.</p>
  <basket-btn>+</basket-btn>
  </div>
  <basket-btn class="delete">Удалить</basket-btn>
  </div>
  <p>{{ item.price }} ₽</p>
  </div>`
})

var app = new Vue({
  el: '#root',
  data: {
    items: [],
    serchValue: '',
    isVisibleCart: false,
    word: 'Введите запрос',
  },
  mounted() {
    service(GETGoodList).then((data) => {
      this.items = data;
      return data;
    })
  },
  computed: {
    sumPrice() {
      return this.items.map(a => a.price).reduce((sum, current) => sum + current, 0);
    },
    filterItems() {
        return this.items.filter(({ product_name }) => {
        return product_name.match(new RegExp(this.serchValue, 'gui'))
      })
    },
  },
  methods: {
    fetchData() {
      service(GETContentsBasket).then((result) => {
        this.items = result;
        this.isVisibleCart = true;
      })
    },
    close() {
      this.isVisibleCart = false;
    },
  },
});