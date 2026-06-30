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

        return "<h1>" + this.content + "</h1>";

    }

    toJSON() {

        return {
            ...super.toJSON(),
            subtitle: this.subtitle
        };

    }

}
