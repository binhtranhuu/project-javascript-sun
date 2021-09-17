/* eslint-disable prefer-arrow-callback */
export const getParameterByName = (name, url = window.location.href) => {
    // eslint-disable-next-line no-param-reassign
    name = name.replace(/[[\]]/g, "\\$&");
    const regex = new RegExp(`[?&]${  name  }(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const parseRequestUrl = () => {
    const address = document.location.hash.slice(1).split("?")[0];
    const queryString =
        document.location.hash.slice(1).split("?").length === 2
            ? document.location.hash.slice(1).split("?")[1]
            : "";

    const url = address.toLowerCase() || "/";
    const r = url.split("/");
    const q = queryString.split("=");
    return {
        resource: r[1],
        id: r[2],
        verb: r[3],
        name: q[0],
        value: q[1],
    };
};

export const rerender = async (selector, component) => {
    document.getElementById(selector).innerHTML = await component.render();
    await component.after_render();
};

export const showLoading = () => {
    document.getElementById("loading-overlay").classList.add("active");
};

export const hideLoading = () => {
    document.getElementById("loading-overlay").classList.remove("active");
};

export const showMessage = (message, callback) => {
    document.getElementById("message-overlay").innerHTML = `
  <div>
    <div id="message-overlay-content">${message}</div>
    <button id="message-overlay-close-button">OK</button>
  </div>
  `;
    document.getElementById("message-overlay").classList.add("active");
    document
        .getElementById("message-overlay-close-button")
        .addEventListener("click", () => {
            document
                .getElementById("message-overlay")
                .classList.remove("active");
            if (callback) {
                callback();
            }
        });
};

export function toastNotify({
    title = "",
    message = "",
    type = "info",
    duration = 3000,
}) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");

        // Auto remove toast
        const autoRemoveId = setTimeout(() => {
            main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = (e) => {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: "fas fa-check-circle",
            info: "fas fa-info-circle",
            warning: "fas fa-exclamation-circle",
            error: "fas fa-exclamation-circle",
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
        toast.style.opacity = 1;

        toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
        main.appendChild(toast);
    }
}
