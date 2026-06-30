/**
 * ParagraphBlock.js
 */

import BaseBlock from "./BaseBlock.js";

export default class ParagraphBlock extends BaseBlock {

    constructor(data = {}) {

        super(data);

        this.type = "paragraph";

        this.alignment = data.alignment || "justify";

        this.indent = data.indent ?? true;

    }

    render() {

        return `
            <p class="awc-paragraph">
                ${this.content}
            </p>
        `;

    }

    toJSON() {

        return {

            ...super.toJSON(),

            alignment: this.alignment,

            indent: this.indent

        };

    }

}
