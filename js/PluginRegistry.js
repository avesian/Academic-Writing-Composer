/**
 * PluginRegistry.js
 * Plugin Registry
 * Version: 1.0.0
 */

export default class PluginRegistry {
    constructor() {
        this.plugins = new Map();
    }

    /**
     * Register Plugin
     */
    register(plugin) {
        if (!plugin.id) {
            throw new Error("Plugin must have an id.");
        }

        this.plugins.set(plugin.id, plugin);

        if (typeof plugin.install === "function") {
            plugin.install();
        }

        return this;
    }

    /**
     * Unregister Plugin
     */
    unregister(id) {
        const plugin = this.plugins.get(id);

        if (plugin && typeof plugin.uninstall === "function") {
            plugin.uninstall();
        }

        this.plugins.delete(id);

        return this;
    }

    /**
     * Get Plugin
     */
    get(id) {
        return this.plugins.get(id) || null;
    }

    /**
     * Check Plugin
     */
    has(id) {
        return this.plugins.has(id);
    }

    /**
     * Enable Plugin
     */
    enable(id) {
        const plugin = this.get(id);

        if (!plugin) return this;

        plugin.enabled = true;

        if (typeof plugin.enable === "function") {
            plugin.enable();
        }

        return this;
    }

    /**
     * Disable Plugin
     */
    disable(id) {
        const plugin = this.get(id);

        if (!plugin) return this;

        plugin.enabled = false;

        if (typeof plugin.disable === "function") {
            plugin.disable();
        }

        return this;
    }

    /**
     * Execute Plugin
     */
    execute(id, ...args) {
        const plugin = this.get(id);

        if (!plugin) {
            throw new Error(`Plugin "${id}" is not registered.`);
        }

        if (typeof plugin.execute !== "function") {
            throw new Error(`Plugin "${id}" has no execute() method.`);
        }

        return plugin.execute(...args);
    }

    /**
     * Get All Plugins
     */
    all() {
        return [...this.plugins.values()];
    }

    /**
     * Get Plugin IDs
     */
    ids() {
        return [...this.plugins.keys()];
    }

    /**
     * Get Enabled Plugins
     */
    enabled() {
        return this.all().filter(plugin => plugin.enabled !== false);
    }

    /**
     * Count
     */
    count() {
        return this.plugins.size;
    }

    /**
     * Clear Registry
     */
    clear() {
        for (const plugin of this.plugins.values()) {
            if (typeof plugin.uninstall === "function") {
                plugin.uninstall();
            }
        }

        this.plugins.clear();

        return this;
    }

    /**
     * Export
     */
    toJSON() {
        return {
            count: this.count(),
            plugins: this.ids()
        };
    }
}
