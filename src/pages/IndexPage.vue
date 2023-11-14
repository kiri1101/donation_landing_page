<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px" />

    <!-- <p class="text-2xl text-red-500">This is a test run</p> -->
    <p class="text-2xl text-red-500">{{ t("success") }}</p>
  </q-page>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
