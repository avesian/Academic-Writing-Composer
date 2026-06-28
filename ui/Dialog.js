```javascript
/**
 * Dialog.js
 * Confirmation Dialog Component
 * Version: 2.0.0
 */

import Modal from "./Modal.js";

export default class Dialog extends Modal {

    constructor(app = null) {

        super(app);

        this.options = {
            title: "Confirmation",
            message: "",
            confirmText: "OK",
            cancelText: "Cancel",
            closable: false,
            onConfirm: null,
            onCancel: null
        };

    }

    refresh() {

        if (!this.element) return this;

        this.element.innerHTML = `
            <div class="awc-modal-header">
                <h3>${this.options.title}</h3>
            </div>

            <div class="awc-modal-body">
                <p>${this.options.message}</p>
            </div>

            <div class="awc-modal-footer">
                <button class="awc-dialog-cancel">
                    ${this.options.cancelText}
                </button>

                <button class="awc-dialog-confirm">
                    ${this.options.confirmText}
                </button>
            </div>
        `;

        this.bindEvents();

        return this;

    }

    bindEvents() {

        this.element
            .querySelector(".awc-dialog-confirm")
            ?.addEventListener("click", () => {

                if (typeof this.options.onConfirm === "function") {

                    this.options.onConfirm();

                }

                this.app?.emit("dialog:confirm");

                this.close();

            });

        this.element
            .querySelector(".awc-dialog-cancel")
            ?.addEventListener("click", () => {

                if (typeof this.options.onCancel === "function") {

                    this.options.onCancel();

                }

                this.app?.emit("dialog:cancel");

                this.close();

            });

    }

    confirm(options = {}) {

        this.options = {
            ...this.options,
            ...options
        };

        this.open(this.options);

        return this;

    }

    alert(message, title = "Information") {

        return this.confirm({
            title,
            message,
            cancelText: "",
            onCancel: null
        });

    }

    toJSON() {

        return {
            state: this.state,
            visible: this.visible,
            title: this.options.title,
            message: this.options.message
        };

    }

}
```
