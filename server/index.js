import { writeFile, readFile } from 'fs/promises'
import express from 'express';
import cors from 'cors';


const GOODS_PATH = './public/goods.json';
const BASKET_PATH = './public/basket_goods.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));


const readBasket = () => 
  readFile(BASKET_PATH, 'utf-8')
  .then((basketFile) => {
    return JSON.parse(basketFile)
  }); 

const readGoods = () => 
  readFile(GOODS_PATH, 'utf-8')
  .then((goodsFile) => {
    return JSON.parse(goodsFile)
  });

function getReformBasket() {
  return Promise.all([
    readBasket(),
    readGoods()
      ]).then(([ basketList, goodsList ]) => {
        const result = basketList.map((basketItem) => {
          const goodsItem = goodsList.find(({id_product: _goodsId}) => {
            return _goodsId === basketItem.id_product
          });
          return {
            ...basketItem,
            ...goodsItem,
            price: goodsItem.price * basketItem.count,
          }
        }) 
      return result
  }) 
}  


app.post('/BASKET', (res, req) => {
  readBasket().then((basket) => {
     const basketEl = basket.find(({id_product: _idProduct}) => _idProduct === res.body.id_product);
     if (!basketEl) {
      basket.push({
        id_product: res.body.id_product,
        count: 1,
      })
     } else {
      basket = basket.map((basketEl) => {
        if (basketEl.id_product === res.body.id_product) {
          return {
            ...basketEl,
            count: basketEl.count + 1,
          }
        } else {
          return basketEl
        }
      })
     }
    return writeFile(BASKET_PATH, JSON.stringify(basket)).then(() => {
     return getReformBasket()}).then((result) => {
      req.send(result)
    })
  })
});

app.delete('/BASKET', (res, req) => {
  readBasket().then((list) => {
    const basketElMinus = list.find(({ id_product: _idElement }) => _idElement === res.body.id_product);
    if ( basketElMinus.count >= 2) {
      list = list.map((basketElMinus) => {
        if (basketElMinus.id_product === res.body.id_product) {
          return {
            ...basketElMinus,
            count: basketElMinus.count - 1,
          }
        } else {
          return basketElMinus
        }
        }) } else {
          list.shift(basketElMinus)
    }
    return writeFile(BASKET_PATH, JSON.stringify(list)).then(() => {
      return getReformBasket()}).then((result) => {
  req.send(result)
    })
  })
})

app.get('/BASKET', (req, res) => {

  getReformBasket().then((result) => {
    res.send(JSON.stringify(result))
  })
});

app.listen('8000', () => {
  console.log('server is starting');
});
