/**
 * FigureBlock.js
 */

import BaseBlock from "./BaseBlock.js";

export default class FigureBlock extends BaseBlock {

    constructor(data = {}) {

        super(data);

        this.type = "figure";

        this.src = data.src || "";

        this.caption = data.caption || "";

    }

    render() {

        return "";

    }

    toJSON() {

        return {

            ...super.toJSON(),

            src: this.src,

            caption: this.caption

        };

    }

}
