class GoodsItem {
  constructor(title, price) {
  this.title = title;
  this.price = price;
  }
  render() {
  return `<div
  class="card"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
  }
class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
    {title: 'Shirt', price: 200,},
    {title: 'Blouse', price: 300,},
    {title: 'Dress', price: 540,},
    {title: 'Jacket', price: 610,},
    ];
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
    const goodItem = new GoodsItem(good.title, good.price);
    listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  };
  sumPrice() {
    const goodItem2 = this.goods.map(a => a.price).reduce((sum, current) => sum + current, 0);
    return console.log(`Сумма товаров ${goodItem2} рублей`);
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.sumPrice();


    
    
  
  
  






