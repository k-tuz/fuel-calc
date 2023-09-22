<script setup lang="ts">
import {useStore} from './stores/store'
import { ModalsContainer } from 'vue-final-modal'
import Header from "./components/Header.vue"
import AppInit from "./components/AppInit.vue"
import PressStart from "./components/PressStart.vue"

const store = useStore()

</script>

<template>
  <Header />

  <main class="main">
    <component :is="!store.isInit ? PressStart : AppInit"></component>
  </main>

  <ModalsContainer />
</template>

<style>
.main{
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
