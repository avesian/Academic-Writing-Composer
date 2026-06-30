import Workspace from "./Workspace.js";
import Toolbar from "./Toolbar.js";

export default class App {

    async init() {

        const root = document.getElementById("app");

        const workspace = new Workspace(this);

        root.appendChild(workspace.render());

        const toolbar = new Toolbar(this);

        workspace
            .getToolbarContainer()
            .appendChild(toolbar.render());

    }

}
