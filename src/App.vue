<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import axios from 'axios'

import HeaderComponent from './components/HeaderComponent.vue'
import CardList from './components/CardList.vue'
// import DraverComponent from './components/DraverComponent.vue'

const items = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://84071b17c3fd0acd.mokky.dev/items');
    console.log(data)
    items.value = data;
  } catch (e) {
    console.log(e)
  }

})

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
