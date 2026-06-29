/**
 * CommandManager.js
 * Command Pattern Manager
 * Version: 1.0.0
 */

export default class CommandManager {

    constructor(options = {}) {

        this.options = {
            autoHistory: true,
            ...options
        };

        this.commands = new Map();

        this.history = null;

        this.state = "READY";

    }

    setHistory(history) {

        this.history = history;

        return this;

    }

    register(name, command) {

        if (!name || typeof command !== "object") {
            throw new Error("Invalid command.");
        }

        this.commands.set(name, command);

        return this;

    }

    unregister(name) {

        this.commands.delete(name);

        return this;

    }

    has(name) {

        return this.commands.has(name);

    }

    get(name) {

        return this.commands.get(name) || null;

    }

    execute(name, payload = null) {

        const command = this.get(name);

        if (!command) {
            throw new Error(`Command '${name}' not found.`);
        }

        let result = null;

        if (typeof command.execute === "function") {
            result = command.execute(payload);
        }

        if (
            this.options.autoHistory &&
            this.history &&
            typeof command.undo === "function"
        ) {

            this.history.push({
                name,
                payload,
                undo: () => command.undo(payload),
                redo: () => command.execute(payload)
            });

        }

        return result;

    }

    undo() {

        if (!this.history) return null;

        return this.history.undo();

    }

    redo() {

        if (!this.history) return null;

        return this.history.redo();

    }

    clear() {

        this.commands.clear();

        return this;

    }

    getCommands() {

        return [...this.commands.keys()];

    }

    export() {

        return {
            commands: this.getCommands()
        };

    }

    toJSON() {

        return {
            state: this.state,
            totalCommands: this.commands.size,
            commands: this.getCommands()
        };

    }

}

