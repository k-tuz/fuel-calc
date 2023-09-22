<script setup lang="ts">
import IconCar from './icons/IconCar.vue'
import {useStore} from '../stores/store'

const store = useStore()

function initCalc() {
  store.onInit()
}
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-full px-6">
    <IconCar class="cursor-pointer max-w-full" @click="initCalc" />
    <a href="javascript:;" @click="initCalc" class="font-title mt-12 text-5xl no-underline hover:text-gray-600">Press to start</a>
  </div>
</template>

<style>

</style>