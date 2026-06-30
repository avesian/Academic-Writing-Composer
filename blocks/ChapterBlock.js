/**
 * ChapterBlock.js
 */

import BaseBlock from "./BaseBlock.js";

export default class ChapterBlock extends BaseBlock {

    constructor(data = {}) {

        super(data);

        this.type = "chapter";

        this.number = data.number || 1;

        this.title = data.title || "";

    }

    render() {

        return `
            <section class="awc-chapter">

                <h1 class="awc-chapter-number">
                    BAB ${this.toRoman(this.number)}
                </h1>

                <h1 class="awc-chapter-title">
                    ${this.title}
                </h1>

            </section>
        `;

    }

    toRoman(number) {

        const romans = [
            ["M",1000],["CM",900],["D",500],["CD",400],
            ["C",100],["XC",90],["L",50],["XL",40],
            ["X",10],["IX",9],["V",5],["IV",4],["I",1]
        ];

        let result = "";
        let n = number;

        for (const [symbol, value] of romans) {

            while (n >= value) {

                result += symbol;

                n -= value;

            }

        }

        return result;

    }

    toJSON() {

        return {

            ...super.toJSON(),

            number: this.number,

            title: this.title

        };

    }

}
