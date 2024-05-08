<script setup>
import { inject } from 'vue';
import DraverCardItem from './DraverCardItem.vue';

const cartItems = inject('cartItems')
const { removeFromCart } = inject('cartAction')
</script>

<template>
  <div class="flex flex-col gap-4">
    <DraverCardItem v-for="item in cartItems" 
      :key="item.id" 
      :id="item.id"
      :title="item.title" 
      :imgUrl="item.imageUrl" 
      :prise="item.price"
      @on-click-remove="() => removeFromCart(item)"  />
  </div>
</template>