<script setup lang="ts">
import { ref, computed } from "vue"
import { useStore } from "../stores/store";
import Input from "./Input.vue";

const store = useStore()

const iData = {
  name: {
    id: 'top-name',
    label: 'Назва Т.З.',
    placeholder: 'Fiat'
  },
  fuelPerKm: {
    id: 'top-fuel-per-km',
    label: 'Витрата палива',
    placeholder: 'л на 100 км'
  },
  odometr: {
    id: 'top-odometr',
    label: 'Старт. одометра',
    placeholder: 'км'
  },
  fuel: {
    id: 'top-fuel',
    label: 'Старт. паливо',
    placeholder: 'л'
  }
}
const isOpen = ref(true)

const fuelPerKmLabel = computed(()=>{
  let placeholder = iData.fuelPerKm.label
  if(store.goodFuelPerKm) placeholder += `(-15%: ${store.goodFuelPerKm})`
  return placeholder
})
</script>

<template>
  <div class="border-b-2 border-elems px-3 md:px-6 py-1.5 md:py-3">
    <div 
      class="overflow-hidden grid md:grid-cols-4 gap-1.5 md:gap-6 transition-all duration-500"
      :style="{'max-height': isOpen ? '100vh' : '0'}"
    >
      <Input
        :id="iData.name.id"
        :label="iData.name.label"
        :placeholder="iData.name.placeholder"
        v-model="store.topStore.name"
      />
      <Input
        :id="iData.fuelPerKm.id"
        :label="fuelPerKmLabel"
        :placeholder="iData.fuelPerKm.placeholder"
        type="number"
        :inputClass="store.topStore.fuelPerKm < 0 ? 'ring-red-300 focus:ring-red-600':''"
        :required="true"
        v-model.number="store.topStore.fuelPerKm"
      />
      <Input
        :id="iData.odometr.id"
        :label="iData.odometr.label"
        :placeholder="iData.odometr.placeholder"
        type="number"
        :inputClass="store.topStore.odometr < 0 ? 'ring-red-300 focus:ring-red-600':''"
        :required="true"
        v-model.number="store.topStore.odometr"
      />
      <Input
        :id="iData.fuel.id"
        :label="iData.fuel.label"
        :placeholder="iData.fuel.placeholder"
        type="number"
        :inputClass="store.topStore.fuel < 0 ? 'ring-red-300 focus:ring-red-600':''"
        :required="true"
        v-model.number="store.topStore.fuel"
      />
    </div>
    <button 
      type="button" 
      class="top_btn" 
      :class="{'open':isOpen}"
      @click="isOpen = !isOpen"
      v-if="store.windowWidth < store.mdBreakPoint"
    ></button>
  </div>
</template>
<style>
.top_btn{
  position: relative;
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.25rem auto;
  border-radius: 50%;
  background-color: var(--color-main);
}
.top_btn::before, .top_btn::after{
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  width: 1rem;
  height: 1px;
  background-color: var(--color-text);
  transition: transform 0.5s ease;
}
.top_btn::after{
  transform: translate(-50%, 0) rotate(-90deg);
}
.top_btn::before{
  transform: translate(-50%, 0) rotate(-180deg);
}
.top_btn.open::before,
.top_btn.open::after{
  transform: translate(-50%, 0px) rotate(0);
}
</style>