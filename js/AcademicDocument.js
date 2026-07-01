/**
 * AcademicDocument.js
 * Academic Writing Composer
 */

import DocumentMetadata from "../DocumentMetadata.js";
import BlockFactory from "../BlockFactory.js";
import BlockRegistry from "../BlockRegistry.js";

export default class AcademicDocument {

    constructor() {

        this.metadata = new DocumentMetadata();

        this.registry = new BlockRegistry();

        this.factory = new BlockFactory();

        this.blocks = [];

        this.addBlock("paragraph");

    }

    addBlock(type, data = {}) {

        const block = this.factory.create(type, data);

        this.registry.register(block);

        this.blocks.push(block);

        this.touch();

        return block;

    }

    removeBlock(id) {

        this.blocks = this.blocks.filter(

            block => block.id !== id

        );

        this.registry.unregister(id);

        this.touch();

    }

    getBlock(id) {

        return this.blocks.find(

            block => block.id === id

        );

    }

    getBlocks() {

        return this.blocks;

    }

    clear() {

        this.blocks = [];

        this.registry.clear();

        this.addBlock("paragraph");

        this.touch();

    }

    setContent(html) {

        if (this.blocks.length === 0) {

            this.addBlock("paragraph");

        }

        this.blocks[0].setContent(html);

        this.touch();

    }

    getContent() {

        return this.blocks

            .map(block => block.render())

            .join("");

    }

    setMetadata(data = {}) {

        this.metadata.update(data);

        return this;

    }

    getMetadata() {

        return this.metadata;

    }

    touch() {

        this.metadata.updatedAt = new Date();

    }

    toJSON() {

        return {

            metadata: this.metadata.toJSON(),

            blocks: this.blocks.map(

                block => block.toJSON()

            )

        };

    }

    fromJSON(data) {

        this.metadata = new DocumentMetadata(

            data.metadata || {}

        );

        this.blocks = [];

        this.registry.clear();

        (data.blocks || []).forEach(item => {

            const block = this.factory.create(

                item.type,

                item

            );

            this.registry.register(block);

            this.blocks.push(block);

        });

    }

}
