export default Vue.component('custom-input', {
  props: ['value'],
  template: 
  `<div class="search">
    <input class="search__input" type="text" 
      v-bind:value='value' 
      v-on:input="$emit('input', $event.target.value)">
  </div>`
})