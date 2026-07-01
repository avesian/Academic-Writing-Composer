/**
 * DocumentRenderer.js
 * Academic Writing Composer
 */

export default class DocumentRenderer {

    constructor(document = null) {

        this.document = document;

    }

    setDocument(document) {

        this.document = document;

        return this;

    }

    getDocument() {

        return this.document;

    }

    render() {

        if (!this.document) {

            return "";

        }

        const blocks = this.document
            .getBlocks()
            .filter(block => block.enabled)
            .sort((a, b) => a.order - b.order);

        return blocks
            .map(block => {

                if (
                    block &&
                    typeof block.render === "function"
                ) {

                    return block.render();

                }

                return "";

            })
            .join("\n");

    }

}
