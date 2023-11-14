<template>
  <footer class="m-4 rounded-lg shadow bg-gray-900/90">
    <div class="w-full max-w-screen-xl p-4 mx-auto md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-100 sm:text-center">
        © {{ date.getFullYear() }}
        <a href="#" class="hover:underline"> {{ env.APP_NAME }}™ </a>.
        {{ t("footer.copyright") }}.
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-100 sm:mt-0">
        <li class="flex items-center">
          <a href="#" class="hover:underline me-4 md:me-6">
            <i class="transition-all duration-200 ease-in-out fa-brands fa-facebook-f fa-xl hover:scale-110"></i>
          </a>
        </li>
        <li class="flex items-center">
          <a href="#" class="hover:underline me-4 md:me-6">
            <i class="transition-all duration-200 ease-in-out fa-brands fa-twitter fa-xl hover:scale-110"></i>
          </a>
        </li>
        <li class="flex items-center">
          <a href="#" class="hover:underline me-4 md:me-6">
            <i class="transition-all duration-200 ease-in-out fa-brands fa-instagram fa-xl hover:scale-110"></i>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useEnvStore } from "src/stores/env.js";

const env = useEnvStore();

const { t } = useI18n();

const date = ref(new Date());
</script>
