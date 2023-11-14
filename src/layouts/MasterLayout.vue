<template>
  <div class="h-screen bg-red-500 overflow-auto">
    <div class="grid grid-rows-frame-auto h-full bg-topography_light rounded-br-full max-w-screen-2xl mx-auto">
      <main>
        <router-view />
      </main>

      <Footer />
    </div>
  </div>
</template>

<script setup>
import Footer from "src/components/HomeFooter.vue";
</script>

<style lang="scss" scoped></style>
