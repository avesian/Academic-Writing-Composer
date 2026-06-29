```javascript id="j5tw9m"
/**
 * LoadingOverlay.js
 * Fullscreen Loading Overlay
 * Version: 2.0.0
 */

export default class LoadingOverlay {

    constructor(app = null) {

        this.app = app;

        this.element = null;

        this.messageElement = null;

        this.visible = false;

        this.message = "Loading...";

        this.state = "CREATED";

    }

    render() {

        if (this.element) return this;

        this.element = document.createElement("div");

        this.element.className = "awc-loading-overlay";

        this.element.style.display = "none";

        this.element.innerHTML = `
            <div class="awc-loading-container">
                <div class="awc-loading-spinner"></div>
                <div class="awc-loading-message"></div>
            </div>
        `;

        this.messageElement = this.element.querySelector(
            ".awc-loading-message"
        );

        document.body.appendChild(this.element);

        this.setMessage(this.message);

        this.state = "RENDERED";

        return this;

    }

    show(message = this.message) {

        if (!this.element) {

            this.render();

        }

        this.setMessage(message);

        this.element.style.display = "flex";

        this.visible = true;

        this.app?.emit("loading:show", message);

        return this;

    }

    hide() {

        if (!this.element) return this;

        this.element.style.display = "none";

        this.visible = false;

        this.app?.emit("loading:hide");

        return this;

    }

    toggle() {

        return this.visible
            ? this.hide()
            : this.show();

    }

    setMessage(message) {

        this.message = message;

        if (this.messageElement) {

            this.messageElement.textContent = message;

        }

        return this;

    }

    isVisible() {

        return this.visible;

    }

    destroy() {

        this.element?.remove();

        this.element = null;

        this.messageElement = null;

        this.visible = false;

        this.state = "DESTROYED";

    }

    getElement() {

        return this.element;

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            visible: this.visible,
            message: this.message
        };

    }

}
```
