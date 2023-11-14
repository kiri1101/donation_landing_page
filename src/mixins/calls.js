import { ref } from "vue";
import { api } from "src/boot/axios";
import Toast from "src/mixins/notify.js";
import { useDonationStore } from "src/stores/donation";
import { useEnvStore } from "src/stores/env";

const form = useDonationStore();

const env = useEnvStore();

const feeList = ref();

const isApiOn = ref(false);

const alertsFound = ref(false);

const alerts = ref([]);

const beginLoading = () => isApiOn.value = true;

const stopLoading = () => isApiOn.value = false;

const validatePromiseParams = (param, up, down) => {
  return param.startsWith(up) && param.endsWith(down) ? true : false;
}

const getPromise = (url, payload) => {
  api.post(url, payload).then((response) => {
    form.updateUser(response.data.data[0]);
  }).catch((error) => {
    console.log(error);

    return alerts.value.push('errors.general');
  });
}

const createOrUpdate = (url, payload) => {
  api.post(url, payload).then((response) => {
    stopLoading();

    let res = response.data.pesake.detail;

    if (res !== null) {
      Object.values(res.adminDetail).forEach((value) => {
        if (value === "phoneNumber") {
          alerts.value.push('validation.phone');
        }
        if (value === "username") {
          alerts.value.push('validation.name');
        }
        if (value === "mail") {
          alerts.value.push('validation.email');
        }
        if (value === "amount") {
          alerts.value.push('validation.amount');
        }
      });

      return alertsFound.value = true;
    }

    form.pay.listPaymentID.push(response.data.data.code);

    feeList.value = response.data.data.meanlist;
  }).catch((error) => {
    console.log(error);

    return alerts.value.push('errors.general');
  });
}

const createDonation = (url, payload) => {
  api.post(url, payload).then((response) => {
    stopLoading();

    if (response.data.pesake.detail !== null && response.data.data === null) {
      return alerts.value.push('validation.payment');
    }

    if (form.pay.meanCode === "MASTERCARD" || form.pay.meanCode === "VISA") {
      return window.location.href = response.data.data.CARD_PAY_LINK;
    } else {
      form.status.orderNumber = response.data.data.orderNumber;

      checkStatus(`${env.BASE_URI}/${env.API_CHECK_STATUS_KEY}`, form.status);

      form.updateStep(3);
    }
  }).catch((error) => {
    console.log(error);

    return alerts.value.push('errors.general');
  });
}

const checkStatus = (url, payload) => {
  let beginCheck = setInterval(() => {
    api.post(url, payload).then((response) => {
      if (response.data.data.status === "E") {
        return true;
        // return alerts.value.push('errors.transaction.pending');
      } else {
        clearInterval(beginCheck);

        if (response.data.data.status === "T") {
          form.paymentSuccessful();

          if (response.data.data.docList[0]["orderNumber"] === form.status.orderNumber) {
            let url = `FILES/Receipt_${response.data.data.docList[0]["saleCode"]}.pdf`;

            downloadPDF(`${env.BASE_URI}/${url}`, "Receipt");

            setTimeout(() => {
              form.updateStep(1);
            }, env.FORM_RESET_TIMEOUT);
          }
        }
        if (response.data.data.status === "X") {
          return alerts.value.push('errors.transaction.expired');
        }
        if (response.data.data.status === "O") {
          return alerts.value.push('errors.transaction.operator_failure');
        }
        if (response.data.data.status === "C") {
          return alerts.value.push('errors.transaction.canceled');
        }
      }
    }).catch((error) => {
      console.log(error);

      return alerts.value.push('errors.general');
    });
  }, 10000);
}

const downloadPDF = (url, label) => {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.download = `${label}.pdf`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default {
  isLoading: isApiOn,
  alerts: alerts,
  isAlert: alertsFound,
  onLoad: beginLoading,
  stopLoad: stopLoading,
  isPromiseValid: validatePromiseParams,
  promiseInfo: getPromise,
  fees: feeList,
  status: checkStatus,
  storePromise: createOrUpdate,
  donate: createDonation
}