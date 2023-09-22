<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { useStore } from '@/stores/store'

const store = useStore()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-bg border-2 border-elems rounded-lg space-y-2"
  >
    <h1 class="text-xl">
      По поганим дорогам: <span class="text-gray-500">({{store.topStore.badPath}}%)</span>
    </h1>
    <input type="range" min="0" max="100" step="1" v-model="store.topStore.badPath"> 
    <div class="flex items-center whitespace-nowrap">
      <input 
        v-model="store.calcDistanceBad"
        type="number" 
        name="for-range" 
        id="for-range" 
        class="w-5/12 outline-none box-border block h-9 rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600"
      />
      <span class="w-3/12 pl-2"> + {{store.calcDistance - store.calcDistanceBad}}</span>
      <span class="w-4/12 pl-2"> = {{store.calcDistance}} км</span>
    </div>
    <div class="">
      Витрачено за поганим: {{ store.fuelUseBad }} л<br>
      Витрачено за хорошим: {{ store.fuelUseGood }} л<br>
      Витрачено всього: {{store.fuelUse}} л
    </div>
    
    <button class="mt-1 ml-auto px-2 border rounded-lg bg-main" @click="emit('confirm')">
      Зберегти
    </button>
  </VueFinalModal>
</template>