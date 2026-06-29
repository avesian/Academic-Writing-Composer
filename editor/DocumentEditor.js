```javascript
/**
 * DocumentEditor.js
 * Integrated with AcademicDocument
 */

import AcademicDocument from "../core/AcademicDocument.js";

export default class DocumentEditor {

    constructor(app) {

        this.app = app;

        this.document = new AcademicDocument();

        this.state = "READY";

    }

    newDocument() {

        this.document = new AcademicDocument();

        this.app?.emit(

            "document:created",

            this.document

        );

        return this.document;

    }

    open(documentData) {

        if (documentData instanceof AcademicDocument) {

            this.document = documentData;

        } else {

            this.document = new AcademicDocument();

            this.document.fromJSON(documentData);

        }

        this.app?.emit(

            "document:opened",

            this.document

        );

        return this.document;

    }

    save() {

        const json = this.document.toJSON();

        this.app?.emit(

            "document:saved",

            json

        );

        return json;

    }

    setContent(html) {

        this.document.setContent(html);

        this.app?.emit(

            "document:updated",

            this.document

        );

    }

    getContent() {

        return this.document.getContent();

    }

    getDocument() {

        return this.document;

    }

    renderHTML() {

        return this.document.getContent();

    }

    exportJSON() {

        return this.document.toJSON();

    }

    importJSON(data) {

        this.document.fromJSON(data);

        this.app?.emit(

            "document:updated",

            this.document

        );

    }

}
```
