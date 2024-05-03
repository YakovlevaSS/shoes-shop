<script setup>
import CardItem from './CardItem.vue'
</script>

<template>
    <div class="grid grid-cols-4 gap-5">
        <CardItem  title="кросовки" imgUrl="/sneakers/sneakers-1.jpg" :prise="5000"/>
        <CardItem />
        <CardItem />
        <CardItem />
    </div>
</template>