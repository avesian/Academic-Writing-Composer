import Workspace from "./Workspace.js";
import Toolbar from "./Toolbar.js";
import Sidebar from "./Sidebar.js";

export default class App {

    async init() {

        const root = document.getElementById("app");

        const workspace = new Workspace(this);

        root.appendChild(workspace.render());

        const toolbar = new Toolbar(this);
        workspace
            .getToolbarContainer()
            .appendChild(toolbar.render());

        const sidebar = new Sidebar(this);
        workspace
            .getSidebarContainer()
            .appendChild(sidebar.render());

    }

}
