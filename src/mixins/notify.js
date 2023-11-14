const position = "topRight";
const theme = "light";

const info = (notify) => {
    iziToast.info({
        title: notify.title ?? '',
        message: notify.message,
        position: position,
        theme: theme,
    });
};

const success = (notify) => {
    iziToast.success({
        title: notify.title ?? '',
        message: notify.message,
        position: position,
        theme: theme,
    });
};

const error = (notify) => {
    iziToast.error({
        title: notify.title ?? '',
        message: notify.message,
        position: position,
        theme: theme,
    });
};

const warning = (notify) => {
    iziToast.warning({
        title: notify.title ?? '',
        message: notify.message,
        position: position,
        theme: theme,
    });
};

const validationError = (message) => {
    iziToast.error({
        title: "Error",
        message: message,
        position: position,
        theme: theme,
    });
};

const InfosAnnouncement = (message) => {
    iziToast.info({
        title: "Infos",
        message: message,
        position: position,
        theme: theme,
    });
};

const toastExe = (notify) => {
    if (notify.type === "success") {
        success(notify);
    }
    if (notify.type === "info") {
        info(notify);
    }
    if (notify.type === "error") {
        error(notify);
    }
    if (notify.type === "warning") {
        warning(notify);
    }
};

export default {
    exe: toastExe,
    info: InfosAnnouncement,
    validEr: validationError,
};
