import { ListStore } from "./listStore";
import { ThemeStore } from "./themeStore";


export class RootStore {
    public themeStore: ThemeStore;
    public listStore: ListStore;

    constructor () {
        this.themeStore = new ThemeStore();
        this.listStore = new ListStore();
    }

}