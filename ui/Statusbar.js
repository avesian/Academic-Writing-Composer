```javascript
/**
 * Statusbar.js
 * Application Status Bar
 * Version: 2.0.0
 */

export default class Statusbar {

    constructor(app = null) {

        this.app = app;

        this.element = null;

        this.status = "Ready";

        this.page = 1;

        this.zoom = 100;

        this.words = 0;

        this.characters = 0;

        this.state = "CREATED";

    }

    render() {

        const workspace = this.app?.workspace?.getRootElement();

        if (!workspace) return this;

        this.element = workspace.querySelector(".awc-statusbar");

        if (!this.element) return this;

        this.refresh();

        this.state = "RENDERED";

        return this;

    }

    refresh() {

        if (!this.element) return this;

        this.element.innerHTML = `
            <div class="awc-status-left">
                <span class="awc-status">${this.status}</span>
            </div>

            <div class="awc-status-center">
                <span>Page ${this.page}</span>
                <span>${this.words} Words</span>
                <span>${this.characters} Characters</span>
            </div>

            <div class="awc-status-right">
                <span>${this.zoom}%</span>
            </div>
        `;

        return this;

    }

    setStatus(status) {

        this.status = status;

        this.refresh();

        return this;

    }

    setPage(page) {

        this.page = page;

        this.refresh();

        return this;

    }

    setZoom(zoom) {

        this.zoom = zoom;

        this.refresh();

        return this;

    }

    updateStatistics(text = "") {

        this.characters = text.length;

        const words = text
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        this.words = words.length;

        this.refresh();

        return this;

    }

    reset() {

        this.status = "Ready";

        this.page = 1;

        this.zoom = 100;

        this.words = 0;

        this.characters = 0;

        this.refresh();

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
            state: this.state,
            status: this.status,
            page: this.page,
            zoom: this.zoom,
            words: this.words,
            characters: this.characters
        };

    }

}
```
