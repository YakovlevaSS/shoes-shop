<script setup>
import axios from 'axios'

import { inject, reactive, onMounted, ref, watch } from 'vue'

import CardList from '../components/CardList.vue'

const { addToCart, removeFromCart } = inject('cartAction')

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const items = ref([])
const cartItems = inject('cartItems')

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeValue = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearch = (event) => {
  filters.searchQuery = event.target.value
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
cartItems.value = JSON.parse(localStorage.getItem('cartItems') || '[]')
await fetchItems();
await fetchFavorites();

items.value = items.value.map((item) => ({
  ...item,
  isAdded: cartItems.value.some((cartItem) => cartItem.id === item.id)
}))
})

watch(cartItems, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)

</script>

<template>
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
                    class=" border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400"
                    placeholder="Поиск..." />
            </div>
        </div>

    </div>

    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
</template>