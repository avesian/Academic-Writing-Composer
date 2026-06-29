/**
 * Card.js
 * Reusable Card Component
 * Version: 2.0.0
 */

export default class Card {

    constructor(options = {}) {

        this.options = {
            title: "",
            subtitle: "",
            content: "",
            footer: "",
            elevation: 1,
            className: "",
            clickable: false,
            onClick: null,
            ...options
        };

        this.element = null;

        this.state = "CREATED";

    }

    render() {

        if (!this.element) {

            this.element = document.createElement("article");

            this.element.addEventListener("click", event => {

                if (!this.options.clickable) return;

                if (typeof this.options.onClick === "function") {

                    this.options.onClick(event);

                }

            });

        }

        this.element.className = [
            "awc-card",
            `awc-card-elevation-${this.options.elevation}`,
            this.options.clickable ? "awc-card-clickable" : "",
            this.options.className
        ].filter(Boolean).join(" ");

        this.element.innerHTML = `
            ${this.options.title || this.options.subtitle ? `
                <header class="awc-card-header">
                    ${this.options.title
                        ? `<h3 class="awc-card-title">${this.options.title}</h3>`
                        : ""}
                    ${this.options.subtitle
                        ? `<p class="awc-card-subtitle">${this.options.subtitle}</p>`
                        : ""}
                </header>
            ` : ""}

            <section class="awc-card-body">
                ${this.options.content}
            </section>

            ${this.options.footer ? `
                <footer class="awc-card-footer">
                    ${this.options.footer}
                </footer>
            ` : ""}
        `;

        this.state = "RENDERED";

        return this.element;

    }

    setTitle(title) {

        this.options.title = title;

        return this.refresh();

    }

    setContent(content) {

        this.options.content = content;

        return this.refresh();

    }

    setFooter(footer) {

        this.options.footer = footer;

        return this.refresh();

    }

    setClickable(clickable = true) {

        this.options.clickable = clickable;

        return this.refresh();

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
            title: this.options.title,
            clickable: this.options.clickable,
            elevation: this.options.elevation,
            state: this.state
        };

    }

}

