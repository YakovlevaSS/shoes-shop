<script setup>
defineProps({
    totalPrice: Number
})
const emit = defineEmits(['handleDrawerOpen'])
</script>

<template>
    <header class="flex justify-between border-b border-state-200 px-10 py-8">

        <router-link to="/">
            <div class="flex items-center gap-4">
                <img src="/logo.png" alt="logo" class="w-10" />
                <div>
                    <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
                    <p class=" text-slate-400">Магазин лучших кросовок</p>
                </div>
            </div>

        </router-link>

        <ul class="flex items-center gap-10 text-slate-400">
            <li @click="() => emit('handleDrawerOpen')" class="flex items-center gap-4 hover:text-black cursor-pointer">
                <img src="/cart.svg" alt="Cart" />
                <span>{{ totalPrice }}</span>
            </li>
            <router-link to="/favorites">
                <li class="flex items-center gap-4 hover:text-black cursor-pointer">
                    <img src="/heart.svg" alt="Cart" />
                    <span>Закладки</span>
                </li>
            </router-link>

            <router-link to="/profile">
                <li class="flex items-center gap-4 hover:text-black cursor-pointer">
                    <img src="/profile.svg" alt="Cart" />
                    <span>Профиль</span>
                </li>
            </router-link>
            <router-link to="/add-new">
                <li class="flex items-center gap-4 hover:text-black cursor-pointer">
                    <img src="/profile.svg" alt="Cart" />
                    <span>Добавить товар</span>
                </li>
            </router-link>
        </ul>

    </header>
</template>