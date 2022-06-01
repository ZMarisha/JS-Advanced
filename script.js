const goods = [
  {title: 'Shirt', price: 200,},
  {title: 'Blouse', price: 300,},
  {title: 'Dress', price: 540,},
  {title: 'Jacket', price: 610,},
  ];
  
  const addressAPI = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
  const GETGoodList = `${addressAPI}/catalogData.json`;
  const GETContentsBasket = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json';

  function service(url) {
    return fetch(url).then((res)=>res.json())
  }
class GoodsItem {
  constructor({product_name, price}) {
  this.product_name = product_name;
  this.price = price;
  }
  render() {
    return `
    <div class="card">
      <h3>${this.product_name}</h3>
      <p>${this.price}</p>
    </div>`;
  }
};
class GoodsList {
  items = [];
  
  fetchGoods() {
    return service(GETGoodList).then((data) => {
      this.items = data;
    })
  }
 
  sumPrice() {
    return this.items.map(a => a.price).reduce((sum, current) => sum + current, 0);
  }
 
  render() {
    const goods = this.items.map(item => {
      const goodItem = new GoodsItem(item);
      return goodItem.render()
    }).join('');
  
    document.querySelector('.goods-list').innerHTML = goods;
  };
  
};

class BasketGoods {
  items = [];

  fetchData() {
    service(GETContentsBasket).then((data) => {
      this.items = data.contents;
    })
  }
}

const list = new GoodsList();

list.fetchGoods().then((write) => {
  write = list.render();
});

list.fetchGoods(() => {
  list.sumPrice();
});


const basketGoods = new BasketGoods();
basketGoods.fetchData();

const newEl = document.querySelector('.cart-button');
newEl.addEventListener('click', () => {
  console.log(basketGoods);
})
