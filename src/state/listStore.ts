import { makeAutoObservable } from "mobx";

export class ListStore {
    private _list;
    private _selectedIndex: number;

    constructor () {

        this._list = [];
        this._selectedIndex = -1;
        const numItems = 100;
        for (let i = 0; i < numItems; i++) {
            const index = i + 1;
            const item = 
            { 
                title: `Title ${index}`,
                subject: `Subject ${index}`,
                teaser: `Teaser ${index}`, 
                date: new Date(),
                index: i,
                selected: false,
            };
            this._list.push(item);
        }

        makeAutoObservable(this);
    }


    public get list() {
        return this._list;
    }

    public get selectedIndex(): number {
        return this._selectedIndex;
    }

    public setSelectedIndex (index: number) {
        this._selectedIndex = index;
        this._list[this._selectedIndex].selected = true;
    }

    public get selectedItem() {
        return this._list[this._selectedIndex];
    }
}