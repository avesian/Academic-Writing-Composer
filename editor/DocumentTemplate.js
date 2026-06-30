/**
 * DocumentTemplate.js
 * Academic Writing Composer
 */

export default class DocumentTemplate {

    constructor(name = "blank") {

        this.name = name;

        this.blocks = [];

    }

    add(type, data = {}) {

        this.blocks.push({

            type,

            data

        });

        return this;

    }

    build(document) {

        document.clear();

        this.blocks.forEach(block => {

            document.addBlock(

                block.type,

                block.data

            );

        });

        return document;

    }

}
