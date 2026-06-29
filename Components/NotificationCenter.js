```javascript id="r8mk4q"
/**
 * NotificationCenter.js
 * Central Notification Manager
 * Version: 2.0.0
 */

export default class NotificationCenter {

    constructor(app = null) {

        this.app = app;

        this.element = null;

        this.notifications = [];

        this.state = "CREATED";

    }

    render() {

        if (this.element) return this;

        this.element = document.createElement("aside");

        this.element.className = "awc-notification-center";

        document.body.appendChild(this.element);

        this.refresh();

        this.state = "RENDERED";

        return this;

    }

    notify(message, type = "info") {

        const notification = {
            id: Date.now(),
            message,
            type,
            createdAt: new Date()
        };

        this.notifications.unshift(notification);

        this.refresh();

        this.app?.emit("notification:add", notification);

        return notification;

    }

    success(message) {

        return this.notify(message, "success");

    }

    info(message) {

        return this.notify(message, "info");

    }

    warning(message) {

        return this.notify(message, "warning");

    }

    error(message) {

        return this.notify(message, "error");

    }

    refresh() {

        if (!this.element) return this;

        this.element.innerHTML = "";

        this.notifications.forEach(item => {

            const card = document.createElement("div");

            card.className = `awc-notification awc-notification-${item.type}`;

            card.innerHTML = `
                <div class="awc-notification-message">
                    ${item.message}
                </div>

                <button class="awc-notification-close">
                    &times;
                </button>
            `;

            card
                .querySelector(".awc-notification-close")
                .addEventListener("click", () => {

                    this.remove(item.id);

                });

            this.element.appendChild(card);

        });

        return this;

    }

    remove(id) {

        this.notifications = this.notifications.filter(
            item => item.id !== id
        );

        this.refresh();

        this.app?.emit("notification:remove", id);

        return this;

    }

    clear() {

        this.notifications = [];

        this.refresh();

        this.app?.emit("notification:clear");

        return this;

    }

    count() {

        return this.notifications.length;

    }

    getAll() {

        return [...this.notifications];

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
            total: this.count()
        };

    }

}
```
