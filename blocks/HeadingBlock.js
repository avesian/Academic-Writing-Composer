/**
 * HeadingBlock.js
 */

import BaseBlock from "./BaseBlock.js";

export default class HeadingBlock extends BaseBlock {

    constructor(data = {}) {

        super(data);

        this.type = "heading";

        this.level = data.level || 1;

        this.numbering = data.numbering ?? true;

    }

    render() {

        const tag = `h${Math.min(this.level, 6)}`;

        return `
            <${tag} class="awc-heading awc-heading-${this.level}">
                ${this.content}
            </${tag}>
        `;

    }

    toJSON() {

        return {

            ...super.toJSON(),

            level: this.level,

            numbering: this.numbering

        };

    }

}
