/**
 * Sidebar.js
 * Academic Writing Composer
 * Block Toolbox
 */

export default class Sidebar {

    constructor(app) {

        this.app = app;

        this.element = null;

        this.state = "CREATED";

    }

    render() {

        if (this.element) {

            return this.element;

        }

        this.element = document.createElement("aside");

        this.element.className = "awc-sidebar";

        this.element.innerHTML = `

            <div class="awc-sidebar-title">

                Block Toolbox

            </div>

            <button data-block="paragraph">
                📝 Paragraph
            </button>

            <button data-block="heading">
                🔖 Heading
            </button>

            <button data-block="chapter">
                📖 Chapter
            </button>

            <button data-block="title">
                🏷 Title
            </button>

            <button data-block="figure">
                🖼 Figure
            </button>

            <button data-block="table">
                📊 Table
            </button>

        `;

        this.bindEvents();

        this.state = "READY";

        return this.element;

    }

    bindEvents() {

        this.element.querySelectorAll("button")

            .forEach(button => {

                button.addEventListener("click", () => {

                    this.app.emit(

                        "block:add",

                        button.dataset.block

                    );

                });

            });

    }

}
