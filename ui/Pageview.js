```javascript
/**
 * PageView.js
 * Document Page View
 * Version: 2.0.0
 */

export default class PageView {

    constructor(canvas = null) {

        this.canvas = canvas;

        this.element = null;

        this.number = 1;

        this.size = "A4";

        this.orientation = "portrait";

        this.margins = {
            top: 30,
            right: 30,
            bottom: 30,
            left: 40
        };

        this.state = "CREATED";

    }

    render(container) {

        this.element = document.createElement("div");

        this.element.className = "awc-page";

        this.element.dataset.page = this.number;

        this.element.innerHTML = `
            <div class="awc-page-header"></div>

            <div class="awc-page-body"></div>

            <div class="awc-page-footer"></div>
        `;

        if (container) {

            container.appendChild(this.element);

        }

        this.applyLayout();

        this.state = "RENDERED";

        return this;

    }

    applyLayout() {

        if (!this.element) return this;

        this.element.dataset.size = this.size;

        this.element.dataset.orientation = this.orientation;

        this.element.style.padding = `
            ${this.margins.top}mm
            ${this.margins.right}mm
            ${this.margins.bottom}mm
            ${this.margins.left}mm
        `;

        return this;

    }

    setPageNumber(number) {

        this.number = number;

        if (this.element) {

            this.element.dataset.page = number;

        }

        return this;

    }

    setSize(size) {

        this.size = size;

        this.applyLayout();

        return this;

    }

    setOrientation(orientation) {

        this.orientation = orientation;

        this.applyLayout();

        return this;

    }

    setMargins(margins = {}) {

        this.margins = {
            ...this.margins,
            ...margins
        };

        this.applyLayout();

        return this;

    }

    getBody() {

        return this.element?.querySelector(".awc-page-body");

    }

    clear() {

        const body = this.getBody();

        if (body) {

            body.innerHTML = "";

        }

        return this;

    }

    destroy() {

        this.element?.remove();

        this.element = null;

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
            page: this.number,
            size: this.size,
            orientation: this.orientation,
            margins: this.margins,
            state: this.state
        };

    }

}
```
