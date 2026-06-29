```javascript
/**
 * AcademicDocument.js
 * Integrated with Block Registry
 */

import BlockFactory from "../blocks/BlockFactory.js";
import BlockRegistry from "../registry/BlockRegistry.js";

export default class AcademicDocument {

    constructor() {

        this.registry = new BlockRegistry();

        this.factory = new BlockFactory();

        this.blocks = [];

        this.metadata = {

            title: "Untitled Document",

            author: "",

            createdAt: new Date(),

            updatedAt: new Date()

        };

        this.addBlock("paragraph");

    }

    addBlock(type, data = {}) {

        const block = this.factory.create(type, data);

        if (!block) {

            throw new Error(`Unknown block type: ${type}`);

        }

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

    }

    setContent(html) {

        if (this.blocks.length === 0) {

            this.addBlock("paragraph");

        }

        this.blocks[0].content = html;

        this.touch();

    }

    getContent() {

        return this.blocks

            .map(block => block.render())

            .join("");

    }

    touch() {

        this.metadata.updatedAt = new Date();

    }

    toJSON() {

        return {

            metadata: this.metadata,

            blocks: this.blocks.map(

                block => block.toJSON()

            )

        };

    }

    fromJSON(data) {

        this.clear();

        this.metadata = data.metadata;

        this.blocks = [];

        this.registry.clear();

        data.blocks.forEach(item => {

            const block = this.factory.create(

                item.type,

                item

            );

            this.registry.register(block);

            this.blocks.push(block);

        });

    }

}
```
