const goods = [
  {title: 'Shirt', price: 200,},
  {title: 'Blouse', price: 300,},
  {title: 'Dress', price: 540,},
  {title: 'Jacket', price: 610,},
  ];
  
  const addressAPI = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
  const GETGoodList = `${addressAPI}/catalogData.json`;
  const GETContentsBasket = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json';

  function service(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url );
    xhr.send();
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const a = JSON.parse(xhr.responseText);
        callback(JSON.parse(xhr.response))
        console.log(a);
      }
    }
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
  
  fetchGoods(callback) {
    service(GETGoodList, (data) => {
      this.items = data;
      callback();
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
    service(GETContentsBasket, (data) => {
      this.items = data.contents;
    })
  }
}

const list = new GoodsList();

list.fetchGoods(() => {
  list.render();
});

list.fetchGoods(() => {
  list.sumPrice();
});


const basketGoods = new BasketGoods();
basketGoods.fetchData();
// const newEl = document.querySelector('.cart-button');
// newEl.addEventListener('click', () => {
//   console.log(basketGoods);
// })
