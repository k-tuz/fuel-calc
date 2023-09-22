import { defineStore } from 'pinia'
import { useStore } from './store'
import { onMounted, ref, watch } from 'vue'

export const useRoutes = defineStore('routes', ()=>{
  const store = useStore()

  const routes = ref([])

  const addRoutes = function() {
    routes.value.push({
      id: +new Date,
      date: null,
      odo: null,
      val: null,
      last: 'dist'
    })
  }
  const removeRoutes = function(id) {
    const idx = routes.value.findIndex(el => el.id == id)
    if(idx != -1) routes.value.splice(idx, 1)
  }

  const onCalcOdo = function() {
    let odo = store.topStore.odometr ? store.topStore.odometr : 0

    routes.value.forEach((el, i)=>{
      const odometr = i == 0 ? odo : routes.value[i-1].odo ? routes.value[i-1].odo : 0

      if(el.last == 'odo'){
        if(el.odo) el.val = el.odo - odometr
        else if(el.val) el.odo = odometr + el.val
      }else if(el.last == 'dist'){
        if(el.val) el.odo = odometr + el.val
        else if(el.odo) el.val = el.odo - odometr
      }else{
        el.val = null
        el.odo = null
      }
    })
  }

  watch(routes, () => {
    if(routes.value[routes.value.length-1].val || routes.value[routes.value.length-1].odo) addRoutes()

    onCalcOdo()
  }, {deep:true})

  const onClear = function(){
    routes.value.splice(0)
    addRoutes()
  }

  onMounted(()=>{
    if(store.localStore && store.localStore.routes)
    routes.value = store.localStore.routes
    else addRoutes()
  })

  return { routes, removeRoutes, onCalcOdo, onClear }
})