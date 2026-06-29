/**
 * BlockPanel.js
 * Available Block Panel
 * Version: 2.0.0
 */

export default class BlockPanel {

    constructor(app = null) {

        this.app = app;

        this.element = null;

        this.blocks = [
            { id: "cover", label: "Cover" },
            { id: "approval", label: "Approval" },
            { id: "validation", label: "Validation" },
            { id: "originality", label: "Originality" },
            { id: "motto", label: "Motto" },
            { id: "dedication", label: "Dedication" },
            { id: "abstract", label: "Abstract" },
            { id: "abstract-en", label: "Abstract (EN)" },
            { id: "preface", label: "Preface" },
            { id: "chapter", label: "Chapter" },
            { id: "table-list", label: "List of Tables" },
            { id: "figure-list", label: "List of Figures" },
            { id: "toc", label: "Table of Contents" },
            { id: "reference", label: "References" },
            { id: "appendix", label: "Appendix" }
        ];

        this.state = "CREATED";

    }

    render() {

        const workspace = this.app?.workspace?.getRootElement();

        if (!workspace) return this;

        this.element = workspace.querySelector(".awc-properties");

        if (!this.element) return this;

        this.refresh();

        this.state = "RENDERED";

        return this;

    }

    refresh() {

        if (!this.element) return this;

        this.element.innerHTML = "";

        const title = document.createElement("h3");

        title.className = "awc-panel-title";

        title.textContent = "Blocks";

        this.element.appendChild(title);

        const list = document.createElement("div");

        list.className = "awc-block-panel";

        this.blocks.forEach(block => {

            list.appendChild(
                this.createItem(block)
            );

        });

        this.element.appendChild(list);

        return this;

    }

    createItem(block) {

        const button = document.createElement("button");

        button.className = "awc-block-item";

        button.dataset.type = block.id;

        button.textContent = block.label;

        button.addEventListener("click", () => {

            this.insert(block.id);

        });

        return button;

    }

    insert(type) {

        this.app?.emit("block:insert", {
            type
        });

    }

    addBlock(block) {

        this.blocks.push(block);

        this.refresh();

        return this;

    }

    removeBlock(id) {

        this.blocks = this.blocks.filter(
            block => block.id !== id
        );

        this.refresh();

        return this;

    }

    getBlocks() {

        return [...this.blocks];

    }

    getElement() {

        return this.element;

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            totalBlocks: this.blocks.length
        };

    }

}
