<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import CardItem from '../components/CardItem.vue';

const item = ref({})
const route = useRoute();
const id = route.params.id

const setItem = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    console.log(cartItems)
    const filteredItem = cartItems.find(item => item.id == id);
    item.value = filteredItem || {};
}

onMounted(() => {
setItem()
})

</script>

<template>
    <h2 class="text-3xl font-bold mb-8">Подробнее {{ id }}</h2>

<CardItem 
        :id="item.id"
        :title="item.title" 
        :imgUrl="item.imageUrl" 
        :prise="item.price" 
        :isAdded="item.isAdded"
        :isFavorite="item.isFavorite"
/> 
</template>