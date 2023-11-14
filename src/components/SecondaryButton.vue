<script setup>
defineProps({
  type: {
    type: String,
    default: "button",
  },
});
</script>

<template>
  <button
    :type="type"
    class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-gray-100 uppercase transition duration-150 ease-in-out bg-gray-800 dark:bg-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-600 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-25"
  >
    <slot />
  </button>
</template>
