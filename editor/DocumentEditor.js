```javascript
/**
 * DocumentEditor.js
 * Academic Document Editor
 * Version: 1.0.0
 */

import Editor from "./Editor.js";

export default class DocumentEditor extends Editor {

    constructor(options = {}) {
        super(options);

        this.activeBlock = null;
        this.activePage = 1;
        this.zoom = 100;

        this.documentState = {
            modified: false,
            readonly: false
        };
    }

    open(document) {
        super.open(document);

        this.documentState.modified = false;
        this.activePage = 1;

        return this;
    }

    create(metadata = {}) {
        const document = super.create(metadata);

        this.documentState.modified = false;
        this.activePage = 1;

        return document;
    }

    markModified(value = true) {
        this.documentState.modified = value;
        return this;
    }

    isModified() {
        return this.documentState.modified;
    }

    setReadonly(value = true) {
        this.documentState.readonly = value;
        return this;
    }

    isReadonly() {
        return this.documentState.readonly;
    }

    selectBlock(id) {

        const block = this.getBlocks().find(
            item => item.id === id
        );

        if (!block) return null;

        this.activeBlock = block;

        this.emit("block:selected", block);

        return block;
    }

    getActiveBlock() {
        return this.activeBlock;
    }

    insertBlock(block) {

        if (this.documentState.readonly) {
            return false;
        }

        this.addBlock(block);

        this.markModified();

        this.emit("block:insert", block);

        return true;
    }

    deleteBlock(id) {

        if (this.documentState.readonly) {
            return false;
        }

        this.removeBlock(id);

        this.markModified();

        this.emit("block:delete", id);

        return true;
    }

    duplicateBlock(id) {

        const source = this.getBlocks().find(
            block => block.id === id
        );

        if (!source) return null;

        const copy = structuredClone(source);

        copy.id = crypto.randomUUID();

        this.addBlock(copy);

        this.markModified();

        this.emit("block:duplicate", copy);

        return copy;
    }

    moveBlock(fromIndex, toIndex) {

        const blocks = this.getBlocks();

        if (
            fromIndex < 0 ||
            fromIndex >= blocks.length ||
            toIndex < 0 ||
            toIndex >= blocks.length
        ) {
            return false;
        }

        const [block] = blocks.splice(fromIndex, 1);

        blocks.splice(toIndex, 0, block);

        blocks.forEach((item, index) => {
            item.order = index + 1;
        });

        this.markModified();

        this.emit("block:move", {
            from: fromIndex,
            to: toIndex
        });

        return true;
    }

    setZoom(value) {

        this.zoom = Math.max(25, Math.min(300, value));

        this.emit("zoom:change", this.zoom);

        return this;
    }

    getZoom() {
        return this.zoom;
    }

    setPage(page) {

        this.activePage = page;

        this.emit("page:change", page);

        return this;
    }

    getPage() {
        return this.activePage;
    }

    save() {

        this.documentState.modified = false;

        this.emit("document:saved", this.document);

        return super.save();
    }

    refresh() {

        this.compose();

        this.render();

        this.emit("document:refresh");

        return this;
    }

    export() {
        return {
            state: this.documentState,
            activePage: this.activePage,
            zoom: this.zoom,
            activeBlock: this.activeBlock?.id || null,
            document: this.document
        };
    }

    toJSON() {
        return this.export();
    }

}
```
