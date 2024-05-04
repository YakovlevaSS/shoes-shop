<script setup>
import CardItem from './CardItem.vue'
const onClickAdd = () => {
    alert('1')
}
</script>

<template>
    <div class="grid grid-cols-4 gap-5">
        <CardItem 
        title="кросовки" 
        imgUrl="/sneakers/sneakers-1.jpg" 
        :prise="5000" 
        :isAdded="true"
        :isFavorite="true"
        :onClickAdd="onClickAdd"
        />
        <CardItem />
        <CardItem />
        <CardItem />
    </div>
</template>