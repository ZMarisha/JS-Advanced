import './style/style.css';
import './components/basketBtn';
import './components/customInput';
import './components/goods';
import './components/basket';
import './components/cardBasket';
import {PATH, GETGoodList, GETContentsBasket} from './constants'
import {service, serviceWithBody} from './services';



var app = new Vue({
  el: '#root',
  data: {
    items: [],
    serchValue: '',
    isVisibleCart: false,
    word: 'Введите запрос',
    basketGoodsItems: [],
  },
  mounted() {
    service(GETGoodList).then((data) => {
      this.items = data;
      return data;
    })
  },
  computed: {
    sumPrice() {
      const sum = this.filterItems.map(a => a.price).reduce((sum, current) => sum + current, 0);
      return sum
    },
    filterItems() {
      return this.items.filter(({ product_name }) => {
        return product_name.match(new RegExp(this.serchValue, 'gui'))
      })
    },
  },
  methods: {
    fetchData() {
      service(GETContentsBasket).then((resultBasket) => {
        this.basketGoodsItems = resultBasket;
        this.isVisibleCart = true;
      })
    },
    
    close() {
      this.isVisibleCart = false;
    },
    addgood(id_product) {
      serviceWithBody(GETContentsBasket, "POST", {
        id_product}).then((data) => {
          this.basketGoodsItems = data;
        })
    },
    minusGoods(id_product) {
      serviceWithBody(GETContentsBasket, "DELETE", {
        id_product}).then((list) => {
          this.basketGoodsItems = list;
        })
    },
    addgoods(goodId) {
      serviceWithBody(GETContentsBasket, "POST", {
        id_product: goodId})
    }
  },
});