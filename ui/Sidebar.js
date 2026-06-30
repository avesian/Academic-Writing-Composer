 * Sidebar.js
 * Academic Writing Composer
 * Sidebar Container
 */

export default class Sidebar {

    constructor(app) {

        this.app = app;

        this.element = null;

        this.state = "CREATED";

        this.sections = {};

    }

    render() {

        if (this.element) {

            return this.element;

        }

        this.element = document.createElement("aside");

        this.element.className = "awc-sidebar";

        this.createSections();

        this.bindEvents();

        this.state = "RENDERED";

        return this.element;

    }

    createSections() {

        const panels = [

            {
                id: "outline",
                title: "Outline"
            },

            {
                id: "blocks",
                title: "Blocks"
            },

            {
                id: "properties",
                title: "Properties"
            }

        ];

        panels.forEach(panel => {

            const section = document.createElement("section");

            section.className = "awc-sidebar-section";

            section.innerHTML = `
                <h3 class="awc-sidebar-title">
                    ${panel.title}
                </h3>

                <div
                    id="awc-${panel.id}"
                    class="awc-sidebar-content">
                </div>
            `;

            this.sections[panel.id] = section.querySelector(
                ".awc-sidebar-content"
            );

            this.element.appendChild(section);

        });

    }

    bindEvents() {

        this.app.on(
            "outline:update",
            data => this.updateOutline(data)
        );

        this.app.on(
            "blocks:update",
            data => this.updateBlocks(data)
        );

        this.app.on(
            "properties:update",
            data => this.updateProperties(data)
        );

    }

    updateOutline(content = "") {

        this.sections.outline.innerHTML = content;

    }

    updateBlocks(content = "") {

        this.sections.blocks.innerHTML = content;

    }

    updateProperties(content = "") {

        this.sections.properties.innerHTML = content;

    }

    clear() {

        Object.values(this.sections).forEach(section => {

            section.innerHTML = "";

        });

    }

    getSection(name) {

        return this.sections[name];

    }

    getElement() {

        return this.element;

    }

    getState() {

        return this.state;

    }

}

