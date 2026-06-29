/**
 * Toast.js
 * Notification Toast Component
 * Version: 2.0.0
 */

export default class Toast {

    constructor(app = null) {

        this.app = app;

        this.container = null;

        this.duration = 3000;

        this.position = "bottom-right";

        this.state = "CREATED";

    }

    render() {

        if (this.container) return this;

        this.container = document.createElement("div");

        this.container.className = `awc-toast-container ${this.position}`;

        document.body.appendChild(this.container);

        this.state = "RENDERED";

        return this;

    }

    show(message, type = "info", duration = this.duration) {

        if (!this.container) {

            this.render();

        }

        const toast = document.createElement("div");

        toast.className = `awc-toast awc-toast-${type}`;

        toast.innerHTML = `
            <div class="awc-toast-message">${message}</div>
        `;

        this.container.appendChild(toast);

        this.app?.emit("toast:show", {
            message,
            type
        });

        setTimeout(() => {

            toast.classList.add("hide");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, duration);

        return toast;

    }

    info(message, duration) {

        return this.show(message, "info", duration);

    }

    success(message, duration) {

        return this.show(message, "success", duration);

    }

    warning(message, duration) {

        return this.show(message, "warning", duration);

    }

    error(message, duration) {

        return this.show(message, "error", duration);

    }

    clear() {

        if (!this.container) return this;

        this.container.innerHTML = "";

        return this;

    }

    setPosition(position) {

        this.position = position;

        if (this.container) {

            this.container.className = `awc-toast-container ${position}`;

        }

        return this;

    }

    destroy() {

        this.container?.remove();

        this.container = null;

        this.state = "DESTROYED";

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            position: this.position,
            duration: this.duration
        };

    }

}

