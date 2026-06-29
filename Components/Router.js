/**
 * Router.js
 * Simple SPA Router
 * Version: 2.0.0
 */

export default class Router {

    constructor(app = null) {

        this.app = app;

        this.routes = new Map();

        this.current = "/";

        this.listener = this.handle.bind(this);

        this.state = "CREATED";

    }

    init() {

        window.addEventListener(
            "hashchange",
            this.listener
        );

        this.current = this.getCurrentPath();

        this.handle();

        this.state = "READY";

        return this;

    }

    register(path, callback) {

        this.routes.set(path, callback);

        return this;

    }

    unregister(path) {

        this.routes.delete(path);

        return this;

    }

    navigate(path) {

        if (!path.startsWith("/")) {

            path = `/${path}`;

        }

        window.location.hash = path;

        return this;

    }

    handle() {

        const path = this.getCurrentPath();

        this.current = path;

        const route = this.routes.get(path);

        if (typeof route === "function") {

            route(path);

        } else {

            const fallback = this.routes.get("*");

            if (typeof fallback === "function") {

                fallback(path);

            }

        }

        this.app?.emit("router:navigate", path);

    }

    getCurrentPath() {

        const hash = window.location.hash;

        if (!hash || hash === "#") {

            return "/";

        }

        return hash.substring(1);

    }

    getCurrentRoute() {

        return this.current;

    }

    has(path) {

        return this.routes.has(path);

    }

    destroy() {

        window.removeEventListener(
            "hashchange",
            this.listener
        );

        this.routes.clear();

        this.state = "DESTROYED";

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            current: this.current,
            routes: this.routes.size
        };

    }

}

