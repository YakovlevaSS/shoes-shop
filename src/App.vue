<script setup>
import { watch, ref, provide, computed } from 'vue';

import HeaderComponent from './components/HeaderComponent.vue'
import DraverComponent from './components/DraverComponent.vue'

const cartItems = ref([])

const drawerOpen = ref(false)

const totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const handleDrawerOpen = () => {
  drawerOpen.value = !drawerOpen.value
}

const addToCart = (item) => {
  cartItems.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1)
  item.isAdded = false
}

watch(cartItems, () => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
},
  { deep: true }
)

// provide('addToFavorite', addToFavorite)
provide('handleDrawerOpen', handleDrawerOpen)
provide('cartItems', cartItems)
provide('cartAction', {
  addToCart,
  removeFromCart,
})

</script>

<template>
  <DraverComponent v-if="drawerOpen" :total-price="totalPrice"
    :vat-price="vatPrice" />

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <HeaderComponent :total-price="totalPrice" @handle-drawer-open="handleDrawerOpen" />

    <div class="p-10">
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>
