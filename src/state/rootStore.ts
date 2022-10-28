import { ThemeStore } from "./themeStore";


export class RootStore {
    public themeStore: ThemeStore;

    constructor () {
        this.themeStore = new ThemeStore();
    }

}