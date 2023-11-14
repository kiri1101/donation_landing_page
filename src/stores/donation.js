import { defineStore } from 'pinia';

export const useDonationStore = defineStore('donation', {
  state: () => ({
    step: 1,
    isPaymentConfirmed: false,
    isPhoneInputDisabled: false,
    user: {
      userCode: "",
      username: "",
      type: "0",
      phoneCode: "",
      phoneNumber: "",
      mail: "",
      amount: "",
      adminCode: "SWAA",
    },
    pay: {
      meanCode: "",
      paymentNumber: "",
      resPhone: "",
      resEmail: "",
      listPaymentID: [],
      deviceToken: "",
    },
    status: {
      orderNumber: "",
      adpFootPrint: "",
    }
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    updateStep(arg) {
      this.step = arg;
    },
    updateUserType(arg) {
      this.user.type = arg;
    },
    paymentInProgress() {
      this.isPaymentConfirmed = false;
    },
    paymentSuccessful() {
      this.isPaymentConfirmed = true;
    },
    enablePhoneInput() {
      this.isPhoneInputDisabled = false;
    },
    disablePhoneInput() {
      this.isPhoneInputDisabled = true;
    },
    updateUser(arg) {
      this.user.userCode = arg.code;
      this.user.username = arg.fullName;
      this.user.type = arg.typeCode;
      this.user.phoneCode = arg.phoneCode;
      this.user.phoneNumber = `+${arg.phoneCode} ${arg.phoneNumber}`;
      this.user.mail = arg.email;
      this.user.amount = arg.amount.toString();
    },
    imageSource(payment) {
      if (payment.meanCode === "MOBILE-MONEY") {
        return "mtn-logo.png";
      }
      if (payment.meanCode === "ORANGE-MONEY") {
        return "om-logo.png";
      }
      if (payment.meanCode === "EXPRESS-UNION") {
        return "eum-logo.png";
      }
      if (payment.meanCode === "YOOMEE-MONEY") {
        return "yoomee.jpg";
      }
      if (payment.meanCode === "VISA") {
        return "visa-logo.png";
      }
      if (payment.meanCode === "MASTERCARD") {
        return "mastercard-logo.png";
      }
    },
    paymentLabel(payment) {
      if (payment.meanCode === "MOBILE-MONEY") {
        return "Mobile Money";
      }
      if (payment.meanCode === "ORANGE-MONEY") {
        return "Orange Money";
      }
      if (payment.meanCode === "EXPRESS-UNION") {
        return "Express Union";
      }
      if (payment.meanCode === "YOOMEE-MONEY") {
        return "Yoomee Money";
      }
      if (payment.meanCode === "VISA") {
        return "Visa";
      }
      if (payment.meanCode === "MASTERCARD") {
        return "Mastercard";
      }
    }
  },
});