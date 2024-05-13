<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
    id: Number,
    imgUrl: String,
    prise: Number,
    title: String,
    isFavorite: Boolean,
    isAdded: Boolean,
    onClickAdd: Function,
    onClickFavorite: Function,
    isFavoritesPage: Boolean
});
const router = useRouter();

const navigateToSneakerPage = () => {
    router.push({ name: 'Sneaker', params: { id: props.id } });
};
</script>

<template>
    <div class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
        @click="navigateToSneakerPage">
        <img v-if="onClickFavorite" @click.stop="onClickFavorite" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
            alt="Like 1" class=" absolute top-0 left-0" />


        <img :src="imgUrl" alt="Sneaker" />
        <p class="mt-2">{{ title }}</p>

        <div class="flex justify-between mt-5">
            <div class="flex flex-col">
                <span class="text-state-400">Цена:</span>
                <span>{{ prise }} руб.</span>
            </div>
            <img v-if="onClickAdd" @click.stop="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus" />
        </div>
    </div>
</template>