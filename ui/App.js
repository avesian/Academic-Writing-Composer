import Workspace from "./Workspace.js";

console.log("App imported");

export default class App {

    async init() {
        document.getElementById("app").innerHTML = "TEST";
    }

}
