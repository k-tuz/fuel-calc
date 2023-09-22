<script setup lang="ts">
import { ref } from 'vue'
import AppFueling from './AppFueling.vue'
import AppRouting from './AppRouting.vue'

import { useStore } from '../stores/store'

import { useModal } from 'vue-final-modal'
import ModalRangeRoad from './ModalRangeRoad.vue'

const store = useStore()

const tabs = {
  AppFueling,
  AppRouting
}
const currentTab = ref('AppFueling')
const isResult = ref(false)
const result_block = ref(null)

const toggleResult = function(){
  if(isResult.value){
    isResult.value = false
  }else{
    isResult.value = true
    setTimeout(()=>{result_block.value.focus()}, 450)
  }
}
const onBlur = function(){
  setTimeout(()=>{isResult.value = false}, 50)
}

const { open, close } = useModal({
  component: ModalRangeRoad,
  attrs: {
    onConfirm() {
      close()
      isResult.value = true
      setTimeout(()=>{result_block.value.focus()}, 450)
    },
  },
})
</script>
<template>
  <div class="py-1.5 px-3 text-2xl text-center border-b border-elems/50">
    <button 
      type="button" 
      @click="currentTab = 'AppFueling'" 
      :class="{'underline': currentTab == 'AppFueling'}"
    >Заправки</button>
    /
    <button 
      type="button" 
      @click="currentTab = 'AppRouting'"
      :class="{'underline': currentTab == 'AppRouting'}"
    >Маршрути</button>
  </div>
  <KeepAlive>
    <component :is="tabs[currentTab]"></component>
  </KeepAlive>

  <div class="overflow-hidden">
    <Transition>
      <div
        tabindex="-1"
        v-show="isResult"
        class="result_block absolute left-0 bottom-0 w-full p-3 border-t-2 border-elems text-xl"
        :class="{'open':isResult}"
        ref="result_block"
        @blur="onBlur"
      >
        Пройдено:
        <b :class="{'text-red-500': store.calcDistance < 0}">{{store.calcDistance}} км</b>.
        <button type="button" class="underline" @click="() => open()">(Детально)</button>.<br>
        Заправлено:
        <b :class="{'text-red-500': store.calcFueling < 0}">{{store.calcFueling}} л</b>.<br>
        Витрачено палива:
        <b :class="{'text-red-500': store.fuelUse < 0}">{{store.fuelUse}} л</b>.<br>
        Залишок пального:
        <b :class="{'text-red-500': store.fuelEnd < 0}">{{store.fuelEnd}} л</b>.
      </div>
    </Transition>
  </div>

  <button 
    type="button" 
    class="result_btn" 
    :class="{'open':isResult}"
    @click="toggleResult"
  ></button>
</template>
<style>
.result_block{
  background-color: var(--color-bg);
  transform: translateY(100%);
  transition: transform 0.4s ease;
}
.result_block.open{
  transform: translateY(0);
}
.result_btn{
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: var(--color-main);
}
.result_btn::before, .result_btn::after{
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  width: 1rem;
  height: 1px;
  background-color: var(--color-text);
  transition: transform 0.4s ease;
}
.result_btn::after{
  transform: translate(-50%, -3px);
}
.result_btn::before{
  transform: translate(-50%, 2px);
}
.result_btn.open::after{
  transform: translate(-50%, 0px) rotate(180deg);
}
.result_btn.open::before{
  transform: translate(-50%, 0px) rotate(180deg);
}
</style>