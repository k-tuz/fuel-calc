<script setup lang="ts">
import IconCrane from '@/components/icons/IconCrane.vue'
import IconTrash from '@/components/icons/IconTrash.vue'

import { useStore } from '@/stores/store'

const store = useStore()

</script>

<template>
  <header class="header px-6 pt-0.5">
    <div class="inline-block font-title relative top-2 text-5xl">
      Fuel Calc
      <IconCrane class="logo_icon" />
    </div>
    <button 
      type="button"
      class="ml-auto self-center cursor-pointer"
      @click="store.onClear()"
    >
      <IconTrash class="w-6 h-6 transition-colors hover:fill-red-500"/>
    </button>
  </header>
</template>

<style>
.header{
  display: inline-flex;
  background-color: var(--color-main);
}
.logo_icon{
  position: absolute;
  top: 8px;
  left: calc(100% + 5px);
}
</style>