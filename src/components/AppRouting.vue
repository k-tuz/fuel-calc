<script setup lang="ts">
import { useRoutes } from '@/stores/routes'
import { useStore } from '@/stores/store'
import Input from '@/components/Input.vue'

import { useModal } from 'vue-final-modal'
import ModalRangeRoad from '@/components/ModalRangeRoad.vue'

const routes = useRoutes()
const store = useStore()

const onDelete = function(id){
  routes.removeRoutes(id)
} 

const { open, close } = useModal({
  component: ModalRangeRoad,
  attrs: {
    onConfirm() {
      close()
    },
  },
})

</script>

<template>
  <div class="w-full flex flex-col">
    <h2 v-if="store.windowWidth >= store.mdBreakPoint" class="font-title text-2xl pl-3 pr-6 py-3 border-b border-elems/50">Маршрути</h2>

    <div class="px-3 md:pl-3 md:pr-6 pb-1.5 md:pb-3">
      <div class="pt-1.5 md:pt-3 grid grid-cols-3 gap-1.5 md:gap-6" 
        v-for="(el, i) in routes.routes"
        :key="el.id"
        :id="el.id"
      >
        <Input
          class=""
          :id="el.id+'date'"
          type="date"
          placeholder="Дата"
          v-model="el.date"
        />
        <Input
          class=""
          :id="el.id+'odo'"
          type="number"
          :inputClass="el.odo < 0 ? 'ring-red-300 focus:ring-red-600':''"
          placeholder="Одометр"
          v-model.number="el.odo"
          @change="el.last = 'odo'"
        />
        <div class="flex items-center">
          <Input
            class="w-full"
            :id="el.id+'val'"
            type="number"
            :inputClass="el.val < 0 ? 'ring-red-300 focus:ring-red-600':''"
            placeholder="Пройдено"
            v-model.number="el.val"
            @change="el.last = 'dist'"
          />
          <button 
            v-show="i != routes.routes.length-1" 
            @click="onDelete(el.id)"
            type="button" 
            class="route__delete_icon shrink-0 ml-2"></button>
        </div>
      </div>
    </div>
    
    <div v-if="store.windowWidth >= store.mdBreakPoint" class="mt-auto border-t-2 border-elems p-3">
      Пройдено: 
      <b :class="{'text-red-500': store.calcDistance < 0}">{{store.calcDistance}} км</b>.
      <button type="button" class="underline" @click="() => open()">(Детально)</button>. 
      Витрачено палива: 
      <b :class="{'text-red-500': store.fuelUse < 0}">{{store.fuelUse}} л</b>. 
      Залишок пального: 
      <b :class="{'text-red-500': store.fuelEnd < 0}">{{store.fuelEnd}} л</b>.
    </div>
  </div>
</template>

<style>
.route__delete_icon{
  position: relative;
  display: inline-block;
  font-size: 0;
  color: var(--color-text);
  border: 2px solid currentColor;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  transition: color 0.4s;
}
.route__delete_icon:before{
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  background-color: currentColor;
  height: 2px;
  width: 1rem;
}
.route__delete_icon:hover{
  color: var(--color-red);
}
</style>