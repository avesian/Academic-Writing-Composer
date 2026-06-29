/**
 * BlockEditor.js
 * Academic Block Editor
 * Version: 1.0.0
 */

export default class BlockEditor {

    constructor(documentEditor = null) {

        this.editor = documentEditor;

        this.activeBlock = null;

        this.state = "READY";

    }

    attach(editor) {

        this.editor = editor;

        return this;

    }

    select(id) {

        if (!this.editor) return null;

        const block = this.editor.selectBlock(id);

        this.activeBlock = block;

        return block;

    }

    getBlock() {

        return this.activeBlock;

    }

    update(data = {}) {

        if (!this.activeBlock) return false;

        Object.assign(this.activeBlock.content, data);

        this.editor?.markModified();

        this.editor?.emit("block:update", this.activeBlock);

        return true;

    }

    rename(title) {

        if (!this.activeBlock) return false;

        this.activeBlock.title = title;

        this.editor?.markModified();

        this.editor?.emit("block:rename", this.activeBlock);

        return true;

    }

    enable() {

        if (!this.activeBlock) return false;

        this.activeBlock.enabled = true;

        this.editor?.emit("block:enable", this.activeBlock);

        return true;

    }

    disable() {

        if (!this.activeBlock) return false;

        this.activeBlock.enabled = false;

        this.editor?.emit("block:disable", this.activeBlock);

        return true;

    }

    toggle() {

        if (!this.activeBlock) return false;

        this.activeBlock.enabled = !this.activeBlock.enabled;

        this.editor?.emit("block:toggle", this.activeBlock);

        return this.activeBlock.enabled;

    }

    duplicate() {

        if (!this.activeBlock) return null;

        return this.editor?.duplicateBlock(this.activeBlock.id);

    }

    remove() {

        if (!this.activeBlock) return false;

        const id = this.activeBlock.id;

        this.editor?.deleteBlock(id);

        this.activeBlock = null;

        return true;

    }

    moveUp() {

        if (!this.activeBlock) return false;

        const blocks = this.editor.getBlocks();

        const index = blocks.findIndex(
            block => block.id === this.activeBlock.id
        );

        if (index <= 0) return false;

        this.editor.moveBlock(index, index - 1);

        return true;

    }

    moveDown() {

        if (!this.activeBlock) return false;

        const blocks = this.editor.getBlocks();

        const index = blocks.findIndex(
            block => block.id === this.activeBlock.id
        );

        if (index === -1 || index === blocks.length - 1) return false;

        this.editor.moveBlock(index, index + 1);

        return true;

    }

    setOrder(order) {

        if (!this.activeBlock) return false;

        this.activeBlock.order = order;

        this.editor?.markModified();

        this.editor?.emit("block:order", this.activeBlock);

        return true;

    }

    getContent() {

        return this.activeBlock
            ? this.activeBlock.content
            : null;

    }

    setContent(content) {

        if (!this.activeBlock) return false;

        this.activeBlock.content = content;

        this.editor?.markModified();

        this.editor?.emit("block:content", this.activeBlock);

        return true;

    }

    clear() {

        this.activeBlock = null;

        return this;

    }

    export() {

        return this.activeBlock;

    }

    toJSON() {

        return {
            state: this.state,
            activeBlock: this.activeBlock
        };

    }

}

