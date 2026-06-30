import Workspace from "./Workspace.js";

export default class App {

    async init() {

        const workspace = new Workspace(this);

        document
            .getElementById("app")
            .appendChild(workspace.render());

    }

}
