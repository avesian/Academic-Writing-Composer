/**
 * FileManager.js
 * File Import / Export Manager
 * Version: 2.0.0
 */

export default class FileManager {

    constructor(app = null) {

        this.app = app;

        this.currentFile = null;

        this.supportedTypes = [
            ".json",
            ".docx",
            ".pdf",
            ".html"
        ];

        this.state = "CREATED";

    }

    async open(file) {

        if (!file) return null;

        this.currentFile = file;

        const extension = this.getExtension(file.name);

        let content = null;

        switch (extension) {

            case ".json":
                content = await file.text();
                content = JSON.parse(content);
                break;

            default:
                content = await file.arrayBuffer();
                break;

        }

        this.app?.emit("file:open", {
            file,
            extension,
            content
        });

        return content;

    }

    save(filename = "document.json", data = {}) {

        const blob = new Blob(
            [
                JSON.stringify(
                    data,
                    null,
                    2
                )
            ],
            {
                type: "application/json"
            }
        );

        this.download(blob, filename);

        this.app?.emit("file:save", filename);

    }

    export(blob, filename) {

        this.download(blob, filename);

        this.app?.emit("file:export", filename);

    }

    download(blob, filename) {

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = filename;

        link.click();

        URL.revokeObjectURL(url);

    }

    getExtension(filename) {

        const index = filename.lastIndexOf(".");

        return index === -1
            ? ""
            : filename.substring(index).toLowerCase();

    }

    isSupported(filename) {

        return this.supportedTypes.includes(
            this.getExtension(filename)
        );

    }

    getCurrentFile() {

        return this.currentFile;

    }

    getSupportedTypes() {

        return [...this.supportedTypes];

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            currentFile: this.currentFile?.name || null,
            supportedTypes: this.supportedTypes
        };

    }

}

