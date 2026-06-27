/**
 * EventDispatcher.js
 * Event Dispatcher
 * Version: 1.0.0
 */

export default class EventDispatcher {
    constructor() {
        this.events = new Map();
    }

    /**
     * Register Event Listener
     */
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }

        this.events.get(event).push(callback);

        return this;
    }

    /**
     * Register One-Time Listener
     */
    once(event, callback) {
        const wrapper = (...args) => {
            callback(...args);
            this.off(event, wrapper);
        };

        this.on(event, wrapper);

        return this;
    }

    /**
     * Remove Event Listener
     */
    off(event, callback) {
        if (!this.events.has(event)) {
            return this;
        }

        const listeners = this.events.get(event);

        this.events.set(
            event,
            listeners.filter(fn => fn !== callback)
        );

        return this;
    }

    /**
     * Emit Event
     */
    emit(event, payload = null) {
        if (!this.events.has(event)) {
            return false;
        }

        const listeners = this.events.get(event);

        listeners.forEach(callback => {
            try {
                callback(payload);
            } catch (error) {
                console.error(`[EventDispatcher] ${event}`, error);
            }
        });

        return true;
    }

    /**
     * Check Event
     */
    has(event) {
        return this.events.has(event);
    }

    /**
     * Get Listeners
     */
    listeners(event) {
        return this.events.get(event) || [];
    }

    /**
     * Remove All Listeners
     */
    clear(event = null) {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }

        return this;
    }

    /**
     * Total Registered Events
     */
    count() {
        return this.events.size;
    }
}
