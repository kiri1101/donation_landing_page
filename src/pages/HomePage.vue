<template>
  <div class="grid h-full gap-2 px-2 py-1 transition-all duration-300 ease-in-out md:grid-cols-2 md:px-10 md:py-5">
    <div class="md:bg-gradient-to-b from-red-400/80 from-20% via-red-300/80 via-40% to-transparent to-90% rounded px-5">
      <div class="flex justify-between place-items-center">
        <div class="flex rounded-full place-content-center w-14 h-14 bg-slate-100/80 md:bg-transparent">
          <img alt="Quasar logo" src="~assets/swaa-litoral-logo.png" class="w-14 h-14 md:w-16 md:h-16" />
        </div>

        <div class="flex w-8 h-8 rounded-lg place-content-center bg-slate-100/80 md:bg-transparent">
          <LanguageSelector />
        </div>
      </div>

      <div class="grid h-full grid-rows-frame-auto">
        <p class="mx-0 mt-10 text-3xl font-bold tracking-wide text-center text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl xl:mx-5"
          v-text="t('home.title1')"></p>

        <div class="h-24">
          <PrimaryButton v-if="form.user.type === '1'" @click.prevent="form.updateUserType('0')"
            class="grid w-full h-10 mx-auto">
            <span v-text="t('form.button.donate')"></span>
          </PrimaryButton>

          <PrimaryButton v-else @click.prevent="form.updateUserType('1')" class="grid w-full h-10 mx-auto">
            <span v-text="t('form.button.promise')"></span>
          </PrimaryButton>
        </div>
      </div>
    </div>

    <div>
      <DonationForm class="mb-10 md:my-14" />

      <div class="max-w-2xl mx-auto">
        <Splide :options="options" aria-label="Home page captions">
          <SplideSlide>
            <img alt="Quasar logo" src="~assets/swaa-litoral.jpeg" class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
          </SplideSlide>

          <SplideSlide>
            <img alt="Quasar logo" src="~assets/sidaction.jpeg" class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
          </SplideSlide>

          <SplideSlide>
            <img alt="Quasar logo" src="~assets/solidariter.jpeg" class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
          </SplideSlide>

          <SplideSlide>
            <img alt="Quasar logo" src="~assets/cnls.jpeg" class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
          </SplideSlide>

          <SplideSlide>
            <img alt="Quasar logo" src="~assets/fondation-france.jpeg"
              class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
          </SplideSlide>
        </Splide>
      </div>
    </div>
  </div>
</template>

<script setup>
import DonationForm from "src/components/DonationForm.vue";
import LanguageSelector from "src/components/LanguageSelector.vue";
import PrimaryButton from "src/components/PrimaryButton.vue";
import "@splidejs/vue-splide/css";
import "@splidejs/vue-splide/css/skyblue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { useI18n } from "vue-i18n";
import { useDonationStore } from "src/stores/donation.js";

const { t } = useI18n({ useScope: "global" });

const form = useDonationStore();

const options = {
  type: "loop",
  autoplay: true,
  interval: 3000,
  pauseOnHover: true,
  arrows: false,
  pagination: true,
  rewind: true,
  perPage: 4,
  perMove: 1,
  pagination: false,
  breakpoints: {
    520: {
      padding: "5%",
    },
    768: {
      padding: "10%",
    },
    1280: {
      padding: "5%",
    },
    1580: {
      padding: "5%",
    },
  },
};
</script>

<style lang="scss" scoped>
// .hero {
//   background-image: url("../assets/hero.jpeg");
// }
</style>
tif
