<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
import CardList from './components/CardList.vue'
import DraverComponent from './components/DraverComponent.vue'
</script>

<template>
  <DraverComponent/>

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <HeaderComponent />

    <div class="p-10">
      <h2 class="text-3xl font-bold mb-8">Все Кросовки</h2>

      <CardList />
    </div>



  </div>
</template>

<style scoped></style>
