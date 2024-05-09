<script setup>
// import { inject } from 'vue';
import CardItem from './CardItem.vue'

defineProps({
  items: Array,
});

const emit = defineEmits(['addToFavorite', 'addToCart'])

// const addToFavorite = inject('addToFavorite')

</script>

<template>
    <div class="grid grid-cols-4 gap-5" v-auto-animate>
        <CardItem 
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :title="item.title" 
        :imgUrl="item.imageUrl" 
        :prise="item.price" 
        :isAdded="item.isAdded"
        :isFavorite="item.isFavorite"
        :onClickAdd="() => emit('addToCart', item)"
        :onClickFavorite="() => emit('addToFavorite', item)"
        />
    </div>
</template>