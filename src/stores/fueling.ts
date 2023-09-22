import { defineStore } from 'pinia'
import { useStore } from '@/stores/store'
import { onMounted, ref, watch } from 'vue'


export const useFueling = defineStore('fueling', ()=>{
  const store = useStore()
  
  const fueling = ref([])
  
  const addFueling = function(){
    fueling.value.push({
      id: +new Date,
      val: null
    })
  }
  const removeFueling = function(id){
    const idx = fueling.value.findIndex(el => el.id == id)
    if(idx != -1) fueling.value.splice(idx, 1)
  }

  watch(fueling, () => {
    if(fueling.value[fueling.value.length-1].val) addFueling()

    fueling.value.forEach((el, i) => {
      if(!el.val && i != fueling.value.length-1) removeFueling(el.id)
    })
  },{deep:true})

  const onClear = function(){
    fueling.value.splice(0)
    addFueling()
  }

  onMounted(()=>{
    if(store.localStore && store.localStore.fueling)
      fueling.value = store.localStore.fueling
    else addFueling()
  })

  return { fueling, onClear }
}) 