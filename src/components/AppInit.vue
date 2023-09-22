<script setup lang="ts">
import {useStore} from '@/stores/store'
import AppTop from "@/components/AppTop.vue"
import AppFueling from "@/components/AppFueling.vue"
import AppRouting from "@/components/AppRouting.vue"
import AppTabs from '@/components/AppTabs.vue'

const store = useStore()

function initCalc() {
  store.onInit()
}
</script>

<template>
  <div class="flex flex-col min-h-full">
    <AppTop />
    <AppTabs v-if="store.windowWidth < store.mdBreakPoint"/>
    <div v-else class="grow flex">
      <AppFueling />
      <AppRouting />
    </div>
  </div>
</template>

<style>

</style>