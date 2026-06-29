/**
 * PropertiesPanel.js
 * Block Properties Inspector
 * Version: 2.0.0
 */

export default class PropertiesPanel {

    constructor(app = null) {

        this.app = app;

        this.element = null;

        this.block = null;

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

    setBlock(block) {

        this.block = block;

        this.refresh();

        return this;

    }

    refresh() {

        if (!this.element) return this;

        this.element.innerHTML = "";

        const title = document.createElement("h3");

        title.className = "awc-panel-title";

        title.textContent = "Properties";

        this.element.appendChild(title);

        if (!this.block) {

            const empty = document.createElement("div");

            empty.className = "awc-properties-empty";

            empty.textContent = "No block selected.";

            this.element.appendChild(empty);

            return this;

        }

        const form = document.createElement("div");

        form.className = "awc-properties-form";

        form.appendChild(
            this.createField(
                "Title",
                "title",
                this.block.title || ""
            )
        );

        form.appendChild(
            this.createField(
                "Type",
                "type",
                this.block.type || "",
                true
            )
        );

        form.appendChild(
            this.createField(
                "Visible",
                "enabled",
                this.block.enabled ? "Yes" : "No",
                true
            )
        );

        this.element.appendChild(form);

        return this;

    }

    createField(label, key, value, readonly = false) {

        const wrapper = document.createElement("div");

        wrapper.className = "awc-property";

        const title = document.createElement("label");

        title.textContent = label;

        const input = document.createElement("input");

        input.type = "text";

        input.value = value;

        input.readOnly = readonly;

        if (!readonly) {

            input.addEventListener("input", event => {

                this.updateProperty(
                    key,
                    event.target.value
                );

            });

        }

        wrapper.appendChild(title);

        wrapper.appendChild(input);

        return wrapper;

    }

    updateProperty(key, value) {

        if (!this.block) return;

        this.block[key] = value;

        this.app?.emit("property:update", {
            block: this.block,
            key,
            value
        });

    }

    clear() {

        this.block = null;

        this.refresh();

        return this;

    }

    getBlock() {

        return this.block;

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
            selectedBlock: this.block?.id || null
        };

    }

}
