/**
 * TableBlock.js
 */

import BaseBlock from "./BaseBlock.js";

export default class TableBlock extends BaseBlock {

    constructor(data = {}) {

        super(data);

        this.type = "table";

        this.headers = data.headers || [];

        this.rows = data.rows || [];

        this.caption = data.caption || "";

    }

    render() {

        return `
            <figure class="awc-table">

                <table>

                    <thead>

                        <tr>

                            ${this.headers.map(header => `<th>${header}</th>`).join("")}

                        </tr>

                    </thead>

                    <tbody>

                        ${this.rows.map(row => `
                            <tr>
                                ${row.map(cell => `<td>${cell}</td>`).join("")}
                            </tr>
                        `).join("")}

                    </tbody>

                </table>

                <figcaption>

                    ${this.caption}

                </figcaption>

            </figure>
        `;

    }

    toJSON() {

        return {

            ...super.toJSON(),

            headers: this.headers,

            rows: this.rows,

            caption: this.caption

        };

    }

}
