```javascript
/**
 * Textarea.js
 * Reusable Textarea Component
 * Version: 2.0.0
 */

export default class Textarea {

    constructor(options = {}) {

        this.options = {
            label: "",
            name: "",
            value: "",
            placeholder: "",
            rows: 5,
            readonly: false,
            disabled: false,
            className: "",
            onInput: null,
            onChange: null,
            ...options
        };

        this.wrapper = null;

        this.textarea = null;

        this.state = "CREATED";

    }

    render() {

        if (!this.wrapper) {

            this.wrapper = document.createElement("div");

            this.textarea = document.createElement("textarea");

            this.textarea.addEventListener("input", event => {

                this.options.value = event.target.value;

                if (typeof this.options.onInput === "function") {

                    this.options.onInput(
                        event.target.value,
                        event
                    );

                }

            });

            this.textarea.addEventListener("change", event => {

                if (typeof this.options.onChange === "function") {

                    this.options.onChange(
                        event.target.value,
                        event
                    );

                }

            });

        }

        this.wrapper.className = [
            "awc-textarea",
            this.options.className
        ].filter(Boolean).join(" ");

        this.wrapper.innerHTML = "";

        if (this.options.label) {

            const label = document.createElement("label");

            label.className = "awc-textarea-label";

            label.textContent = this.options.label;

            this.wrapper.appendChild(label);

        }

        this.textarea.name = this.options.name;

        this.textarea.value = this.options.value;

        this.textarea.placeholder = this.options.placeholder;

        this.textarea.rows = this.options.rows;

        this.textarea.readOnly = this.options.readonly;

        this.textarea.disabled = this.options.disabled;

        this.wrapper.appendChild(this.textarea);

        this.state = "RENDERED";

        return this.wrapper;

    }

    setValue(value) {

        this.options.value = value;

        if (this.textarea) {

            this.textarea.value = value;

        }

        return this;

    }

    getValue() {

        return this.textarea?.value ?? this.options.value;

    }

    focus() {

        this.textarea?.focus();

        return this;

    }

    clear() {

        return this.setValue("");

    }

    enable() {

        this.options.disabled = false;

        if (this.textarea) {

            this.textarea.disabled = false;

        }

        return this;

    }

    disable() {

        this.options.disabled = true;

        if (this.textarea) {

            this.textarea.disabled = true;

        }

        return this;

    }

    refresh() {

        if (this.wrapper) {

            this.render();

        }

        return this;

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
            rows: this.options.rows,
            value: this.getValue(),
            state: this.state
        };

    }

}
```
