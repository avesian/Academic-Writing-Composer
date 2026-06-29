/**
 * ImageUploader.js
 * Reusable Image Uploader Component
 * Version: 2.0.0
 */

export default class ImageUploader {

    constructor(options = {}) {

        this.options = {
            label: "Choose Image",
            accept: "image/*",
            multiple: false,
            maxSize: 5 * 1024 * 1024,
            className: "",
            onChange: null,
            ...options
        };

        this.element = null;

        this.input = null;

        this.preview = null;

        this.file = null;

        this.state = "CREATED";

    }

    render() {

        if (!this.element) {

            this.element = document.createElement("div");

            this.input = document.createElement("input");

            this.preview = document.createElement("div");

            this.input.type = "file";

            this.input.addEventListener(
                "change",
                event => this.handleFiles(event.target.files)
            );

        }

        this.element.className = [
            "awc-image-uploader",
            this.options.className
        ].filter(Boolean).join(" ");

        this.element.innerHTML = "";

        if (this.options.label) {

            const label = document.createElement("label");

            label.className = "awc-image-uploader-label";

            label.textContent = this.options.label;

            this.element.appendChild(label);

        }

        this.input.accept = this.options.accept;

        this.input.multiple = this.options.multiple;

        this.preview.className = "awc-image-preview";

        this.element.appendChild(this.input);

        this.element.appendChild(this.preview);

        this.state = "RENDERED";

        return this.element;

    }

    handleFiles(files) {

        if (!files || files.length === 0) return;

        const file = files[0];

        if (file.size > this.options.maxSize) {

            console.warn("Image exceeds maximum size.");

            return;

        }

        this.file = file;

        this.renderPreview(file);

        if (typeof this.options.onChange === "function") {

            this.options.onChange(file);

        }

    }

    renderPreview(file) {

        const reader = new FileReader();

        reader.onload = () => {

            this.preview.innerHTML = "";

            const image = document.createElement("img");

            image.className = "awc-image-preview-img";

            image.src = reader.result;

            image.alt = file.name;

            this.preview.appendChild(image);

        };

        reader.readAsDataURL(file);

    }

    clear() {

        this.file = null;

        if (this.input) {

            this.input.value = "";

        }

        if (this.preview) {

            this.preview.innerHTML = "";

        }

        return this;

    }

    getFile() {

        return this.file;

    }

    getElement() {

        return this.element;

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            file: this.file?.name || null,
            state: this.state
        };

    }

}
