/**
 * TitleBlock.js
 */

import BaseBlock from "./BaseBlock.js";

export default class TitleBlock extends BaseBlock {

    constructor(data = {}) {

        super(data);

        this.type = "title";

        this.subtitle = data.subtitle || "";

    }

    render() {

        return `
            <header class="awc-title-page">

                <h1 class="awc-title">
                    ${this.content}
                </h1>

                ${
                    this.subtitle
                        ? `<h2 class="awc-subtitle">${this.subtitle}</h2>`
                        : ""
                }

            </header>
        `;

    }

    toJSON() {

        return {

            ...super.toJSON(),

            subtitle: this.subtitle

        };

    }

}
