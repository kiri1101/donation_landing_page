<template>
  <div
    class="grid h-auto max-w-2xl p-10 mx-auto translate-y-5 rounded-lg shadow-md md:max-w-lg bg-gray-800/80 shadow-gray-900">
    <div class="flex h-8 gap-2 bg-red-500 rounded-md shadow-md cursor-pointer place-content-center shadow-red-900/90">
      <img src="~assets/donation-of-money-charity-fund-32.png" alt="Donation" class="w-5 h-5" />

      <span v-if="form.user.type === '0'" class="font-bold text-gray-200 uppercase"
        v-text="t('form.title.donation')"></span>

      <span v-else class="font-bold text-gray-200 uppercase" v-text="t('form.title.promise')"></span>
    </div>

    <ul class="flex items-center justify-center gap-1 my-4 text-lg">
      <li :class="{
        'transition duration-150 ease-in-out cursor-pointer px-2.5 py-0.5 rounded-full': true,
        'bg-red-500 hover:bg-red-400 text-white': form.step === 1,
        'bg-stone-200 hover:bg-stone-100 text-gray-900': form.step !== 1,
      }">
        1
      </li>

      <li class="h-0.5 w-12 bg-gray-200"></li>

      <li :class="{
        'transition duration-150 ease-in-out cursor-pointer px-2.5 py-0.5 rounded-full': true,
        'bg-red-500 hover:bg-red-400 text-white': form.step === 2,
        'bg-stone-200 hover:bg-stone-100 text-gray-500': form.step !== 2,
      }">
        2
      </li>

      <li class="h-0.5 w-12 bg-gray-200"></li>

      <li :class="{
        'transition duration-150 ease-in-out cursor-pointer px-2.5 py-0.5 rounded-full': true,
        'bg-red-500 hover:bg-red-400 text-white': form.step === 3,
        'bg-stone-200 hover:bg-stone-100 text-gray-500': form.step !== 3,
      }">
        3
      </li>
    </ul>

    <form v-if="form.step === 1" id="formLayout" class="space-y-6">
      <div id="name-block">
        <InputLabel for="name" :value="t('form.label.name')" />

        <TextInput id="name" type="text" :class="{
          'mt-1 block w-full': true,
        }" v-model="form.user.username" required autofocus autocomplete="name" />
      </div>

      <div id="phone-block">
        <InputLabel for="phone" :value="t('form.label.phone')" />

        <vue-tel-input v-model="form.user.phoneNumber" mode="international" :class="{
          'font-semibold h-9': true,
        }" @country-changed="countryChanged"></vue-tel-input>
      </div>

      <div id="email-block">
        <InputLabel for="email" :value="t('form.label.email')" />

        <TextInput id="email" type="email" :class="{
          'mt-1 block w-full': true,
        }" v-model="form.user.mail" autocomplete="email" />
      </div>

      <div id="amount-block">
        <InputLabel for="amount" :value="t('form.label.amount')" />

        <TextInput id="amount" type="number" :class="{
          'mt-1 block w-full': true,
        }" v-model="form.user.amount" autocomplete="amount" :number="true" min="0" />
      </div>
    </form>

    <form v-if="form.step === 2">
      <ul class="flex justify-center gap-6 mt-4">
        <li @click.prevent="chosenPayment(payment)" v-for="(payment, index) in Call.fees.value" :key="index" :class="{
          'grid justify-start rounded-lg w-32 border border-red-500 px-3 py-2 space-y-1 hover:shadow-inner hover:shadow-red-500 cursor-pointer transition-all duration-300 ease-in-out': true,
          'bg-red-300': payment.meanCode === form.pay.meanCode,
        }">
          <img :src="`/payments/${form.imageSource(payment)}`" :alt="form.paymentLabel(payment)" class="h-6 w-7" />

          <p class="text-xs text-white">
            {{ form.paymentLabel(payment) }}
          </p>
        </li>
      </ul>

      <div class="mt-14">
        <InputLabel for="phone" :value="t('form.label.phone')" />

        <vue-tel-input v-model="form.pay.paymentNumber" mode="international" :onlyCountries="option"
          :disabled="form.isPhoneInputDisabled" class="font-semibold h-9"></vue-tel-input>
      </div>
    </form>

    <form v-if="form.step === 3">
      <div v-if="form.isPaymentConfirmed">
        <p class="my-4 text-2xl text-center text-gray-200 capitalize">
          Payment Succesful 😁
        </p>

        <TickQ />

        <p class="my-4 text-2xl text-center text-gray-200 capitalize">
          Thank you for contributing to our course.
        </p>
      </div>

      <div v-else>
        <p class="my-4 text-2xl text-center text-gray-200 capitalize">
          Payment Initiated
        </p>

        <Countdown :deadlineISO="timeOut" :showDays="false" :showHours="false" @timeElapsed="timesUp" labelColor="#fff"
          mainColor="#fff" />

        <Circle />
      </div>
    </form>

    <div v-if="form.step !== 3" class="grid mt-6">
      <template v-if="Call.isLoading.value">
        <InfinityLoader class="h-12" />
      </template>

      <template v-else>
        <PrimaryButton v-if="form.step === 1" @click.prevent="submit" class="w-full mt-2 h-9">
          <span v-text="t('form.button.step1')"></span>
        </PrimaryButton>

        <PrimaryButton v-if="form.step === 2" @click.prevent="donate" class="w-full mt-2 h-9">
          <span v-text="t('form.button.step2')"></span>
        </PrimaryButton>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useDonationStore } from "src/stores/donation.js";
import { useEnvStore } from "src/stores/env.js";
import InputLabel from "src/components/InputLabel.vue";
import TextInput from "src/components/TextInput.vue";
import PrimaryButton from "src/components/PrimaryButton.vue";
import InfinityLoader from "src/components/InfintyLoader.vue";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import Toast from "src/mixins/notify.js";
import Call from "src/mixins/calls";
import { Countdown } from "vue3-flip-countdown";
import TickQ from "src/components/SVG/TickQ.vue";
import Circle from "src/components/Animation/CirclesQ.vue";

onBeforeMount(() => {
  if (
    route.params.id !== undefined &&
    Call.isPromiseValid(route.params.id, env.paramStart, env.paramEnd)
  ) {
    loadForm(route.params.id);
  }

  if (
    Object.keys(route.query).length > 0 &&
    Object.keys(route.query).includes("adpFootprint")
  ) {
    Call.status(`${env.BASE_URI}/${env.API_CHECK_CARD_STATUS_KEY}`, {
      adpFootPrint: route.query.adpFootPrint,
    });
  }
});

const route = useRoute();

const form = useDonationStore();

const env = useEnvStore();

const { t } = useI18n({ useScope: "global" });

const option = ["CM"];

const timeOut = computed(() => {
  let currentDate = new Date();

  let futureDate = new Date(currentDate.getTime() + `${env.PAYMENT_TIMEOUT}` * 1000);

  return futureDate.toLocaleString();
});

const loadForm = (id) => {
  if (env.DONATE_KEY === id) {
    return form.updateUserType("0");
  }
  if (env.PROMISE_KEY === id) {
    return form.updateUserType("1");
  }

  return Call.promiseInfo(`${env.BASE_URI}/${env.API_PROMISE_INFO_KEY}`, {
    userCode: id,
  });
};

const timesUp = () => {
  console.log("Time is up");
};

const countryChanged = (arg) => (form.user.phoneCode = arg.dialCode);

const chosenPayment = (arg) => {
  form.pay.meanCode = arg.meanCode;

  if (arg.meanCode === "MASTERCARD" || arg.meanCode === "VISA") {
    form.disablePhoneInput();

    form.pay.paymentNumber = form.user.phoneNumber;

    Call.donate(`${env.BASE_URI}/${env.API_PAYMENT_INIT_KEY}`, form.pay);
  }
};

const submit = () => {
  Call.onLoad();

  let url =
    form.user.userCode.length > 0
      ? env.API_UPDATE_DONATION_KEY
      : env.API_CREATE_DONATION_KEY;

  form.user.phoneNumber = form.user.phoneNumber.replace("+237 ", "");

  form.user.phoneNumber = form.user.phoneNumber.split(" ").join("");

  form.pay.resPhone = form.user.phoneNumber.split(" ").join("");

  Call.storePromise(`${env.BASE_URI}/${url}`, form.user);
};

const donate = () => {
  Call.onLoad();

  form.pay.paymentNumber = form.pay.paymentNumber.replace("+237 ", "");

  form.pay.paymentNumber = form.pay.paymentNumber.split(" ").join("");

  Call.donate(`${env.BASE_URI}/${env.API_PAYMENT_INIT_KEY}`, form.pay);
};

watch(Call.fees, (newVal) => {
  if (route.params.id !== env.PROMISE_KEY) {
    form.updateStep(2);
  } else {
    Toast.exe({
      type: "success",
      title: "Success",
      message: "Promise saved",
    });
  }
});

watch(Call.isAlert, (newVal) => {
  if (newVal) {
    Call.alerts.value.forEach((alert) => Toast.info(t(alert)));
  }
});
</script>
