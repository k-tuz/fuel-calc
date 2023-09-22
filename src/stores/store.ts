import { defineStore } from 'pinia'
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useFueling } from '@/stores/fueling'
import { useRoutes } from '@/stores/routes'

export const useStore = defineStore('store', () => {
  const fueling = useFueling()
  const routes = useRoutes()

  const isInit = ref(false)

  const topStore = ref({
    name: '',
    fuelPerKm: null,
    odometr: null,
    fuel: null,
    badPath: 50
  })

  const calcFueling = computed(() => {
    let result = 0
    fueling.fueling.forEach(el=>{
      result += el.val ? el.val : 0
    })
    return result ? result : 0
  })

  const calcDistance = computed(() => {
    let result = 0
    routes.routes.forEach(el=>{
      result += el.val ? el.val : 0
    })
    return result ? result : 0
  })
  const calcDistanceBad = computed({
    get() {
      let result = Math.round(calcDistance.value * (topStore.value.badPath/100))
      return result ? result : 0
    },
    set(newValue) {
      let result = (newValue/calcDistance.value)*100
      result = Math.round(result*1000)/1000
      topStore.value.badPath = result ? result : 0
    }
  })

  const goodFuelPerKm = computed(()=>{
    let result = 0
    if(topStore.value.fuelPerKm){
      result = Math.round((topStore.value.fuelPerKm*0.85)*10)/10
    }
    return result ? result : 0
  })

  const fuelUseBad = computed(()=>{
    let result = 0
    let fuelPerKm = topStore.value.fuelPerKm ? topStore.value.fuelPerKm : 0
    let distance = calcDistanceBad.value ? calcDistanceBad.value : 0

    result = fuelPerKm * (distance/100)
    result = Math.round(result)
    return result ? result : 0
  })
  const fuelUseGood = computed(()=>{
    let result = 0
    let fuelPerKm = goodFuelPerKm.value ? goodFuelPerKm.value : 0
    let distance = calcDistance.value ? calcDistance.value - calcDistanceBad.value : 0

    result = fuelPerKm * (distance/100)
    result = Math.round(result)
    return result ? result : 0
  })
  const fuelUse = computed(() => {
    return fuelUseBad.value + fuelUseGood.value
  })
  const fuelEnd = computed(() => {
    let result = 0
    let fueling = calcFueling.value ? calcFueling.value : 0
    let start = topStore.value.fuel ? topStore.value.fuel : 0
    let use = fuelUse.value ? fuelUse.value : 0

    result = fueling + start - use
    result = Math.round(result*100)/100
    return result ? result : 0
  })

  const onInit = function(){
    isInit.value = true
  }

  const onClear = function(){
    for(const key in topStore.value){
      topStore.value[key] = null
    }
    fueling.onClear()
    routes.onClear()
  }

  watch(
    computed(() => {
      return topStore.value.odometr
    }), 
    () => {
      routes.onCalcOdo()
    }
  )
  watch(
    [topStore, ()=>fueling.fueling, ()=>routes.routes],
    ()=>{
      localStorage.setItem('fuelCalc', JSON.stringify({
        topStore: topStore.value,
        fueling: fueling.fueling,
        routes: routes.routes
      }))
    },
    {deep:true}
  )

  let localStore = localStorage.getItem('fuelCalc') ? JSON.parse(localStorage.getItem('fuelCalc')) : {}

  const windowWidth = ref(window.innerWidth)
  const mdBreakPoint = 768

  const handleResize = () => {
      windowWidth.value = window.innerWidth
  }

  onMounted(()=>{
    if(localStore && localStore.topStore){
      topStore.value = localStore.topStore
    }

    window.addEventListener("resize", handleResize);
  })
  onUnmounted(()=>{
    window.removeEventListener("resize", handleResize);
  })

  return { isInit, topStore, calcFueling, calcDistance, fuelUse, fuelEnd, onClear, onInit , localStore, windowWidth, mdBreakPoint, calcDistanceBad, goodFuelPerKm, fuelUseBad, fuelUseGood}
})
