/**
 * Statusbar.js
 * Academic Writing Composer
 * Application Status Bar
 */

export default class Statusbar {

    constructor(app) {

        this.app = app;

        this.element = null;

        this.state = "CREATED";

        this.documentStatus = "Ready";

        this.wordCount = 0;

        this.characterCount = 0;

    }

    render() {

        if (this.element) {

            return this.element;

        }

        this.element = document.createElement("footer");

        this.element.className = "awc-statusbar";

        this.renderContent();

        this.bindEvents();

        this.state = "RENDERED";

        return this.element;

    }

    bindEvents() {

        this.app.on(

            "document:changed",

            html => {

                this.updateStatistics(html);

            }

        );

        this.app.on(

            "document:created",

            () => {

                this.setStatus("New Document");

            }

        );

        this.app.on(

            "document:save",

            () => {

                this.setStatus("Saved");

            }

        );

        this.app.on(

            "preview:open",

            () => {

                this.setStatus("Preview");

            }

        );

    }

    updateStatistics(html = "") {

        const text = html
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        this.characterCount = text.length;

        this.wordCount = text
            ? text.split(" ").length
            : 0;

        this.setStatus("Editing");

        this.renderContent();

    }

    setStatus(status) {

        this.documentStatus = status;

        this.renderContent();

    }

    renderContent() {

        if (!this.element) return;

        this.element.innerHTML = `
            <div class="awc-status-left">
                <strong>${this.documentStatus}</strong>
            </div>

            <div class="awc-status-right">

                <span>
                    Words :
                    ${this.wordCount}
                </span>

                &nbsp;&nbsp;|&nbsp;&nbsp;

                <span>
                    Characters :
                    ${this.characterCount}
                </span>

            </div>
        `;

    }

    reset() {

        this.documentStatus = "Ready";

        this.wordCount = 0;

        this.characterCount = 0;

        this.renderContent();

    }

    getElement() {

        return this.element;

    }

    getState() {

        return this.state;

    }

}

