const GETGoodList = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
const GETContentsBasket = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json';


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
    <p>{{ item.price }}</p>
  </div>`
});

Vue.component('basket', {
  template: 
    `<div class="basket-list">
      <div class="basket">
        <slot></slot>
      </div>
      <img src="image/close.svg" alt="close" @click="$emit('closed')">
      <div class="total">Ваша сумма составляет:</div></div>`, // Подскажите пожалуйста, как здесь рассчитать функцию sumPrice? Много информации перечитала, нашла через v-html, но, как я поняла, это грубо. Также пробовала вызывать две функции в одном клике @click="fetchData(); sumPrice()".
});

Vue.component('card-basket', {
  props: ['item'],
  template: `<div class="card">
  <h3>{{ item.product_name }}</h3>
  <p>{{ item.price }}</p>
</div>`
});

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
      service(GETContentsBasket).then((data) => {
        this.items = data.contents;
        this.isVisibleCart = true;
      })
    },
    close() {
      this.isVisibleCart = false;
    },
  },
});