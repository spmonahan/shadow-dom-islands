import { makeAutoObservable } from "mobx";
import { teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme, Theme, webDarkTheme, webLightTheme } from '@fluentui/react-components'

export type ThemeName = 'Web Light' | 'Web Dark' | 'Teams Light' | 'Teams Dark' | 'Teams High Contrast';

const themeMap: Record<ThemeName, Theme> = {
    'Web Light': webLightTheme,
    'Web Dark': webDarkTheme,
    'Teams Light': teamsLightTheme,
    'Teams Dark': teamsDarkTheme,
    'Teams High Contrast': teamsHighContrastTheme,
};

export class AppTheme {

    private currentThemeName: ThemeName;

    constructor () {
        // this.currentTheme = webLightTheme;
        this.currentThemeName = 'Web Light';
        makeAutoObservable(this);
    }

    get currentTheme(): Theme {
        return themeMap[this.currentThemeName];
    }

    public setThemeName (name: ThemeName) {
        console.log('name', name);
        this.currentThemeName = name;
    }


}