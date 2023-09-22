<script setup lang="ts">
const props = defineProps({
  label: String,
  placeholder: String,
  id: {
    type: [String, Number],
    required: true
  },
  inputClass: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: [String, Number]
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label class="inline-block mb-2" v-if="props.label" :for="props.id">
      {{ props.label }}
      <span class="text-red-700" v-if="required">*</span>
    </label>
    <div class="">
      <input 
        :type="type"
        :name="props.id" 
        :id="props.id" 
        :placeholder="props.placeholder" 
        :value="modelValue"
        @blur="$emit('update:modelValue', $event.target.value)"
        @keyup.enter="$event.target.blur()"
        class="outline-none box-border block w-full h-9 rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600"
        :class="inputClass"
      >
    </div>
  </div>
</template>