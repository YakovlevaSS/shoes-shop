<script setup>
import { onMounted } from 'vue';
import axios from 'axios'

import HeaderComponent from './components/HeaderComponent.vue'
import CardList from './components/CardList.vue'
// import DraverComponent from './components/DraverComponent.vue'

const items = ref([])

onMounted(async () => {
  try {
    const { data } = axios.get('');
    items.value = data;
  } catch (e) {
    console.log(e)
  }

})

const items = [
  {
    "id": 1,
    "title": "Мужские Кроссовки Nike Blazer Mid Suede",
    "price": 12999,
    "imageUrl": "/sneakers/sneakers-1.jpg",
    "isFavorite": true,
    "favoriteId": 3,
    "isAdded": false
  },
  {
    "id": 2,
    "title": "Мужские Кроссовки Nike Air Max 270",
    "price": 15600,
    "imageUrl": "/sneakers/sneakers-2.jpg",
    "isFavorite": true,
    "favoriteId": 1,
    "isAdded": false
  },
  {
    "id": 3,
    "title": "Мужские Кроссовки Nike Blazer Mid Suede",
    "price": 8499,
    "imageUrl": "/sneakers/sneakers-3.jpg",
    "isFavorite": true,
    "favoriteId": 2,
    "isAdded": false
  },
  {
    "id": 4,
    "title": "Кроссовки Puma X Aka Boku Future Rider",
    "price": 7800,
    "imageUrl": "/sneakers/sneakers-4.jpg",
    "isFavorite": false,
    "favoriteId": null,
    "isAdded": false
  },
  {
    "id": 5,
    "title": "Кроссовки Future Rider",
    "price": 9550,
    "imageUrl": "/sneakers/sneakers-5.jpg",
    "isFavorite": false,
    "favoriteId": null,
    "isAdded": false
  },
  {
    "id": 6,
    "title": "Кроссовки Black Edition",
    "price": 16999,
    "imageUrl": "/sneakers/sneakers-6.jpg",
    "isFavorite": false,
    "favoriteId": null,
    "isAdded": false
  },
  {
    "id": 7,
    "title": "Кроссовки Orange Boomb Edition",
    "price": 7499,
    "imageUrl": "/sneakers/sneakers-7.jpg",
    "isFavorite": false,
    "favoriteId": null,
    "isAdded": false
  },
  {
    "id": 8,
    "title": "Кроссовки Nike Air Max 270",
    "price": 15600,
    "imageUrl": "/sneakers/sneakers-8.jpg",
    "isFavorite": false,
    "favoriteId": null,
    "isAdded": false
  },
  {
    "id": 9,
    "title": "Кроссовки Nike Air Force 1",
    "price": 5900,
    "imageUrl": "/sneakers/sneakers-9.jpg",
    "isFavorite": false,
    "favoriteId": null,
    "isAdded": false
  },
  {
    "id": 10,
    "title": "Кроссовки Adidas Ultraboost",
    "price": 11500,
    "imageUrl": "/sneakers/sneakers-10.jpg",
    "isFavorite": false,
    "favoriteId": null,
    "isAdded": false
  },
  {
    "id": 11,
    "title": "Кроссовки Puma Clyde All-Pro",
    "price": 7600,
    "imageUrl": "/sneakers/sneakers-11.jpg",
    "isFavorite": false,
    "favoriteId": null,
    "isAdded": false
  },
  {
    "id": 12,
    "title": "Кроссовки Converse Chuck Taylor All-Star",
    "price": 13000,
    "imageUrl": "/sneakers/sneakers-12.jpg",
    "isFavorite": false,
    "favoriteId": null,
    "isAdded": false
  }
]
</script>

<template>
  <!-- <DraverComponent /> -->

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <HeaderComponent />

    <div class="p-10">

      <div class="flex justify-between">
        <h2 class="text-3xl font-bold mb-8">Все Кросовки</h2>

        <div class="flex gap-4 h-11">
          <select class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none">
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="price">По цене (дорогие)</option>
          </select>

          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" />
            <input type="text" class=" border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400"
              placeholder="Поиск..." />
          </div>
        </div>

      </div>

      <CardList :items="items" />
    </div>
  </div>
</template>

<style scoped></style>
