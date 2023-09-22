<script setup lang="ts">
import { useFueling } from "@/stores/fueling";
import { useStore } from '@/stores/store'
import Input from "@/components/Input.vue";

const fueling = useFueling()
const store = useStore()

</script>

<template>
  <div class="app_fueling flex flex-col shrink-0 border-0 md:border-r-2 border-elems">
    <h2 v-if="store.windowWidth >= store.mdBreakPoint" class="font-title text-2xl pl-6 pr-3 py-3 border-b border-elems/50">Заправки</h2>
    <div class="px-3 pb-1.5 md:pl-6 md:pr-3 md:pb-3">
      <Input
        class="pt-1.5 md:pt-3"
        v-for="el in fueling.fueling"
        :key="el.id"
        :id="el.id"
        type="number"
        placeholder="Заправлено"
        v-model.number="el.val"
      />
    </div>

    <div v-if="store.windowWidth >= store.mdBreakPoint" class="mt-auto border-t-2 border-elems p-3">
      Заправлено: <b>{{store.calcFueling}} л</b>.
    </div>
  </div>
</template>

<style scoped>
.app_fueling{
  width: 100%;
}
@media screen and (min-width: 768px) {
  .app_fueling{
    width: calc( ((100% - 7.5rem) / 4) + 2.25rem );
  }  
}
</style>