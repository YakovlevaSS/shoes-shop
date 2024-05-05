<script setup>
import CardItem from './CardItem.vue'

const onClickAdd = () => {
    alert('1')
}
defineProps({
  items: Array
});
</script>

<template>
    <div class="grid grid-cols-4 gap-5">
        <CardItem 
        v-for="item in items"
        :key="item.id"
        :title="item.title" 
        :imgUrl="item.imageUrl" 
        :prise="item.price" 
        :isAdded="item.isAdded"
        :isFavorite="item.isFavorite"
        :onClickAdd="onClickAdd"
        />
    </div>
</template>