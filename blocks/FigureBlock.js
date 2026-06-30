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

        this.width = data.width || "100%";

    }

    render() {

        return (
            '<figure class="awc-figure">' +
                '<img src="' + this.src + '" alt="' + this.caption + '" style="width:' + this.width + ';">' +
                '<figcaption>' + this.caption + '</figcaption>' +
            '</figure>'
        );

    }

    toJSON() {

        return {

            ...super.toJSON(),

            src: this.src,

            caption: this.caption,

            width: this.width

        };

    }

}
