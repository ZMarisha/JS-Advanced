  const addressAPI = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
  const GETGoodList = `${addressAPI}/catalogData.json`;
  const GETContentsBasket = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json';


  function service(url) {
    return fetch(url).then((res)=>res.json())
  }

class BasketGoods {
  items = [];

  fetchData() {
    service(GETContentsBasket).then((data) => {
      this.items = data.contents;
    })
  }
}

// const list = new GoodsList();

// list.fetchGoods().then((write) => {
//   write = list.render();
// });

// list.fetchGoods(() => {
//   list.sumPrice();
// });


// const basketGoods = new BasketGoods();
// basketGoods.fetchData();

// const newEl = document.querySelector('.cart-button');
// newEl.addEventListener('click', () => {
//   console.log(basketGoods);
// })


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
  }
})