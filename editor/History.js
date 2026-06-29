/**
 * History.js
 * Undo / Redo History Manager
 * Version: 1.0.0
 */

export default class History {

    constructor(options = {}) {

        this.options = {
            maxStack: 100,
            ...options
        };

        this.undoStack = [];

        this.redoStack = [];

        this.state = "READY";

    }

    push(action) {

        if (!action) return this;

        this.undoStack.push(action);

        if (this.undoStack.length > this.options.maxStack) {
            this.undoStack.shift();
        }

        this.redoStack = [];

        return this;

    }

    undo() {

        if (!this.canUndo()) return null;

        const action = this.undoStack.pop();

        this.redoStack.push(action);

        if (typeof action.undo === "function") {
            action.undo();
        }

        return action;

    }

    redo() {

        if (!this.canRedo()) return null;

        const action = this.redoStack.pop();

        this.undoStack.push(action);

        if (typeof action.redo === "function") {
            action.redo();
        }

        return action;

    }

    canUndo() {

        return this.undoStack.length > 0;

    }

    canRedo() {

        return this.redoStack.length > 0;

    }

    peekUndo() {

        return this.undoStack[this.undoStack.length - 1] || null;

    }

    peekRedo() {

        return this.redoStack[this.redoStack.length - 1] || null;

    }

    clear() {

        this.undoStack = [];

        this.redoStack = [];

        return this;

    }

    size() {

        return {
            undo: this.undoStack.length,
            redo: this.redoStack.length
        };

    }

    export() {

        return {
            undoStack: [...this.undoStack],
            redoStack: [...this.redoStack]
        };

    }

    toJSON() {

        return {
            state: this.state,
            undo: this.undoStack.length,
            redo: this.redoStack.length,
            maxStack: this.options.maxStack
        };

    }

}

