import Workspace from "./Workspace.js";
import Toolbar from "./Toolbar.js";

console.log("Toolbar imported");

export default class App {

    async init() {
        document.getElementById("app").innerHTML = "TEST";
    }

}
