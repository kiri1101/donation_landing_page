<script setup>
import { onMounted, ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  min: {
    type: String,
    default: "0",
  },
  number: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);

const input = ref(null);

onMounted(() => {
  if (input.value.hasAttribute("autofocus")) {
    input.value.focus();
  }
});

defineExpose({ focus: () => input.value.focus() });

const minValue = computed(() => {
  return props.number === true ? props.min : "";
});
</script>

<template>
  <input
    class="mt-1 px-2 text-sm font-semibold border-transparent rounded-sm shadow-lg focus:border-red-500 focus:ring-red-500 h-9"
    :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" ref="input" :min="minValue"
    :disabled="disable" />
</template>
