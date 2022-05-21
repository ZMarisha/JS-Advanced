const goods = [
  {title: 'Shirt', price: 200,},
  {title: 'Blouse', price: 300,},
  {title: 'Dress', price: 540,},
  {title: 'Jacket', price: 610,},
];



const renderGoodsItem = ({title = 'Default Name', price = 'Default Price'}) => 
   `
  <div class="card">
    <h3>${title}</h3>
    <p>${price}</p>
  </div>`
;


const renderGoodsList = (list = []) => {
  let goodsList = list.map(item => renderGoodsItem(item)).join('');
  document.querySelector('.goods-list').innerHTML = goodsList;
};

renderGoodsList (goods);






