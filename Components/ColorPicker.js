```javascript id="p8n4zk"
/**
 * ColorPicker.js
 * Reusable Color Picker Component
 * Version: 2.0.0
 */

export default class ColorPicker {

    constructor(options = {}) {

        this.options = {
            label: "Color",
            value: "#000000",
            presetColors: [
                "#000000",
                "#FFFFFF",
                "#FF0000",
                "#00AA00",
                "#0066FF",
                "#FFFF00",
                "#FF8800",
                "#8000FF"
            ],
            className: "",
            onChange: null,
            ...options
        };

        this.element = null;

        this.input = null;

        this.presets = null;

        this.state = "CREATED";

    }

    render() {

        if (!this.element) {

            this.element = document.createElement("div");

            this.input = document.createElement("input");

            this.presets = document.createElement("div");

            this.input.type = "color";

            this.input.addEventListener("input", event => {

                this.options.value = event.target.value;

                this.highlightPreset();

                if (typeof this.options.onChange === "function") {

                    this.options.onChange(
                        this.options.value,
                        event
                    );

                }

            });

        }

        this.element.className = [
            "awc-color-picker",
            this.options.className
        ].filter(Boolean).join(" ");

        this.element.innerHTML = "";

        if (this.options.label) {

            const label = document.createElement("label");

            label.className = "awc-color-picker-label";

            label.textContent = this.options.label;

            this.element.appendChild(label);

        }

        this.input.value = this.options.value;

        this.presets.className = "awc-color-presets";

        this.renderPresets();

        this.element.appendChild(this.input);

        this.element.appendChild(this.presets);

        this.state = "RENDERED";

        return this.element;

    }

    renderPresets() {

        this.presets.innerHTML = "";

        this.options.presetColors.forEach(color => {

            const swatch = document.createElement("button");

            swatch.type = "button";

            swatch.className = "awc-color-swatch";

            swatch.style.backgroundColor = color;

            if (color === this.options.value) {

                swatch.classList.add("active");

            }

            swatch.addEventListener("click", () => {

                this.setValue(color);

            });

            this.presets.appendChild(swatch);

        });

    }

    highlightPreset() {

        this.renderPresets();

    }

    setValue(color) {

        this.options.value = color;

        if (this.input) {

            this.input.value = color;

        }

        this.highlightPreset();

        if (typeof this.options.onChange === "function") {

            this.options.onChange(color);

        }

        return this;

    }

    getValue() {

        return this.options.value;

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
            value: this.options.value,
            presets: this.options.presetColors.length,
            state: this.state
        };

    }

}
```
