<script setup>
import { onMounted, reactive, watch, ref, provide, computed } from 'vue';
import axios from 'axios'

import HeaderComponent from './components/HeaderComponent.vue'
import CardList from './components/CardList.vue'
import DraverComponent from './components/DraverComponent.vue'

const items = ref([])
const cartItems = ref([])
const isCreatedOrder = ref(false)

const drawerOpen = ref(false)

const totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const handleDrawerOpen = () => {
  drawerOpen.value = !drawerOpen.value
}

const cartButtonDisabled = computed(() => isCreatedOrder.value ? true : totalPrice.value ? false : true)

const onChangeValue = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearch = (event) => {
  filters.searchQuery = event.target.value
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

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

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
      }
      const { data } = await axios.post(`https://84071b17c3fd0acd.mokky.dev/favorites`, obj)
      item.isFavorite = true
      item.favoriteId = data.id
    } else {
      await axios.delete(`https://84071b17c3fd0acd.mokky.dev/favorites/${item.favoriteId}`)
      item.isFavorite = false
      item.favoriteId = null
    }

  } catch (er) {
    console.log(er)
  }
}

const fetchItems = async () => {

  try {
    const params = {
      sortBy: filters.sortBy,
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://84071b17c3fd0acd.mokky.dev/items', {
      params
    });
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
      favoriteId: null,

    }))
  } catch (e) {
    console.log(e)
  }
}

const fetchFavorites = async () => {

  try {

    const { data: favorites } = await axios.get('https://84071b17c3fd0acd.mokky.dev/favorites');
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    });
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  await fetchItems();
  await fetchFavorites();
})
watch(filters, fetchItems)

// provide('addToFavorite', addToFavorite)
provide('handleDrawerOpen', handleDrawerOpen)
provide('cartItems', cartItems)
provide('cartAction', {
  addToCart,
  removeFromCart,
})

</script>

<template>
  <DraverComponent 
    v-if="drawerOpen" 
    :button-disabled = 'cartButtonDisabled'
    :total-price="totalPrice" 
    :vat-price="vatPrice" 
    @create-order="createOrder"/>

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <HeaderComponent :total-price="totalPrice" @handle-drawer-open="handleDrawerOpen" />

    <div class="p-10">

      <div class="flex justify-between">
        <h2 class="text-3xl font-bold mb-8">Все Кросовки</h2>

        <div class="flex gap-4 h-11">
          <select @change="onChangeValue"
            class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none">
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>

          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" />
            <input @input="onChangeSearch" type="text"
              class=" border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400" placeholder="Поиск..." />
          </div>
        </div>

      </div>

      <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="addToCart" />
    </div>
  </div>
</template>

<style scoped></style>
