```javascript
/**
 * Button.js
 * Reusable Button Component
 * Version: 2.0.0
 */

export default class Button {

    constructor(options = {}) {

        this.options = {
            label: "Button",
            icon: "",
            type: "button",
            variant: "primary",
            disabled: false,
            className: "",
            onClick: null,
            ...options
        };

        this.element = null;

        this.state = "CREATED";

    }

    render() {

        if (!this.element) {

            this.element = document.createElement("button");

            this.element.addEventListener("click", event => {

                if (this.options.disabled) return;

                if (typeof this.options.onClick === "function") {

                    this.options.onClick(event);

                }

            });

        }

        this.element.type = this.options.type;

        this.element.className = [
            "awc-button",
            `awc-button-${this.options.variant}`,
            this.options.className
        ].filter(Boolean).join(" ");

        this.element.disabled = this.options.disabled;

        this.element.innerHTML = `
            ${this.options.icon
                ? `<span class="awc-button-icon">${this.options.icon}</span>`
                : ""}
            <span class="awc-button-label">
                ${this.options.label}
            </span>
        `;

        this.state = "RENDERED";

        return this.element;

    }

    setLabel(label) {

        this.options.label = label;

        return this.refresh();

    }

    setIcon(icon) {

        this.options.icon = icon;

        return this.refresh();

    }

    setVariant(variant) {

        this.options.variant = variant;

        return this.refresh();

    }

    setDisabled(disabled = true) {

        this.options.disabled = disabled;

        return this.refresh();

    }

    enable() {

        return this.setDisabled(false);

    }

    disable() {

        return this.setDisabled(true);

    }

    refresh() {

        if (this.element) {

            this.render();

        }

        return this;

    }

    getElement() {

        return this.element;

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            label: this.options.label,
            variant: this.options.variant,
            disabled: this.options.disabled,
            state: this.state
        };

    }

}
```
