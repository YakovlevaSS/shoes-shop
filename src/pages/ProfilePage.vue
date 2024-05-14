<script setup>
import { ref, computed } from 'vue';

const itemsInfo = ref([
    { id: 1, lable: 'Sofia', purchased: false },
    { id: 2, lable: 'Iakovleva', purchased: true },
    { id: 3, lable: '27.11.1995', purchased: true },
])

const newItem = ref('')
const newItemPriority = ref('low')
const checkDo = ref('false')
const editing = ref(false)
const iceCream = ref([])
const characterCount = computed(() => {
    return newItem.value.length
})
const saveItem = () => {
    itemsInfo.value.push({ id: itemsInfo.value.length + 1, lable: newItem.value })
    newItem.value = ''
}
const doEdite = (e) => {
    editing.value = e;
    newItem.value = ''
}
</script>

<template>
    <div>
        <h2 class="text-3xl font-bold mb-8">Мои профиль</h2>
        <button @click="doEdite(false)" v-if="editing" class=" bg-orange-400 border-spacing-7 p-2">Cancel</button>
        <button @click="doEdite(true)" v-else class=" bg-orange-400 border-spacing-7 p-2">Add Item</button>
    </div>

    <form @submit.prevent="saveItem" v-if="editing">
        <input v-model="newItem" type="text" placeholder="Add info">
        <label class=" mt-2">
            <input type="checkbox" v-model="checkDo">
            Done
        </label>
        <button :disabled="newItem.length === 0" class=" bg-orange-400 border-spacing-7 p-2">
            save info
        </button>
    </form>
    <p>
        {{ characterCount }}/200
    </p>
    <!-- Priority:
    <label>
        <input type="radio" v-model="newItemPriority" value="low">
        Low
    </label>
    <label>
        <input type="radio" v-model="newItemPriority" value="high">
        High
    </label>
    <br/>
    {{ newItemPriority }} -->

    <div class=" mt-2">
        <label>
            <input type="checkbox" v-model="iceCream" value="Chocolate">
            Chocolate
        </label>
        <label>
            <input type="checkbox" v-model="iceCream" value="Vanilla">
            Vanilla
        </label>
        <label>
            <input type="checkbox" v-model="iceCream" value="Strawberry">
            Strawberry
        </label>
        {{ iceCream }}
    </div>


    <label class=" mt-2">
        Priority:
        <select v-model="newItemPriority">
            <option value="low">
                Low
            </option>
            <option value="high">
                High
            </option>
        </select>
    </label>
    <br />



    <ul class=" mt-2">
        <li :key="item.id" v-for="item in itemsInfo">
            {{ item.lable }}
        </li>
    </ul>

    <ul class=" mt-2">
        <li 
          :key="id" v-for="({ id, lable, purchased }, index) in itemsInfo"
          :class="{'text-amber-500': purchased}"
          >
            {{ index + 1 }} {{ lable }}
        </li>
    </ul>

    <p v-if="!itemsInfo.length">
        Nothing Items
    </p>


</template>