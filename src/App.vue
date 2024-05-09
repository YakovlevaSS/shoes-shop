<script setup>
import { watch, ref, provide, computed } from 'vue';
import axios from 'axios'

import HeaderComponent from './components/HeaderComponent.vue'
import DraverComponent from './components/DraverComponent.vue'

const cartItems = ref([])
const isCreatedOrder = ref(false)

const drawerOpen = ref(false)

const totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const handleDrawerOpen = () => {
  drawerOpen.value = !drawerOpen.value
}

const cartButtonDisabled = computed(() => isCreatedOrder.value ? true : totalPrice.value ? false : true)

const addToCart = (item) => {
  cartItems.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1)
  item.isAdded = false
}

const createOrder = async () => {
  try {
    isCreatedOrder.value = true
    const { data } = await axios.post(`https://84071b17c3fd0acd.mokky.dev/orders`, {
      items: cartItems.value,
      totalPrice: totalPrice.value,
    })

    cartItems.value = []

    return data
  } catch (er) {
    console.log(er)
  } finally {
    isCreatedOrder.value = false
  }
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
  <DraverComponent v-if="drawerOpen" :button-disabled='cartButtonDisabled' :total-price="totalPrice"
    :vat-price="vatPrice" @create-order="createOrder" />

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <HeaderComponent :total-price="totalPrice" @handle-drawer-open="handleDrawerOpen" />

    <div class="p-10">
      <router-view/>
    </div>
  </div>
</template>

<style scoped></style>
