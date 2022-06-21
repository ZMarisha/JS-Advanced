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

app.get('/BASKET', (req, res) => {

  Promise.all([
  readBasket(),
  readGoods()
    ]).then(([ basketList, goodsList ]) => {
      return basketList.map((basketItem) => {
        const goodsItem = goodsList.find(({id_product: _goodsId}) => {
          return _goodsId === basketItem.id_product
        });
        return {
          ...basketItem,
          ...goodsItem
        }
      })
  }).then((result) => {
    res.send(JSON.stringify(result))
  })
}) 

  

app.listen('8000', () => {
  console.log('server is starting');
});


