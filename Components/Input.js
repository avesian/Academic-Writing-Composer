```javascript id="y7m3qa"
/**
 * Input.js
 * Reusable Input Component
 * Version: 2.0.0
 */

export default class Input {

    constructor(options = {}) {

        this.options = {
            label: "",
            name: "",
            type: "text",
            value: "",
            placeholder: "",
            readonly: false,
            disabled: false,
            className: "",
            onInput: null,
            onChange: null,
            ...options
        };

        this.wrapper = null;

        this.input = null;

        this.state = "CREATED";

    }

    render() {

        if (!this.wrapper) {

            this.wrapper = document.createElement("div");

            this.wrapper.className = "awc-input";

            this.input = document.createElement("input");

            this.input.addEventListener("input", event => {

                this.options.value = event.target.value;

                if (typeof this.options.onInput === "function") {

                    this.options.onInput(event.target.value, event);

                }

            });

            this.input.addEventListener("change", event => {

                if (typeof this.options.onChange === "function") {

                    this.options.onChange(event.target.value, event);

                }

            });

            this.wrapper.appendChild(this.input);

        }

        this.wrapper.className = [
            "awc-input",
            this.options.className
        ].filter(Boolean).join(" ");

        this.wrapper.innerHTML = "";

        if (this.options.label) {

            const label = document.createElement("label");

            label.className = "awc-input-label";

            label.textContent = this.options.label;

            this.wrapper.appendChild(label);

        }

        this.input.type = this.options.type;

        this.input.name = this.options.name;

        this.input.value = this.options.value;

        this.input.placeholder = this.options.placeholder;

        this.input.readOnly = this.options.readonly;

        this.input.disabled = this.options.disabled;

        this.wrapper.appendChild(this.input);

        this.state = "RENDERED";

        return this.wrapper;

    }

    getValue() {

        return this.input?.value ?? "";

    }

    setValue(value) {

        this.options.value = value;

        if (this.input) {

            this.input.value = value;

        }

        return this;

    }

    focus() {

        this.input?.focus();

        return this;

    }

    enable() {

        this.options.disabled = false;

        if (this.input) {

            this.input.disabled = false;

        }

        return this;

    }

    disable() {

        this.options.disabled = true;

        if (this.input) {

            this.input.disabled = true;

        }

        return this;

    }

    clear() {

        return this.setValue("");

    }

    getElement() {

        return this.wrapper;

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            name: this.options.name,
            value: this.getValue(),
            type: this.options.type,
            state: this.state
        };

    }

}
```
