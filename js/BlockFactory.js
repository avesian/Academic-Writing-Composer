/**
 * BlockFactory.js
 * Academic Writing Composer
 */

import ParagraphBlock from "./blocks/ParagraphBlock.js";
import HeadingBlock from "./blocks/HeadingBlock.js";
import ChapterBlock from "./blocks/ChapterBlock.js";
import TitleBlock from "./blocks/TitleBlock.js";
import FigureBlock from "./blocks/FigureBlock.js";
import TableBlock from "./blocks/TableBlock.js";

export default class BlockFactory {

    constructor() {

        this.types = new Map();

        this.register("paragraph", ParagraphBlock);
        this.register("heading", HeadingBlock);
        this.register("chapter", ChapterBlock);
        this.register("title", TitleBlock);
        this.register("figure", FigureBlock);
        this.register("table", TableBlock);

    }

    register(type, BlockClass) {

        this.types.set(type, BlockClass);

    }

    unregister(type) {

        this.types.delete(type);

    }

    has(type) {

        return this.types.has(type);

    }

    create(type, data = {}) {

        const BlockClass = this.types.get(type);

        if (!BlockClass) {

            throw new Error(`Unknown block type: ${type}`);

        }

        return new BlockClass(data);

    }

}
