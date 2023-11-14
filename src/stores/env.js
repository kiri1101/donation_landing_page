import { defineStore } from 'pinia';

export const useEnvStore = defineStore('env', {
  state: () => ({
    APP_NAME: 'SWAA',
    BASE_URI: '/v1/API/SWAA/sd-api',
    API_CREATE_DONATION_KEY: 'createPromeseDons',
    API_UPDATE_DONATION_KEY: 'updatePromeseDons',
    API_PAYMENT_INIT_KEY: 'initiatePayment',
    API_CHECK_STATUS_KEY: 'transactionGetStatus',
    API_CHECK_CARD_STATUS_KEY: 'cardPaymentStatus',
    API_PROMISE_INFO_KEY: 'infoPromeseDons',
    DONATE_KEY: 'YH1IJ',
    PROMISE_KEY: 'YH0IJ',
    paramLength: 14,
    paramStart: 'YH',
    paramEnd: 'IJ',
    FORM_RESET_TIMEOUT: 10000,
    PAYMENT_TIMEOUT: 240,
  })
});
