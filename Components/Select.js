/**
 * Select.js
 * Reusable Select Component
 * Version: 2.0.0
 */

export default class Select {

    constructor(options = {}) {

        this.options = {
            label: "",
            name: "",
            value: "",
            items: [],
            disabled: false,
            className: "",
            onChange: null,
            ...options
        };

        this.wrapper = null;

        this.select = null;

        this.state = "CREATED";

    }

    render() {

        if (!this.wrapper) {

            this.wrapper = document.createElement("div");

            this.wrapper.className = "awc-select";

            this.select = document.createElement("select");

            this.select.addEventListener("change", event => {

                this.options.value = event.target.value;

                if (typeof this.options.onChange === "function") {

                    this.options.onChange(
                        event.target.value,
                        event
                    );

                }

            });

        }

        this.wrapper.className = [
            "awc-select",
            this.options.className
        ].filter(Boolean).join(" ");

        this.wrapper.innerHTML = "";

        if (this.options.label) {

            const label = document.createElement("label");

            label.className = "awc-select-label";

            label.textContent = this.options.label;

            this.wrapper.appendChild(label);

        }

        this.select.name = this.options.name;

        this.select.disabled = this.options.disabled;

        this.select.innerHTML = "";

        this.options.items.forEach(item => {

            const option = document.createElement("option");

            if (typeof item === "object") {

                option.value = item.value;

                option.textContent = item.label;

            } else {

                option.value = item;

                option.textContent = item;

            }

            if (option.value == this.options.value) {

                option.selected = true;

            }

            this.select.appendChild(option);

        });

        this.wrapper.appendChild(this.select);

        this.state = "RENDERED";

        return this.wrapper;

    }

    setItems(items = []) {

        this.options.items = items;

        return this.refresh();

    }

    setValue(value) {

        this.options.value = value;

        if (this.select) {

            this.select.value = value;

        }

        return this;

    }

    getValue() {

        return this.select?.value ?? this.options.value;

    }

    enable() {

        this.options.disabled = false;

        if (this.select) {

            this.select.disabled = false;

        }

        return this;

    }

    disable() {

        this.options.disabled = true;

        if (this.select) {

            this.select.disabled = true;

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
            value: this.getValue(),
            items: this.options.items.length,
            state: this.state
        };

    }

}

